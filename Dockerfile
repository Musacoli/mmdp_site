# use ubuntu base file
FROM ubuntu

# create working directory
WORKDIR '/mmdp'

# install critical  packages on ubuntu
RUN  apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq \
    && apt-get install yarn -yq

# install node dependencies
COPY ./package.json .
RUN npm cache clean --force
RUN npm install yarn -g
RUN yarn install
# RUN npm install semantic-ui-react

# copy files to the container
COPY . .
# build the code
CMD  ["node", "dist-server/index"]
