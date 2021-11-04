// import express
import express, { Application, RequestHandler } from "express";
import morgan from "morgan";

// Routes
import indexRoutes from "./routes/index.routes";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(morgan("dev") as RequestHandler);
    this.app.use(express.json() as RequestHandler);
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
    });

    //this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(indexRoutes);
    //this.app.use("/posts", postRoutes);

  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server on port ", this.app.get("port"));
  }
}
