from fastapi import APIRouter, Request
from services.page import get_top_pages_today_by_user
from services.profile import get_profile_by_id

from services.date import create_today_by_user, get_all_today, get_today_by_user


date_router = APIRouter(
    prefix="/date",
    tags=["date"],
)


@date_router.get("/today/{uid}")
async def get_today_handler(request: Request, uid: str):
    """
    Gets all tasks for a given user today.
    """

    result = get_today_by_user(request.app.supabase, uid)
    if not result:
        profile = get_profile_by_id(request.app.supabase, uid)
        result = create_today_by_user(request.app.supabase, uid, "No activity so far.", f"{profile.name} have not done anything so far. Get to work!")

    return {
        "name": get_profile_by_id(request.app.supabase, uid).name,
        "date": result.date,
        "summary": result.summary,
        "one_sentence_summary": result.one_sentence_summary,
        "links": [[page.title, page.url] for page in get_top_pages_today_by_user(request.app.supabase, uid, 5)],
    }


@date_router.get("/today/relevant/{uid}")
async def get_relevant_coworkers_today_handler(request: Request, uid: str):
    """
    Gets top coworkers working on the most relevant tasks for a given user today.
    """

    # for now, we just return the first 3 coworkers

    results = get_all_today(request.app.supabase)[:3]
    results = filter(lambda result: result.uid != uid, results)
    return [{
        "name": get_profile_by_id(request.app.supabase, result.uid).name,
        "date": result.date,
        "summary": result.summary,
        "one_sentence_summary": result.one_sentence_summary,
        "links": [[page.title, page.url] for page in get_top_pages_today_by_user(request.app.supabase, result.uid, 5)],
    } for result in results]
