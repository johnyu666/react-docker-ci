# 1. 前后端分离的react web项目
完成了基于后端的分页方式（Json-server自动功能）的前端列表显示
# 2. 基于docker的交付
详见ci.sh:
```
#!/bin/bash
npm run build
cd build
tar cvf ../docker-front/dist.tar .
cd ../docker
docker build -t registry.cn-zhangjiakou.aliyuncs.com/johnyucn525/react-albums-httpd .
docker push registry.cn-zhangjiakou.aliyuncs.com/johnyucn525/react-albums-httpd

cd ../docker-back
docker build -t registry.cn-zhangjiakou.aliyuncs.com/johnyucn525/albums-json-server .
docker push registry.cn-zhangjiakou.aliyuncs.com/johnyucn525/albums-json-server
```
# 3. docker-compose方式的容器编排
```
version: "3.9"
services:
  front:
    image: "registry.cn-zhangjiakou.aliyuncs.com/johnyucn525/react-albums-httpd"
    ports:
      - "3001:80"
  back:
    image: "registry.cn-zhangjiakou.aliyuncs.com/johnyucn525/albums-json-server"
    ports:
      - "3000:80"
```