[![Test Coverage](https://api.codeclimate.com/v1/badges/144a347123fc9ec7f179/test_coverage)](https://codeclimate.com/github/andela/mmdp_site/test_coverage)[![Maintainability](https://api.codeclimate.com/v1/badges/144a347123fc9ec7f179/maintainability)](https://codeclimate.com/github/andela/mmdp_site/maintainability)

# MMDP

## Vision

The Edo State Government, in a bid to eradicate illegal migration and promote economic prosperity and safety for its citizens have designed the ‘Managing Migration through Development’ programme. The objective of this programme is set against four thematic pillars which aligns with the Edo State overall development strategic plan. The interventions articulated in this document have been designed through collaborative efforts and wide consultations with local and international bodies. Alongside the ongoing response of the State Government to the issues that have prompted this programme, we welcome input, partnerships and support in order to make the desired programme outcome a reality for the people of Edo State so as to effectively eradicate Illegal migration and human trafficking in Edo State.

---

## Build status

### For team thor members about run the project on local machine

create a .env file in the root of your project
put the variables as shared
source the .env file in the terminal
and then you are set.

## Dependencies
* NodeJS - A JavaScript runtime environment
* Express - A web application framework for NodeJS
* Yarn - A dependancy manager
* Parcel - A web application bundler
* MongoDb - A noSql database

## 🚀 Getting started
Follow these steps to set up the project in development mode

* Install Nodejs

* Install and setup [mongoDb](https://www.mongodb.com/)

* Clone the repository and install dependancies
```bash
# Clone the repo
git clone https://github.com/andela/mmdp_site.git && cd mmdp_site

# install dependancies
yarn
```
* Create a .env file in the root of your directory. Checkout the keys requirement on the .env-sample file in the repository
```bash
JWT_SECRET=''
MONGODB_URL= <db-connection-url> # e.g mongodb://127.0.0.1/<databasename>
TEST_MONGODB_URL=<test-db-connection-url> # e.g mongodb://127.0.0.1/test-mmdp-cms
COOKIE_SECRET=<secret-key>
GMAIL_USER=mmpd.noreply@gmail.com
GMAIL_PASS=<gmail-password>
SERVER_APP_API_URL=<server-url>
S3_KEY=""
S3_SECRET=""
S3_BUCKET=""
S3_REGION=""
```

## Client App
-------------
### Running client App
```bash
yarn run client:dev
```
## Running tests
```bash
yarn test:client
```

## Server App
--------------
### Running the server App
```bash
yarn run:server
```
### Running server tests
```bash
yarn test:server
```
# 📖 Documentations
- [Folder structure](https://github.com/andela/mmdp_site/wiki/File-Structure)
- [Tools](https://github.com/andela/mmdp_site/wiki/Tools)
- [Conventions](https://github.com/andela/mmdp_site/wiki/Conventions)
- [APIs](https://github.com/andela/mmdp_site/wiki/APIs)
