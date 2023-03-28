# ./Dockerfile
FROM python:3
ENV PYTHONUNBUFFERED 1
# 가상환경 생성
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN source /opt/venv/bin/activate
RUN mkdir /usr/src/app

# cron 설정
RUN apt-get update
RUN apt-get -y install cron
RUN apt-get -y install vim

WORKDIR /usr/src/app

RUN touch /var/log/cron.log

# 컨테이너 작업경로(requirements.txt, manage.py 위치)
RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY . .

## Install packages
RUN apt-get install -y python3-dev python3-pip
RUN pip3 install Django
RUN pip install --upgrade pip
RUN pip install django-crontab
COPY requirements.txt ./
RUN pip install -r requirements.txt

# cron 설정
RUN service cron start
RUN service cron status
RUN python manage.py crontab add

## Run the application on the port 8080
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]