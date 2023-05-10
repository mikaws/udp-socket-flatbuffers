import * as dgram from "dgram";
import Log4js from "log4js";
import { Server } from "./Server";

class Application {
  static create() {
    const log = Log4js.getLogger("server");
    log.level = "debug";

    const socket = new Server();
    const server = socket.start();

    this.error(server, log);
    this.close(server, log);
  }

  static error(server: dgram.Socket, log: Log4js.Logger) {
    server.on("error", (err: Error) => {
      log.error(`server error:\n${err.stack}`);
      server.close();
    });
  }

  static close(server: dgram.Socket, log: Log4js.Logger) {
    server.on("close", () => {
      log.info("socket was closed!");
    });
  }
}

export default Application;
