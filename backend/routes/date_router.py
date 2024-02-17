from fastapi import APIRouter, Request
from services.profile import get_profile_by_id

from services.date import get_all_today


date_router = APIRouter(
    prefix="/date",
    tags=["date"],
)


@date_router.get("/today/relevant/{uid}")
async def get_relevant_coworkers_today_handler(request: Request, uid: str):
    """
    Gets top coworkers working on the most relevant tasks for a given user today.
    """

    # for now, we just return the first 3 coworkers

    results = get_all_today(request.app.supabase)[:3]
    return [{
        "name": get_profile_by_id(request.app.supabase, result.uid).name,
        "summary": result.summary,
    } for result in results]
