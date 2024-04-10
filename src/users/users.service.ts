import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Cat } from "src/cats/entities/cats.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  async hasUserLikedCat(userId: number, catId: number): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["favoriteCats"],
    });

    return user.favoriteCats.some((cat) => cat.id == catId);
  }


  /**
   * Adds a favorite cat to a user.
   *
   * @param userId The id of the user.
   * @param catId The id of the cat.
   * @returns The updated user.
   * @throws HttpException if the cat is not found or if the user has already liked the cat.
   */
  async addFavorite(userId: number, catId: number): Promise<User> {
    // Find the cat
    const cat = await this.catsRepository.findOne({
      where: { id: catId },
      relations: ["users"], // Load the users array
    });

    // Find the user
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["favoriteCats"], // Load the favoriteCats array
    });

    // Check if the user has already liked the cat
    const hasLiked = user.favoriteCats.some((cat) => cat.id == catId);

    // Throw an exception if the cat is not found
    if (!cat) {
      throw new HttpException("Cat not found.", HttpStatus.BAD_REQUEST);
    }

    // Throw an exception if the user has already liked the cat
    if (hasLiked) {
      throw new HttpException(
        "User has already liked this cat.",
        HttpStatus.CONFLICT
      );
    }

    // Add the cat to the user's favorite cats array
    user.favoriteCats.push(cat);

    // Save the updated user
    await this.usersRepository.save(user);

    // Return the updated user
    return user;
  }

  /**
   * Registers a new user.
   * 
   * @param createUserDto The user data.
   * @returns The newly created user.
   * @throws HttpException if the username already exists.
   */
  async register(createUserDto: CreateUserDto): Promise<User> {
    // Destructure the user data
    const { username, password, roles } = createUserDto;

    // Find existing user with the same username
    const existingUser = await this.usersRepository.findOneBy({ username });

    // Throw an exception if the username already exists
    if (existingUser) {
      throw new HttpException("Username already exists", HttpStatus.BAD_REQUEST);
    }

    // Create a new user
    const user = new User();
    user.username = username;
    user.password = password;
    user.roles = roles;

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      // Throw an exception if failed to register the user
      throw new HttpException("Failed to register user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Finds a user by username.
   * 
   * @param username The username of the user.
   * @returns The found user, or null if not found.
   */
  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }
}
