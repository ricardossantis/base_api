# pull official base image
FROM node:13.12.0-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install nodemon -g --silent
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 9001
EXPOSE 8000

# start app
CMD ["npm", "start"]