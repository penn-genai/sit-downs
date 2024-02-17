from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.date import create_today_by_user, get_today_by_user, update_date_summary

from services.page import create_page, get_pages_by_date_id, get_pages_today_by_user
from utils.llm import summarize_date, summarize_webpage


page_router = APIRouter(
    prefix="/page",
    tags=["page"],
)

@page_router.get("/today/{uid}")
async def get_today_page_handler(request: Request, uid: int):
    get_pages_today_by_user(request.app.supabase, uid)


def update_date_summary_wrapper(request: Request, id: str):
    pages = get_pages_by_date_id(request.app.supabase, id)
    date_summary = summarize_date(request.app.llm, [page.summary for page in pages])
    update_date_summary(request.app.supabase, id, date_summary)

class ProcessPageRequest(BaseModel):
    title: str
    url: str
    body: str


@page_router.post("/{uid}")
async def process_page_handler(request: Request, uid: str, input: ProcessPageRequest):
    page_summary = summarize_webpage(request.app.llm, input.title, input.url, input.body)

    today = get_today_by_user(request.app.supabase, uid)

    if not today:
        create_today_by_user(request.app.supabase, uid, "No activity so far.")
        today = get_today_by_user(request.app.supabase, uid)

    create_page(request.app.supabase, input.title, input.url, input.body, page_summary, today.id)

    response = update_date_summary_wrapper(request, today.id)

    return response
