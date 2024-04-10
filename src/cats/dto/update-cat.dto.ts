import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  age?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  breed?: string;
}
