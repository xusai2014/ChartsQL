import { RESTDataSource } from 'apollo-datasource-rest';
import {ApolloError} from 'apollo-server';


class LoginAPI extends RESTDataSource {
    constructor() {
        super();

        this.baseURL = `${this.host}/login`;
    }

    host = 'https://bigdata.autohome.com.cn';

    async getKaptcha() {
        // 卧槽 我差点二了
        return this.baseURL + `/defaultKaptcha?code=` + Math.random();
    }

    async errorFromResponse(response) {
        return new ApolloError('卧槽！我错了')
    }

    async loginWithPwd(account, pwd, captcha) {
        return this.post(`/userlogin`, {
            params: {username: account, password: pwd, captcha: captcha}
        });
    }
}

export {
    LoginAPI
}
