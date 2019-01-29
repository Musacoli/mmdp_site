# use ubuntu base file
FROM ubuntu as builder

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
RUN npm install

# copy files to the container
COPY . .
# build the code
CMD  ["npm", "run", "build"]

FROM ubuntu

RUN  apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq 



RUN npm install -g yarn
# run the server with npm
WORKDIR "/mmdp"
COPY ./package.json .
RUN npm install
COPY --from=builder /mmdp/dist-server .
CMD ["npm", "start"]

