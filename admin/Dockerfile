FROM node:8.9-alpine

# 作者
MAINTAINER fangyong

# 执行命令，创建文件夹
RUN mkdir -p /home/nodejs/nodeProject

# 将demoProject1目录拷贝到镜像里
ADD ./hckj-node-v1 /home/nodejs/nodeProject

# 指定工作目录
#  将Dockerfile当前目录下所有文件拷贝至容器内项目目录并安装项目依赖
COPY . /home/nodejs
WORKDIR /home/nodejs/nodeProject

# 安装依赖及构建node应用
RUN npm install
# RUN npm build

# 配置系统变量，指定端口
ENV HOST 0.0.0.0
ENV PORT 4700

#对外暴露的端口
EXPOSE 3000

#程序启动脚本
CMD ["npm", "start"]
