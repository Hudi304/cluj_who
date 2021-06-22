
import { getConnection } from "typeorm";
import { UserRepository } from "../../../api/user_repository";
import { User } from "../../../entity/user";
import { Database } from './database';



export class SqliteOrmUserRepository implements UserRepository {

    private db: Database = new Database()

    async insert(user: User) {
        user.hashPassword()
        await this.db.getConnection("default").then(data => {
            data.createQueryBuilder()
                .insert()
                .into(User)
                .values([
                    { username: user.username, password: user.password, role: user.role }
                ])
                .execute()
        })

        return new User()


    }
    update(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getByUsername(username: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
        // return new Promise(async (resolve, reject) => {
        //     await getConnection()
        //     .createQueryBuilder()
        //     .select()
        //     .from(User, "user")
        //     .values([
        //         { username: user.username, password: user.hashPassword() }
        //     ])
        //     .execute();

        //     await SqliteConnection.getConnectionToSqlit().run(sql, params, (err: any) => {
        //         if (err) {
        //             console.log("Error running sql " + sql);
        //             console.log(err);
        //             reject(err);
        //         } else {
        //             resolve();
        //         }
        //     });
        // });
    }

}


