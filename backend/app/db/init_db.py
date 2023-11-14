from sqlalchemy.orm import Session

from app.crud import crud_user, crud_role
from app.schemas.user import UserCreate
from app.schemas.role import RoleCreate
from app.db.base import Base
from app.db.session import engine
from app.core.config import settings


def init_db(db: Session) -> None:
    # settings.FIRST_SUPERUSER = "vientiane@vientiane.com"
    # settings.FIRST_SUPERUSER_PASSWORD = "vientiane"
    Base.metadata.create_all(bind=engine)
    user = crud_user.get_by_email(db, email=settings.FIRST_SUPERUSER)

    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            full_name=settings.FIRST_SUPERUSER,
            is_superuser=True
        )
        role_user_in = RoleCreate(name="user")
        role_moderator_in = RoleCreate(name="moderator")
        role_admin_in = RoleCreate(name="admin")
        try:
            user = crud_user.create(db=db, user=user_in)
            role_user = crud_role.create_role(db=db, role=role_user_in)
            role_moderator = crud_role.create_role(
                db=db, role=role_moderator_in)
            role_admin = crud_role.create_role(db=db, role=role_admin_in)
            # user_in.roles = [role_user_in, role_moderator_in, role_admin_in]
        except:
            print("====== Error")
    else:
        print("====== User Exist")
