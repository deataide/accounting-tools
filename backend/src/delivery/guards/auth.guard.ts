import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAdapterService } from 'src/adapters/implementations/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtAdapterService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token || !this.jwt.validateAccess(token)) {
      return false;
    }

    return true; 
  }
}
