from pydantic import BaseModel, ConfigDict, Field
# from app.schemas.user import UserBase
from typing import Optional, List


class RoleBase(BaseModel):
    name: str
    remark: Optional[str] = None


class RoleCreate(RoleBase):
    pass


class RoleUpdate(RoleBase):
    pass


class RoleInDBase(RoleBase):
    id: int = Field(alias='role_id')
    name: str = Field(alias='role_name')
    # users: List[UserBase] = []
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True, extra='allow')


class Role(RoleInDBase):
    pass


class RoleInDBase(RoleInDBase):
    pass


class Role_user(BaseModel):
    user_id: int
    role_id: int
    remark: str
