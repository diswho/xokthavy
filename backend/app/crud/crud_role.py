from sqlalchemy.orm import Session
from app.model.role import Role
from app import schemas
from typing import Optional
# from app.model.user import User

def create_role(db: Session, role: schemas.RoleCreate) -> Optional[Role]:
    db_role = Role(name=role.name)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role


# def create_user_role(db: Session, roles: schemas.RoleCreate, user: User):
#     db_role = Role(**roles.dict(), user=user)
#     db.add(db_role)
#     db.commit()
#     db.refresh(db_role)
#     return db_role
