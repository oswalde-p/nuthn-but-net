FROM node:10.15-alpine
ADD package.json package-lock.json /
RUN npm install
ADD index.js /
CMD ["node", "index.js"]
