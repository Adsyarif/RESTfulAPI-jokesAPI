import express, { Request, Response, NextFunction } from "express";
import jokesRoutes from "./routes/jokes";
import randomRouters from "./routes/random";
import filter from "./routes/filterJokes";
import bodyParser, { json } from "body-parser";

const app = express();

app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/jokes", jokesRoutes);
app.use("/random", randomRouters);
app.use("/filter", filter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("COneet");
});
