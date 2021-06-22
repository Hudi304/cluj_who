import { residenceRoutes } from "./routes/residence_routes";
import Hapi from "hapi";
import Bcrypt from "bcrypt";
import { userRoutes } from './routes/user_routes';

const users = {
  future: {
    id: "1",
    username: "future",
    password: "12345", // 'studio'
  },
};

const data = [
	{ id: 1, name: 'Alex', age: 21 },
	{ id: 2, name: 'Alice', age: 23 }
];

 //!fisier de constante + localhost = 0.0.0.0

const basicValidation = async function (request, username, password) {
    const user = users[username];
    let isValid = await Bcrypt.compare(password, user.password);
    if (!user) {
        return { isValid: false };
    }

    if (password == user.password) {
        isValid = true 
    } else {
        isValid = false
    }
    

    return { isValid, credentials: { id: user.id, username: user.username } };
};

export async function init() {

    const server = new Hapi.Server({
        port: 3000,
        host: "localhost",
    });

    await server.register({
        plugin: require("hapi-auth-basic"),
    });

    server.auth.strategy("simple", "basic", {
        validate: basicValidation,
    });

    server.route({
        method: 'GET',
        path: '/mock',
        handler: (request, h) => {
            return { data };
        }
    });


   
    //* din cate inteleg pana acuma ne-ar trebui schema noastra de autorizare 
    //* sau folosim JWT

    server.route(userRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
}


    process.on("unhandledRejection", (err) => {
        console.log(err);
        process.exit(1);
    });

//* pentru baza de data Type-ORM

init();
