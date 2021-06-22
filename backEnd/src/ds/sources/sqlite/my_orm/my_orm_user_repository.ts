import { UserRepository } from "../../../api/user_repository";
import { User } from "../../../entity/user";
import { GenericEntityRepository } from "./orm_implementation/entity_repository";

export class MyOrmUserRepository extends GenericEntityRepository<User> implements UserRepository {

  constructor() {
    super(User)
  }
  
  async insert(user: User): Promise<User> {
    return await this.insertEntity(user)
  }

  async update(user: User): Promise<User> {
    return await this.updateEntity(user)
  }

  async delete(user: User): Promise<User> {
    return await this.deleteEntity(user)
  }

  async getById(id: number): Promise<User> {
    let users: User[] = await this.findByOneArg("id", id)
    if (users && users.length != 0) {
      return users[0]
    }
    return undefined
  }

  async getByUsername(username: string): Promise<User> {
    let users: User[] = await this.findByOneArg("username", username)
    if (users && users.length != 0) {
      return users[0]
    }
    return undefined
  }

  async findAll(): Promise<User[]> {
    return await this.findAllEntities()
  }
}