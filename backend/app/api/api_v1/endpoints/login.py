from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import model, schemas
from app.crud import crud_user
from app.api import deps
from app.core import security
from app.core.config import settings
from typing import Optional

router = APIRouter()


@router.post("/login/access-token", response_model=schemas.Token)
def login_access_token(db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    # def login_access_token(
    #         username: str = Body(None),
    #         password: str = Body(None),
    #         db: Session = Depends(deps.get_db)) -> Any:
    #     """
    #     OAuth2 compatible token login, get an access token for future requests
    #     """
    user = crud_user.authenticate(
        db=db, email=form_data.username, password=form_data.password)
    # user = crud_user.authenticate(        db=db, email=username, password=password)
    if not user:
        raise HTTPException(
            status_code=400, detail="Incorrect email or password")
    elif not crud_user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
        "email": user.email,
        "is_active": user.is_active,
        "is_superuser": user.is_superuser,
        "full_name": user.full_name,
        "user_id": user.id
    }


@router.post("/test-token", response_model=schemas.User)
# @router.post("/test-token", response_model=schemas.Role_user)
def test_token(current_user: Optional[model.User] = Depends(deps.get_current_user)) -> Any:
    # def test_token(current_user: schemas.User = Depends(deps.get_current_user)) -> Any:
    """
    Test access token
    """
    # return {"message", "Test access token"}
    return current_user
