FROM node:18

WORKDIR home/frontend

COPY . ./

RUN npm i && npm run build

EXPOSE 8300
CMD ["npm","run","dev"]
