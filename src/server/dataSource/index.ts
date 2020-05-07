import {RESTDataSource} from 'apollo-datasource-rest';
import {ApolloError} from 'apollo-server';


class LoginAPI extends RESTDataSource {
    constructor() {
        super();

        this.baseURL = `${this.host}/login`;
    }

    host = 'http://aicloudauthgateway-test-8785.en-315.svc:80';

    async getKaptcha() {
        // 卧槽 我差点二了
        return this.baseURL + `/defaultKaptcha?code=` + Math.random();
    }

    async errorFromResponse(response) {
        return new ApolloError('卧槽！我错了')
    }

    async loginWithPwd({account, pwd, captcha}) {
        return this.post(`/userlogin?username=${account}&password=${pwd}&captcha=${captcha}`, {}, {
            headers: {

                "Accept":"*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Content-Length": "0",

                "Pragma": "no-cache",
                "sec-ch-ua": "Google Chrome 80",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
                "Referer": "https://bigdata.autohome.com.cn/",
                "Origin": "https://bigdata.autohome.com.cn",
                "Host": "bigdata.autohome.com.cn",
                "Cookie": "fvlid=1575519928892hCbh6V2Yre; sessionid=ABED44CD-ABD3-4013-AA97-0FFEDBBC1549%7C%7C2019-12-05+12%3A25%3A28.391%7C%7C0; autoid=6e8b4530b4f982b2380b05f5e072fdcb; __ah_uuid_ng=c_ABED44CD-ABD3-4013-AA97-0FFEDBBC1549; AuthCookieOL=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyTmFtZSI6Inh1c2FpIiwiaXNzIjoidXNlciIsIlRzIjoiMTU3NzM4MDA5MDEzNSJ9.2-cla-H6qxebet7j1-A4Pz19X41NDMgWYgf4QpZlfuk; cookieCityId=110100; sessionuid=ABED44CD-ABD3-4013-AA97-0FFEDBBC1549%7C%7C2019-12-05+12%3A25%3A28.391%7C%7C0; AiCloudCheckId=c2864b5c-36fc-43da-a1d1-0601aea55f2b; locale=zh; ahpau=1; area=110105; sessionip=123.117.169.117; bigdataUserName=xusai; fvlid=1575519928892hCbh6V2Yre; AiCloudCheckId=bf39843a-d23a-48b6-93b5-e727e9adc14f; sessionvid=7F4CFC09-3EBE-4BC3-8670-90B3158E0549; ahpvno=39; v_no=25; visit_info_ad=ABED44CD-ABD3-4013-AA97-0FFEDBBC1549||7F4CFC09-3EBE-4BC3-8670-90B3158E0541||-1||-1||25; ref=192.168.0.110%7C0%7C0%7Clocalhost%7C2020-04-02+15%3A58%3A43.936%7C2020-03-31+01%3A07%3A17.733"
            }
        });
    }
}

export {
    LoginAPI
}
