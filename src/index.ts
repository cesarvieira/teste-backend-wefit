import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import personRoutes from "./routes/person.routes";
import swaggerUi from "swagger-ui-express";
import fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 4568;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (env === "development") {
  const swaggerFilePath = path.join(__dirname, '../swagger.json');
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use("/person", personRoutes);

app.get("/ping", (_req: express.Request, res: express.Response) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
  if (env === "development") {
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
  }
});
