import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Sign in a user with the provided username and password.
   *
   * @param username The username of the user.
   * @param pass The password of the user.
   * @returns A Promise that resolves to an object with an access_token.
   * @throws UnauthorizedException if the provided username or password is incorrect.
   */
  async signIn(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    // Find the user with the provided username
    const user = await this.usersService.findOne(username);

    // If the user or password is incorrect, throw an UnauthorizedException
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    // Create the payload for the JWT token
    const payload = {
      sub: user.id, // The user's id
      username: user.username, // The user's username
      roles: user.roles, // The user's roles
    };

    // Sign the payload and return the access_token
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
