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
