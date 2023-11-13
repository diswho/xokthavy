from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from typing import TYPE_CHECKING
from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User

class Role(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    # users = relationship("User", secondary="user_roles", back_populates="roles")
    users = relationship("RoleUser", back_populates="role")