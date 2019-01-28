FROM ubuntu

WORKDIR '/mmdp'


RUN  apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq


COPY ./package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "dev-server"]

