# 引用镜像
FROM node:8.9-alpine

# 作者
MAINTAINER fangyong

# 执行命令，创建文件夹
RUN mkdir -p /home/nodejs/hckj-node-v1

# 将hckj-node-v1目录拷贝到镜像里
ADD ../hckj-node-v1  /home/nodejs/hckj-node-v1

# 指定工作目录
WORKDIR /home/nodejs/hckj-node-v1

# 安装依赖及构建node应用
RUN npm install
RUN npm build

# 配置系统变量，指定端口
ENV HOST 0.0.0.0
ENV PORT 4700

# 将端口4700开放
EXPOSE 4700

# 容器启动命令
CMD ["npm", "start"]
