FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* tsconfig.json .eslint* .eslintrc* ./
RUN npm install --legacy-peer-deps
COPY src ./src
RUN npm run build
EXPOSE 8444
CMD ["npm", "run", "start"]
