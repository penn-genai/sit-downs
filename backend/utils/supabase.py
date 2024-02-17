import os
from supabase import create_client

def init_supabase():
    return create_client(
        os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY")
    )