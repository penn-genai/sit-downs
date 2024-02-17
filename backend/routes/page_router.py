from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.day import create_today_by_user, get_today_by_user, update_day_summary

from services.page import create_page, get_pages_by_date_id, get_pages_today_by_user
from utils.llm import summarize_webpage


page_router = APIRouter(
    prefix="/page",
    tags=["page"],
)

@page_router.get("/today/{uid}")
async def get_today_page_handler(request: Request, uid: int):
    get_pages_today_by_user(request.app.supabase, uid)


async def update_day_summary_wrapper(request: Request, id: str):
    pages = get_pages_by_date_id(request.app.supabase, id)
    day_summary = request.app.llm.summarize_day([page.summary for page in pages])
    update_day_summary(request.app.supabase, id, day_summary)

class ProcessPageRequest(BaseModel):
    title: str
    url: str
    body: str


@page_router.post("/{uid}")
async def process_page_handler(request: Request, uid: str, input: ProcessPageRequest):
    page_summary = summarize_webpage(request.app.llm, input.title, input.url, input.body)

    today = get_today_by_user(request.app.supabase, uid)

    if not today:
        today = create_today_by_user(request.app.supabase, uid, "No activity so far.")

    response = create_page(request.app.supabase, input.title, input.url, input.body, page_summary, today.id)

    print("Page", response)

    response = update_day_summary_wrapper(request, today.id)

    print("Day", response)






# @app.post("/page/{uid}")
# def process_page(uid: str, page: Page):

#     current_timestamp = datetime.now(timezone.utc).timestamp()

#     # Call Mistral to summarize new page
    

#     # Call Mistral to summarize day
#     response = (
#         supabase.table("days")
#         .select("*")
#         .eq("date", today_date)
#         .eq("uid", uid)
#         .execute()
#     )

#     # Save day summary to Supabase
#     page_json = {
#         "time": current_timestamp,
#         "url": page.url,
#         "title": page.title,
#         "summary": page_summary,
#     }

#     pages = response.data[0]["pages"] if response.data else []
#     pages.append(page_json)

#     day_summary = l.summarize_day([page["summary"] for page in pages])

#     if response.data:
#         supabase.table("days").update(
#             {
#                 "summary": day_summary,
#                 "pages": pages,
#             }
#         ).eq("id", response.data[0]["id"]).execute()
#     else:
#         print({
#                 "date": today_date,
#                 "uid": uid,
#                 "summary": day_summary,
#                 "pages": pages,
#             })
#         supabase.table("days").insert(
#             {
#                 "date": today_date,
#                 "uid": uid,
#                 "summary": day_summary,
#                 "pages": pages,
#             }
#         ).execute()

#     # Call Mistral to find similar teammates
#     # Save similarities to Supabase
#     return page
