import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly validApiKey = 'my-secret-api-key'; // mock secret key

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Example: check for API key in headers (you can also check Authorization header)
    const apiKey = request.headers['x-api-key'];

    if (apiKey && apiKey === this.validApiKey) {
      return true; // authorized
    }

    throw new UnauthorizedException('Invalid API key');
  }
}
