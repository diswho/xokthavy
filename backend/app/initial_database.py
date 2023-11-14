import logging

from app.db.session import SessionLocal
from app.model import User, Role, RoleUser
from app.db.base import Base
from app.db.session import engine
# from app.db.init_db import init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# def init() -> None:
#     db = SessionLocal()
#     init_db(db)


# def main() -> None:
#     logger.info("====== Creating initial data")
#     init()
#     logger.info("====== Initial data created")


# if __name__ == "__main__":
#     main()
def init() -> None:
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()

    role1 = Role(name="user")
    role2 = Role(name="moderator")
    role3 = Role(name="admin")
    session.add_all([role1, role2, role3])
    session.commit()

    user1 = User(full_name="normal", email="superadmin1", hashed_password="")
    user2 = User(full_name="superadmin", email="superadmin", hashed_password="")

    session.add_all([user1, user2])
    session.commit()

    role_user1 = RoleUser(role_id=role1.id, user_id=user1.id, remark="Blue wrote chapter 1")
    role_user2 = RoleUser(role_id=role2.id, user_id=user1.id, remark="Chip wrote chapter 2")
    role_user3 = RoleUser(role_id=role2.id, user_id=user2.id, remark="Blue wrote chapters 1-3")
    role_user4 = RoleUser(role_id=role3.id, user_id=user2.id, remark="Alyssa wrote chapter 4")

    session.add_all([role_user1, role_user2, role_user3, role_user4])
    session.commit()


def main() -> None:
    logger.info("====== Creating initial data")
    init()
    logger.info("====== Initial data created")


if __name__ == "__main__":
    main()
