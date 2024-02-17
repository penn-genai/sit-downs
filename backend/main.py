import os
from fastapi import FastAPI
from pydantic import BaseModel
from supabase import create_client, Client
from datetime import datetime, timezone


class Page(BaseModel):
    url: str
    title: str
    body: str


app = FastAPI()
supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY")
)


@app.post("/page/{uid}")
def process_page(uid, page: Page):
    today_date = datetime.now(timezone.utc).date()
    current_timestamp = datetime.now(timezone.utc)

    # Call Mistral to summarize new page
    page_summary = ""

    # Call Mistral to summarize day
    response = (
        supabase.table("days")
        .select("*")
        .eq("date", today_date)
        .eq("uid", uid)
        .execute()
    )
    day_summary = ""

    # Save day summary to Supabase
    page_json = {
        "time": current_timestamp,
        "url": page.url,
        "title": page.title,
        "summary": page_summary,
    }
    if response.data:
        supabase.table("days").update(
            {
                "summary": day_summary,
                "pages": response.data["pages"] + [page_json],
            }
        ).eq("id", response.data["id"]).execute()
    else:
        supabase.table("days").insert(
            {
                "date": today_date,
                "uid": uid,
                "summary": day_summary,
                "pages": [page_json],
            }
        ).execute()

    # Call Mistral to find similar teammates
    # Save similarities to Supabase
    return page
