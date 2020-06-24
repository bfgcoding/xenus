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
api.build("api").catch((err) => {
  console.log(err);
});

api.serve(8080).catch((err) => {
  console.log(err);
});
