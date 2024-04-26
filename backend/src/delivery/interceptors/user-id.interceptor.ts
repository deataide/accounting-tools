import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class InjectUserIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const userId = context.switchToHttp().getRequest().userId;
    return next.handle().pipe(
      map((data) => this.injectUserId(data, userId)),
    );
  }

  private injectUserId(data: any, userId: string): any {
    if (data && typeof data === 'object' && 'userId' in data) {
      return { ...data, userId };
    }
    return data;
  }
}
