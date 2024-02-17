from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.profile import get_profile_by_id
from services.date import create_today_by_user, get_today_by_user, update_date_summary

from services.page import create_page, get_pages_by_date_id, get_pages_today_by_user
from utils.llm import summarize_date, summarize_summary, summarize_webpage
from utils.atlas import add_page


page_router = APIRouter(
    prefix="/page",
    tags=["page"],
)

@page_router.get("/today/{uid}")
async def get_today_page_handler(request: Request, uid: int):
    get_pages_today_by_user(request.app.supabase, uid)


def update_date_summary_wrapper(request: Request, id: str, name: str):
    pages = get_pages_by_date_id(request.app.supabase, id)
    date_summary = summarize_date(request.app.llm, name, [page.summary for page in pages])
    one_sentence_summary = summarize_summary(request.app.llm, date_summary)
    update_date_summary(request.app.supabase, id, date_summary, one_sentence_summary)

class ProcessPageRequest(BaseModel):
    title: str
    url: str
    body: str


@page_router.post("/{uid}")
async def process_page_handler(request: Request, uid: str, input: ProcessPageRequest):
    page_summary = summarize_webpage(request.app.llm, input.title, input.url, input.body)

    today = get_today_by_user(request.app.supabase, uid)

    if not today:
        create_today_by_user(request.app.supabase, uid, "No activity so far.", "No activity so far.")
        today = get_today_by_user(request.app.supabase, uid)

    create_page(request.app.supabase, input.title, input.url, input.body, page_summary, today.id)

    profile = get_profile_by_id(request.app.supabase, uid)

    response = update_date_summary_wrapper(request, today.id, profile.name) 

    add_page()

    return response
