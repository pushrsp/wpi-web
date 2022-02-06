import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Response } from "express";

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next
      .handle()
      .pipe(map((data) => ({ data: data, error: null, statusCode: response.statusCode, message: "success" })));
  }
}
