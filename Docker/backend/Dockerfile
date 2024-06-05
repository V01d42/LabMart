FROM python:3.10-slim
WORKDIR /backend

COPY /Docker/backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY /FastAPI/run.py /backend/
COPY /FastAPI/api /backend/api
COPY /FastAPI/core /backend/core
COPY /FastAPI/crud /backend/crud
COPY /FastAPI/db /backend/db
COPY /FastAPI/schemas /backend/schemas

CMD ["uvicorn", "run:app", "--reload", "--host", "0.0.0.0", "--port", "3001"]