from datetime import datetime
from pydantic import BaseModel
from supabase import Client

class Date(BaseModel):
    id: int
    date: str
    uid: str
    summary: str

def today():
    return datetime.now().strftime("%Y-%m-%d")

def create_date(supabase: Client, date: str, uid: str, summary: str):
    response = (
        supabase.table("dates")
            .insert({"date": date, "uid": uid, "summary": summary})
            .execute()
    )
    return response

def create_today_by_user(supabase: Client, uid: str, summary: str):
    response = (
        supabase.table("dates")
            .insert({"date": today(), "uid": uid, "summary": summary})
            .execute()
    )
    return response

def get_date_by_id(supabase: Client, id: str):
    response = (
        supabase.table("dates")
            .select("*")
            .eq("id", id)
            .execute()
    )
    if response.data:
        return Date(**response.data[0])
    else:
        return None
    
def get_today_by_user(supabase: Client, uid: str):
    response = (
        supabase.table("dates")
            .select("*")
            .eq("date", today())
            .eq("uid", uid)
            .execute()
    )
    if response.data:
        return Date(**response.data[0])
    else:
        return None
    
def update_date_summary(supabase: Client, id: str, summary: str):
    response = (
        supabase.table("dates")
            .update({"summary": summary})
            .eq("id", id)
            .execute()
    )
    return response

def delete_date(supabase: Client, id: str):
    response = (
        supabase.table("dates")
            .delete()
            .eq("id", id)
            .execute()
    )
    return response
