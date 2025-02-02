#Build Phase
# FROM node:alpine as builder
# WORKDIR './app'
# COPY package.json .
# RUN npm install
# COPY ./ ./
# RUN npm run build
 


# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json

COPY . /usr/src/app

# RUN npm install --silent  --save
RUN npm install  --save

# RUN npm install --save react-faux-dom



# start app
CMD ["npm", "start"]


