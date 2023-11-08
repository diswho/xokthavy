```sh
cd backend
```

```sh
venv\Scripts\activate
```

## Setting up EVN

```sh
python -m venv venv
```

```sh
pip install pipreqs
```

```sh
pipreqs p --force
```

```sh
pip freeze > requirements01.txt
```

```sh
pip install -r requirements.txt
```

```sh
pip install pydantic[dotenv]
```

## Initial Database

```sh
uvicorn app.initial_data:main --reload
```

## Run App

```sh
uvicorn app.main:app --reload
```
## Many-To-Many Relationships In FastAPI 

[URL](https://www.gormanalysis.com/blog/many-to-many-relationships-in-fastapi/)