import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./interfaces/cat.interface";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard, RolesGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  /**
   * Find all cats.
   *
   * @return {Promise<Cat[]>} The list of all cats.
   */
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  
  @Get(":id")
  /**
   * Find a cat by its ID.
   *
   * @param id The ID of the cat to find.
   * @returns A Promise that resolves to a Cat object representing the cat with the given ID.
   */
  findById(
    @Param("id", new ParseIntPipe())
    id: number // The ID of the cat to find.
  ) {
    return this.catsService.findById(id);
  }

  /**
   * Create a new cat.
   *
   * @param createCatDto The data for the new cat.
   */
  @Post()
  @Roles(["admin"])
  create(@Body() createCatDto: CreateCatDto) {
    // Call the create method of the cats service to create a new cat.
    this.catsService.create(createCatDto);
  }
  
  @Put(":id")
  @Roles(["admin"])
  /**
   * Update a cat by its ID.
   *
   * @param id The ID of the cat to update.
   * @param updateCatDto The data with which to update the cat.
   * @returns A Promise that resolves to the updated Cat object.
   */
  @Put(":id")
  @Roles(["admin"])
  updateOne(
    @Param("id", new ParseIntPipe())
    id: number, // The ID of the cat to update.
    @Body()
    updateCatDto: UpdateCatDto, // The data with which to update the cat.
  ) {
    // Call the updateById method of the cats service to update the cat with the given ID.
    // The method returns a Promise that resolves to the updated Cat object.
    return this.catsService.updateById(id, updateCatDto);
  }

  @Delete(":id")
  @Roles(["admin"])
  /**
   * Delete a cat by its ID.
   *
   * @param id The ID of the cat to delete.
   * @returns A Promise that resolves to void.
   */
  @Delete(":id")
  @Roles(["admin"])
  remove(@Param("id") id: number): Promise<void> {
    // Call the remove method of the cats service to delete the cat with the given ID.
    // The method returns a Promise that resolves to void.
    return this.catsService.remove(id);
  }
}
