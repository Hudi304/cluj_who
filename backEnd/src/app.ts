import { UserRepository } from "./ds/api/user_repository";
import { User } from "./ds/entity/user";
import { MyOrmUserRepository } from "./ds/sources/sqlite/my_orm/my_orm_user_repository";
import { SqliteOrmUserRepository } from "./ds/sources/sqlite/typeorm/sqlite_typeorm_user_repository";
import bcrypt from 'bcrypt';


console.log("================================== It works =====================================")

async function f() {
  let user: User = new User()
  let repo: UserRepository = new MyOrmUserRepository()

  //repo.insert(user)
  user = await repo.getByUsername("Itachi")
  await repo.delete(user)

  user = new User()
  user.role = "GUEST"
  user.username = "Itachi"
  user.password = "1234"
  // user.updatedAt = new Date("2016-01-01")
   user.hashPassword()
   user = await repo.insert(user)

  
  // console.log(bcrypt.compareSync("1234", user.password))
  // console.log(await repo.findAll())
}

f()







