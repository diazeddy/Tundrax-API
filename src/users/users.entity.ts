import { Cat } from "src/cats/entities/cats.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column("text", { nullable: true, array: true, default: [] })
  roles: string[];

  @ManyToMany(() => Cat, (cat) => cat.users)
  @JoinTable()
  favoriteCats: Cat[];
}
