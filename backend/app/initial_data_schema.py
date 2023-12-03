import logging

from app.db.session import SessionLocal
from app.model import User, Role, RoleUser
from app.db.base import Base
from app.db.session import engine
from app.schemas.role import RoleCreate
from app.schemas.user import UserCreate
from app.crud import crud_user, crud_role
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()

    role_user = RoleCreate(name="user")
    role_moderator = RoleCreate(name="moderator")
    role_admin = RoleCreate(name="admin")

    crud_role_user = crud_role.create_role(db=session, role=role_user)
    crud_role_moderator = crud_role.create_role(
        db=session, role=role_moderator)
    crud_role_admin = crud_role.create_role(db=session, role=role_admin)

    user_in = UserCreate(
        email=settings.FIRST_SUPERUSER,
        hashed_password=settings.FIRST_SUPERUSER_PASSWORD,
        full_name=settings.FIRST_SUPERUSER,
        is_superuser=True
    )
    user = crud_user.create(db=session, user=user_in)
    role_user01 = crud_role.create_user_role(db=session,
                                             role_id=crud_role_user.id, user_id=user.id,
                                             remark=user.email + "-" + crud_role_user.name)
    role_user02 = crud_role.create_user_role(db=session,
                                             role_id=crud_role_moderator.id, user_id=user.id,
                                             remark=user.email + "-" + crud_role_moderator.name)
    role_user03 = crud_role.create_user_role(db=session,
                                             role_id=crud_role_admin.id, user_id=user.id,
                                             remark=user.email + "-" + crud_role_admin.name)

    # uvicorn app.initial_data_schema:main


def main() -> None:
    logger.info("====== Creating initial data")
    init()
    logger.info("====== Initial data created")


if __name__ == "__main__":
    main()
