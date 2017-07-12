FROM node:4-onbuild

RUN mkdir -p /cfdwebui

# Install app dependencies
COPY . /cfdwebui

#Install package
RUN cd /cfdwebui; npm -g install npm@latest; npm install

ENV MONGOCOST_IP_27017 35.185.168.126
ENV MONGOCOST_PORT_27017 27017
ENV AWS_IP_3000 127.0.0.1
ENV AWS_PORT_3000 3000

RUN echo $MONGOCOST_IP_27017
EXPOSE 5100

#EXPOSE  5100
CMD ["node", "server.js"]