import { UserMessage } from './../modules/user/code';
import { UserCode } from 'src/common/modules/user/code';
import { JWT_SECRET_KEY } from './../constants/user';
import { BadGatewayException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { verify } from 'jsonwebtoken'
import { map } from 'rxjs/operators';
import { isRegExp } from 'util';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    
    private loggerWhiteList: string[] = [
        '/user/login'
    ]
    
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('loggerInterceptor');
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const { url } = req;
        let resp;

        // 白名单内的跳过拦截器
        if(!this.isInWhiteList(url)) {
            const token = req.headers['authorization'];
            try {
                resp = verify(token, JWT_SECRET_KEY);
                console.log(resp);
            } catch (error) {
                throw new BadGatewayException(`verify token failed: ${error}`)
            }
            
            resp = typeof resp === 'string' ? JSON.parse(resp) : resp;
            const { identity, userId, exp } = resp as { [key: string]: any };
            const now = Math.floor(Date.now() / 1000);
            if(now > exp) {
                // jwt 过期，重新登录
                return next.handle()
                    .pipe(map(() => (
                        {
                            code: UserCode.LOGIN_OVERDUE,
                            message: UserMessage[UserCode.LOGIN_OVERDUE]
                        }
                    )));
            }
        }

        return next.handle();
    }

    public isInWhiteList(url: string): boolean {
        return ((this.loggerWhiteList as Array<string>).findIndex((item: string) => RegExp(item).test(url))) !== -1;
    }
}