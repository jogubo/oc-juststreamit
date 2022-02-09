FROM debian:bullseye-slim AS juststreamit-api

WORKDIR /usr/src/app

RUN apt update && apt upgrade -y \
    && apt install -y git python3 python3-pip \
    && rm -rf /var/lib/apt/lists/* \
    && git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git /usr/src/app \
    && pip3 install -r requirements.txt \
    && python3 manage.py migrate \
    && python3 manage.py create_db \
    && apt remove -y git python3-pip

EXPOSE 8000

ENTRYPOINT ["python3", "manage.py"]

CMD ["runserver", "0.0.0.0:8000"]
