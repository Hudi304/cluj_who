import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import bcrypt from "bcrypt";
import { EntitySqlLite, PrimaryKeySqlLite, UniqueSqlLite } from "../sources/sqlite/my_orm/decorators/entity_decorator";

@EntitySqlLite("user")
@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  @PrimaryKeySqlLite
  id: number = -1;

  @Column()
  @Length(4, 20)
  @UniqueSqlLite
  username: string = "";

  @Column()
  @Length(4, 100)
  password: string = "";

  @Column()
  @IsNotEmpty()
  role: string = "";

  @Column()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @Column()
  @UpdateDateColumn()
  updatedAt: Date = new Date();

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}