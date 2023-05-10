import * as dgram from "dgram";
import * as flatbuffers from "flatbuffers";
import { AddressInfo } from "net";
import { MessageHandler } from "./MessageHandler";
import Log4js from "log4js";

type MessageData = {
  builder: flatbuffers.Builder;
  messageOffset: number;
  message: number;
  messageBuffer: Uint8Array;
};

export class Server {
  private PORT = 41234;
  private log = Log4js.getLogger("server");

  public start() {
    const server = dgram.createSocket("udp4");
    server.bind(this.PORT);

    this.handle(server);
    return server;
  }

  private handle(server: dgram.Socket) {
    server
      .on("listening", () => {
        const address: AddressInfo = server.address();
        this.log.info(`server listening on ${address.address}:${address.port}`);
      })
      .on("message", (message: Buffer, remote: dgram.BindOptions) => {
        const { port, address } = remote;
        const handler = new MessageHandler();
        const content = handler.getMessageContent(message);

        this.log.info(
          `received a message from ${address}:${port} -> "${content}"`
        );

        // send a message back to the client
        this.sendMessage(
          server,
          handler.buildMessage("your message was successfully received"),
          port,
          address
        );
      });
  }

  private sendMessage(
    server: dgram.Socket,
    data: MessageData,
    port?: number,
    address?: string
  ) {
    server.send(
      data.messageBuffer,
      0,
      data.messageBuffer.length,
      port,
      address,
      (err) => {
        if (err)
          this.log.error(
            "it wasn't possible to send a message back to the client:\n",
            err
          );
        this.log.info(`sent a message back to the client ${address}:${port}`);
      }
    );
  }
}
