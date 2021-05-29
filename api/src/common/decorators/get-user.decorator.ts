import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/auth/jwt.strategy';

export const User = createParamDecorator(
  (_: UserPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
