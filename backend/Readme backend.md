```sh
cd backend
```

```sh
python -m venv venv
```

```sh
venv\Scripts\activate
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

```sh
uvicorn app.initial_data:main --reload
```

```sh
uvicorn app.main:app --reload
```
