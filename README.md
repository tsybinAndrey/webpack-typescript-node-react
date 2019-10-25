# Example of development and production environment with docker-compose (Typescript, React, Node.js)

This project is really simple example of how development and production environment can be setted up and used with **docker-compose**. Project is written in Typescript with backend in Node.js + Express and front-end in React. Service includes your app and **nginx** server.

# Prerequisites

- [docker](https://www.docker.com/)
- [node.js](https://nodejs.org)
- [yarn](https://yarnpkg.com/en/)

# Launch
 
```
$ yarn install
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up 	# to start service in development environment
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up 	# to start service in production
```
   
# Project Structure

```
.
+-- src
|	+-- front 		# code for server side
|	+-- server 		# code for front-end
+-- webpack 		# here are some webpack configs to build server and front
```