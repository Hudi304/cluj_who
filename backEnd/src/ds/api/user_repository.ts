import { User } from "../entity/user";


export interface UserRepository{
    insert(user: User):Promise<User>
    update(user: User):Promise<User>

    delete(user: User):Promise<User>
    
    getById(id: number): Promise<User>
    getByUsername(username: string): Promise<User>
    
    findAll():Promise<User[]>
    
}