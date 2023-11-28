import logging

from app.db.session import SessionLocal
from app.model import User, Role, RoleUser
from app.db.base import Base
from app.db.session import engine
# from app.db.init_db import init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()

    role_user = Role(name="user")
    role_moderator = Role(name="moderator")
    role_admin = Role(name="admin")
    session.add_all([role_user, role_moderator, role_admin])
    session.commit()

    user_normal = User(full_name="normal", email="superadmin1", hashed_password="")
    user_superadmin = User(full_name="superadmin",
                 email="superadmin", hashed_password="")

    session.add_all([user_normal, user_superadmin])
    session.commit()

    role_user1 = RoleUser(role_id=role_user.id, user_id=user_normal.id,
                          remark="Blue wrote chapter 1")
    role_user2 = RoleUser(role_id=role_moderator.id, user_id=user_normal.id,
                          remark="Chip wrote chapter 2")
    role_user3 = RoleUser(role_id=role_moderator.id, user_id=user_superadmin.id,
                          remark="Blue wrote chapters 1-3")
    role_user4 = RoleUser(role_id=role_admin.id, user_id=user_superadmin.id,
                          remark="Alyssa wrote chapter 4")

    session.add_all([role_user1, role_user2, role_user3, role_user4])
    session.commit()


def main() -> None:
    logger.info("====== Creating initial data")
    init()
    logger.info("====== Initial data created")


if __name__ == "__main__":
    main()

# def init() -> None:
#     db = SessionLocal()
#     init_db(db)


# def main() -> None:
#     logger.info("====== Creating initial data")
#     init()
#     logger.info("====== Initial data created")


# if __name__ == "__main__":
#     main()
