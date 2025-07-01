FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Instala wait-for-it para esperar a MySQL
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
ENV PORT=8001
EXPOSE 8001
CMD ["/bin/bash", "-c", "/wait-for-it.sh mysql:3306 --timeout=60 --strict -- npm run db:migrate && npm run db:seed && npm start"] 