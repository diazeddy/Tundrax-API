import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeORMPostgresTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DATABASE || "postgres",
    entities: [...entities],
    synchronize: true,
  });