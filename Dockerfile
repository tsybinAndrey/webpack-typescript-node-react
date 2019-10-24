FROM node:12.12.0-alpine

ARG NODE_ENV

ENV NODE_ENV $NODE_ENV

RUN apk add yarn

# create node_modules folder and set permissions to user=node group=node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# set up working directory
WORKDIR /home/node/app

# copy package.json and package-lock.json to work dir
COPY package*.json ./

# set current user=node
USER node

# install packages
RUN if [ "$NODE_ENV" = "production" ]; \
      then yarn install; \
      else echo "this is development environment. do nothing..." ; \
      fi

# copying application code
COPY --chown=node:node . .

# building server for production
RUN if [ "$NODE_ENV" = "production" ]; \
      then yarn server:build; \
      else echo "skipping building server step in development..." ; \
      fi
      

# building front end for production
RUN if [ "$NODE_ENV" = "production" ]; \
      then yarn front:build; \
      else echo "skipping building front step in development..." ; \
      fi

CMD ["yarn", "start"]