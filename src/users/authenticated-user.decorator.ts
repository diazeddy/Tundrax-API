// authenticated-user.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./users.entity";

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
