import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  age: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  breed: string;
}
