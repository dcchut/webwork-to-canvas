FROM node:alpine as builder

# Install dependencies
WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn global add @angular/cli@8.3.17
RUN yarn install

# Copy and build the app
COPY . /app
RUN yarn run prod

# Build a small nginx image with state website
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/webwork-to-canvas /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
