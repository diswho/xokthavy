# Start

`cd backend\app`

# Initial

`python -m venv venv`

`python -m pip install --upgrade pip`

`pip install pipreqs`

`pip install "uvicorn[standard]"`

`pipreqs . --force`

`pip freeze > requirements.txt`

`pip install -r requirements.txt`

# Run

`uvicorn app.initial_data:main`

`uvicorn app.main:app --reload`

`uvicorn backend.app.app.main:app --reload`

## Handle JWT tokens

`openssl rand -hex 32`
