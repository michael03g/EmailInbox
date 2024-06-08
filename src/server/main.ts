import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";
import { Sequelize } from "sequelize";
import { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } from "./config";
import { initUser } from "./models/User";
import { initEmail } from "./models/Email";
import router from "./routes/api";

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT
});

initUser(sequelize);
initEmail(sequelize);

const app = express();
app.use(bodyParser.json());
app.use("/api", router);

sequelize.sync().then(() => {
  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000..."),
  );
})
