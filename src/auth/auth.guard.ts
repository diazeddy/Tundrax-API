import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}


  /**
   * Verify if the request can be activated.
   *
   * @param {ExecutionContext} context - The execution context.
   * @returns {Promise<boolean>} A promise that resolves to a boolean
   * indicating if the request can be activated.
   * @throws {UnauthorizedException} If the authentication header is missing
   * or invalid.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the request from the execution context
    const req = context.switchToHttp().getRequest();

    const authHeader = this.extractTokenFromHeader(req);

    if (!authHeader) throw new UnauthorizedException();

    try {
      // Verify the authentication header using the JWT service
      const payload = await this.jwtService.verifyAsync(authHeader, {
        secret: jwtConstants.secret,
      });

      // Assign the payload to the request's user property
      req.user = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
