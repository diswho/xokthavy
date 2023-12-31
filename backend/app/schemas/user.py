from app.schemas.item import Item
from app.schemas.role import RoleBase, Role_user
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing import Optional, List


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    full_name: Optional[str] = None
    remark: Optional[str] = None


class UserCreate(UserBase):
    email: EmailStr
    hashed_password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: int = Field(alias='user_id')
    email: Optional[EmailStr] = Field(alias='user_name')
    is_active: bool
    items: List[Item] = []
    roles: List[Role_user] = []
    # roles: List[RoleBase] = []
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True, extra='allow')


class User(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    hashed_password: str
