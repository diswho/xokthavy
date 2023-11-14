from typing import TYPE_CHECKING
from app.db.base_class import Base
from sqlalchemy import Column, ForeignKey,  String
from sqlalchemy.orm import declarative_base, relationship, joinedload
from sqlalchemy.ext.associationproxy import association_proxy

if TYPE_CHECKING:
    from .user import User
    from .role import Role


class RoleUser(Base):
    user_id = Column(ForeignKey('user.id'), primary_key=True)
    role_id = Column(ForeignKey('role.id'), primary_key=True)
    remark = Column(String, nullable=False)
    role = relationship("Role", back_populates="users")
    user = relationship("User", back_populates="roles")
    # proxies
    role_name = association_proxy(target_collection='role', attr="name")
    user_name = association_proxy(target_collection='user', attr="name")
