// import express
import express, { Application } from "express";
import morgan from "morgan";

// Routes
import indexRoutes from "./routes/index.routes";
// import postRoutes from "./routes/post.routes";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
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
