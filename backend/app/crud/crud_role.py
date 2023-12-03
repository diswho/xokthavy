from sqlalchemy.orm import Session
from app.model import RoleUser, Role
from app import schemas
from typing import Optional, Union, Dict, Any


def create_role(db: Session, role: schemas.RoleCreate) -> Optional[Role]:
    db_role = Role(name=role.name)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role


def create_user_role(db: Session,  role_id: int, user_id: int, remark=str) -> Optional[RoleUser]:
    db_role = RoleUser(role_id=role_id, user_id=user_id,
                       remark=remark)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role
