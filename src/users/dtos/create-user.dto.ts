import { IsArray, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
  readonly id: number;
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString({ each: true })
  @IsArray()
  readonly roles: string[];
}
