from fastapi import APIRouter

from routes.date_router import day_router
from routes.page_router import page_router


router = APIRouter(
    responses={404: {"description": "Not found"}}
)

router.include_router(day_router)
router.include_router(page_router)