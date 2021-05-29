import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserPayload } from 'src/auth/jwt.strategy';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const user = context.getArgs()[0].user as UserPayload;

    const userPermissions = user.permissions;

    if (!routePermissions) {
      return true;
    }

    const hasPermission = (): boolean =>
      routePermissions.every((routePermission) =>
        userPermissions.includes(routePermission),
      );

    return hasPermission();
  }
}
