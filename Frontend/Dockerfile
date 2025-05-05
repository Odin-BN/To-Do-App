#Image from Node 18
FROM node:18 AS build

#Work directoru
WORKDIR /app

#Copy the file of the frontend
#COPY package.json package-lock.json ./
COPY . .

RUN npm install

#Copy the rest of the files 
#COPY . .
RUN npm run build

#Using an image from Nginx
FROM nginx:alpine AS runner

#WORKDIR /app

COPY --from=build /app/dist /usr/share/nginx/html

#Expose port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
