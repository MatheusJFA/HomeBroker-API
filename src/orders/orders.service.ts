import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderStatus } from "./entities/order.entity";
import { Asset } from "src/assets/entities/asset.entity";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderSchema: Model<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderSchema.create({
      wallet: createOrderDto.walletId,
      asset: createOrderDto.assetId,
      shares: createOrderDto.shares,
      partial: createOrderDto.shares,
      type: createOrderDto.type,
      status: OrderStatus.PENDING,
    });
  }

  findAll(filter: { walletId: string }) {
    return this.orderSchema
      .find({ wallet: filter.walletId })
      .populate("asset") as Promise<(Order & { asset: Asset })[]>;
  }

  findOne(id: string) {
    return this.orderSchema.findById(id).populate("asset") as Promise<
      Order & { asset: Asset }
    >;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderSchema.findByIdAndUpdate(id, updateOrderDto);
  }

  remove(id: string) {
    return this.orderSchema.deleteOne({ id });
  }
}
