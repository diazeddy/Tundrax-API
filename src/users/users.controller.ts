import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";

import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthenticatedUser } from "./authenticated-user.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("register")

  /**
   * Registers a new user.
   *
   * @param createUserDto The data for the new user.
   * @returns The newly created user.
   * @throws HttpException if the username already exists.
   */
  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    // Call the UsersService to register the new user.
    return this.userService.register(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Post("/favorite/:catId")
  /**
   * Adds a favorite cat to a user.
   *
   * @param catId The id of the cat to add as a favorite.
   * @param user The user object of the authenticated user.
   * @returns The updated user object.
   */
  @UseGuards(AuthGuard)
  @Post("/favorite/:catId")
  async addFavoriteCat(
    @Param("catId") catId: number,
    @AuthenticatedUser() user: User
  ): Promise<User> {
    return this.userService.addFavorite(user.id, catId);
  }
}
