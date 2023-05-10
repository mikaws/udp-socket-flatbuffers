import * as flatbuffers from "flatbuffers";
import { Message } from "./flatbuffer/server-space/message";

export class MessageHandler {
  public buildMessage(content: string) {
    const builder = new flatbuffers.Builder();
    const messageOffset = builder.createString(content);
    const message = Message.createMessage(builder, messageOffset);
    builder.finish(message);
    const messageBuffer = builder.asUint8Array();
    return { builder, messageOffset, message, messageBuffer };
  }

  public getMessageContent(message: Buffer) {
    const msg = Message.getRootAsMessage(new flatbuffers.ByteBuffer(message));
    const msgContent = msg.content();
    return msgContent;
  }
}
