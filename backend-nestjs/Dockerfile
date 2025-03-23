# cài môi trường nodejs
FROM node:20

# tạo folder app
WORKDIR /home/app

# copy file package.json vafo folder app
COPY package.json ./

# cài thư viện trong file package.json
RUN npm install

# copy prisma từ local => docker
# B1. tạo folder prisma trong docker
# B2: copy file
COPY prisma ./prisma/

# tạo prisma client
RUN npx prisma generate

# copy toàn bộ source code vào thư mục app
# . đầu tiên: copy tất cả file trong thư mục hiện tại
# . thứ hai: thư mục app
COPY . .

# expose port
EXPOSE 3000

# start server trong docker
CMD ["npm", "run", "start"]