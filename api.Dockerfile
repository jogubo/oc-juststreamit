FROM archlinux:latest AS juststreamit-api

WORKDIR /usr/src/app

RUN pacman -Syu --noconfirm nginx git python python-pip \
    && pacman -Scc --noconfirm

RUN git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git /usr/src/app \
    && pip install -r requirements.txt \
    && python manage.py migrate \
    && python manage.py create_db


RUN systemctl enable nginx.service


EXPOSE 8000

ENTRYPOINT ["python", "manage.py"]

CMD ["runserver", "0.0.0.0:8000"]
