import { MyOrmUserRepository } from "../../ds/sources/sqlite/my_orm/my_orm_user_repository";
import { loginHandler } from "../handlers/user_handlers";

  const userRepository = new MyOrmUserRepository()
  
  export const userRoutes = [
    {
      method: "POST",
      path: "/login",
      handler: loginHandler(userRepository),
    }
    
  ];
  
  
  