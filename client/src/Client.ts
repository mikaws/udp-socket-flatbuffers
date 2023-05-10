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

export class Client {
  private PORT = 12345;
  private SERVER_PORT = 41234;
  private log = Log4js.getLogger("client");

  public start() {
    const client = dgram.createSocket("udp4");
    client.bind(this.PORT, () => {
      client.setBroadcast(true);
    });

    this.handle(client);
    return client;
  }

  private handle(client: dgram.Socket) {
    const handler = new MessageHandler();

    client
      .on("listening", () => {
        const address: AddressInfo = client.address();
        this.log.info(`client listening on ${address.address}:${address.port}`);

        // send a message to the server when client is initialized
        this.sendMessage(
          client,
          handler.buildMessage("hello world")
        );
      })
      .on("message", (message: Buffer, remote: dgram.BindOptions) => {
        const { port, address } = remote;
        const handler = new MessageHandler();
        const content = handler.getMessageContent(message);

        this.log.info(
          `received a message from the server ${address}:${port} -> "${content}"`
        );
      });
  }

  private sendMessage(client: dgram.Socket, data: MessageData) {
    client.send(
      data.messageBuffer,
      0,
      data.messageBuffer.length,
      this.SERVER_PORT,
      "server",
      (err) => {
        if (err)
          this.log.error(
            "it wasn't possible to send a message back to the client:\n",
            err
          );
        this.log.info(
          `sent a message to the server on port ${this.SERVER_PORT}`
        );
      }
    );
  }
}
