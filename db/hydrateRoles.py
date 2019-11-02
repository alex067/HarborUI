import sys
sys.path.append('..')
from app import app, db
from app.models import Roles

# hydrate the roles table 
super_role = Roles(
    role="super",
    level=0
)
admin_role = Roles(
    role="admin",
    level=1
)
developer_role = Roles(
    role="developer",
    level=2
)
support_role = Roles(
    role="support",
    level=3
)

db.session.add(super_role)
db.session.add(admin_role)
db.session.add(developer_role)
db.session.add(support_role)

db.session.commit()