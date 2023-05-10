// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

export class Message {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): Message {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsMessage(bb: flatbuffers.ByteBuffer, obj?: Message): Message {
    return (obj || new Message()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  static getSizePrefixedRootAsMessage(
    bb: flatbuffers.ByteBuffer,
    obj?: Message
  ): Message {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Message()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  content(): string | null;
  content(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  content(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset
      ? this.bb!.__string(this.bb_pos + offset, optionalEncoding)
      : null;
  }

  static startMessage(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addContent(
    builder: flatbuffers.Builder,
    contentOffset: flatbuffers.Offset
  ) {
    builder.addFieldOffset(0, contentOffset, 0);
  }

  static endMessage(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createMessage(
    builder: flatbuffers.Builder,
    contentOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    Message.startMessage(builder);
    Message.addContent(builder, contentOffset);
    return Message.endMessage(builder);
  }
}