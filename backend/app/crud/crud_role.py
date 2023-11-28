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


def create_user_role(db: Session,  obj_in: Union[schemas.RoleInDBase, Dict[str, Any]], user_id: int):
    if isinstance(obj_in, dict):
        update_data = obj_in
    else:
        update_data = obj_in.model_dump(exclude_unset=True)

    
    db_role = RoleUser(**obj_in.model_dump(), user_id=user_id)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role
