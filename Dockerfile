FROM thub.autohome.com.cn/a-one/nodejs:centos7.4.1708-nodejs12.13.1

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

RUN npm install -g pm2 && pm2 -v

RUN pm2 install pm2-logrotate

ENV NODE_ENV production

EXPOSE 80

CMD ["pm2-runtime", "start", "lib/server/index.js", "--name", "chartsQL", "-i", "32"]
