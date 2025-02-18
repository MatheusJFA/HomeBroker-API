import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import crypto from "node:crypto";
import { WalletAsset, WalletAssetDocument } from "./wallet-asset.entity";

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: crypto.randomUUID() })
  _id: string;

  @Prop({
    type: [mongoose.Schema.Types.String],
    ref: WalletAsset.name,
    set: (v) => [...new Set(v)],
  })
  assets: WalletAssetDocument[] | string[];

  createdAt!: Date;
  updatedAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
