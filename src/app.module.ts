import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CatsModule } from "./cats/cats.module";
import { CoreModule } from "./core/core.module";
import { Cat } from "./cats/entities/cats.entity";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: process.env.POSTGRES_DATABASE || "postgres",
      entities: [Cat, User],
      synchronize: true,
    }),
    CoreModule,
    CatsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
