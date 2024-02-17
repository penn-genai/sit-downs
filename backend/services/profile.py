from pydantic import BaseModel
from supabase import Client

from services.date import today


class Profile(BaseModel):
    id: int
    updated_at: str
    name: str
    avatar_url: str


def create_profile(supabase: Client, id, name, avatar_url):
    response = (
        supabase.table("profiles")
            .insert({"id": id, "name": name, "avatar_url": avatar_url})
            .execute()
    )
    return response


def get_profile_by_id(supabase: Client, id: str):
    response = (
        supabase.table("profiles")
            .select("*")
            .eq("id", id)
            .execute()
    )
    if response.data:
        return Profile(**response.data[0])
    else:
        return None
