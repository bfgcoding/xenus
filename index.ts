import { Server } from "./core/server.ts";

/*
My goal is to write code like this

@Controller("path")


@Get()
async getSomething() {
  return "something"
}
 */

const api: Server = new Server();
api.build("./api");
api.serve(8080);

/*
  import { build } from "xenus"

  class customLogger implements Logger {
    info() {}
    warn() {}
    error() {}
  }

  main() {
    const logger: customLogger = new customerLogger();
    const server = await build("./api", logger).catch(err => {
      logger.error();
    })

    server.serve({ port: 8080 }).catch(err => {
      logger.error();
    })
  }

*/
