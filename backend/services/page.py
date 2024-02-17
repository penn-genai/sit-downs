from pydantic import BaseModel
from supabase import Client

from services.date import today


class Page(BaseModel):
    id: int
    timestamp: str
    title: str
    url: str
    body: str
    summary: str
    date_id: int


def create_page(supabase: Client, title, url, body, summary, date_id):
    response = (
        supabase.table("pages")
            .insert({"title": title, "url": url, "body": body, "summary": summary, "date_id": date_id})
            .execute()
    )
    return Page(**response.data[0])


def get_page_by_id(supabase: Client, id: str):
    response = (
        supabase.table("pages")
            .select("*")
            .eq("id", id)
            .execute()
    )
    if response.data:
        return Page(**response.data[0])
    else:
        return None
    

def get_pages_by_date_id(supabase: Client, date_id: str):
    response = (
        supabase.table("pages")
            .select("*")
            .eq("date_id", date_id)
            .execute()
    )
    if response.data:
        return [Page(**page) for page in response.data]
    else:
        return None
    
def get_pages_today_by_user(supabase: Client, uid: str):
    response = (
        supabase.table("pages")
            .select("*")
            .eq("date_id", today())
            .execute()
    )
    if response.data:
        return [Page(**page) for page in response.data]
    else:
        return None
    