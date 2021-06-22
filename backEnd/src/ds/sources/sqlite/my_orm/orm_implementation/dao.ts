import { SqliteConnection } from "./connection";

export abstract class DAO {

    protected run(sql: string, params: any = []): Promise<number> {
        return new Promise(async (resolve, reject) => {
            await SqliteConnection.getConnectionToSqlit().run(sql, params, function(err) {
                if (err) {
                    console.log("Error running sql " + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    protected get(sql: string, params: any = []): Promise<any> {
        return new Promise((resolve, reject) => {
            SqliteConnection.getConnectionToSqlit().get(sql, params, (err: any, result: unknown) => {
                if (err) {
                    console.log("Error running sql: " + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    protected all(sql: string, params: any = []):Promise<any[]> {
        return new Promise((resolve, reject) => {
            SqliteConnection.getConnectionToSqlit().all(sql, params, (err: any, rows: any[]) => {
                if (err) {
                    console.log("Error running sql: " + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
