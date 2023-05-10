import * as dgram from "dgram";
import Log4js from "log4js";
import { Client } from "./Client";

class Application {
  static create() {
    const log = Log4js.getLogger("client");
    log.level = "debug";

    const socket = new Client();
    const client = socket.start();

    this.error(client, log);
    this.close(client, log);
  }

  static error(client: dgram.Socket, log: Log4js.Logger) {
    client.on("error", (err: Error) => {
      log.error(`server error:\n${err.stack}`);
      client.close();
    });
  }

  static close(client: dgram.Socket, log: Log4js.Logger) {
    client.on("close", () => {
      log.info("socket was closed!");
    });
  }
}

export default Application;
