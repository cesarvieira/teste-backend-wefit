import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import personRoutes from "./routes/person.routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4568;

app.use("/person", personRoutes);

app.get("/ping", (_req: express.Request, res: express.Response) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
