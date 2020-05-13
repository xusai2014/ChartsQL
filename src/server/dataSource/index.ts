import {RESTDataSource} from 'apollo-datasource-rest';
import {ApolloError} from 'apollo-server';


class LoginAPI extends RESTDataSource {
    constructor() {
        super();

        this.baseURL = ``;
    }

    host = '';
 

    async getKaptcha() {
        // 卧槽 我差点二了
        return this.baseURL + `/defaultKaptcha?code=` + Math.random();
    }

    async errorFromResponse(response) {
        return new ApolloError('卧槽！我错了')
    }

    async loginWithPwd({account, pwd, captcha}) {
        return await this.post(`/userlogin?username=${account}&password=${pwd}&captcha=${captcha}`, {}, {
           
        }).then((res)=>{
            console.log('xusai++++++++res',res)
            return res;
        },(err)=>{
            console.log('xusai++++++++err',err)
            return err;
        });
    }
}

export {
    LoginAPI
}
