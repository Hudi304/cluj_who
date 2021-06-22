import Hapi from "hapi";
import * as jwt from "jsonwebtoken";
import { UserRepository } from '../../ds/api/user_repository';
import bcrypt from "bcrypt";
import { User } from "../../ds/entity/user";
//! de hadeluit si request param optional SIZE


export const loginHandler = (repository: UserRepository) => {
  
  return async function (request: Hapi.Request, headers: any) {
    const payload: any = request.payload
    const { username, password } = payload
    if (!(username && password)) {
      return headers.response().code(400).message("No username or password!");
    }

    const result: User = await repository.getByUsername(username)
    if (!result) {
      return headers.response().code(401).message("Incorrect username!");
    }

    if (!bcrypt.compareSync(password, result.password)) {
      return headers.response().code(401).message("Incorrect password!");
    }

    console.log(result)
    const token = jwt.sign(
      { userId: result.id, username: result.username },
      "@QEGTUI",
      { expiresIn: "1h" }
    );

    return headers.response(token).code(200).message("Logged in");
  }
}




