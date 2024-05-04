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
    const route = request.route.path;

    if (route === '/signup') {
      return true;
    }

    const token = request.cookies.access_token;

    if (!token || !this.jwt.validateAccess(token)) {
      return false;
    }

    const decodedToken = this.jwt.validateAccess(token);
    if (!decodedToken || !decodedToken.sub) {
      return false;
    }

    request.userId = decodedToken.sub;

    return true;
  }
}
