import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Auth interceptor called - just for trying around');
    return next.handle(req);
  }
}
