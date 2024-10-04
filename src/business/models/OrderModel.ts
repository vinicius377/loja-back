import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";
import { Payments } from "../types/order/OrderPayments";
import { Status } from "../types/order/Status";

@Schema()
export class Product {
  nome: string;
  qtd: number
  preco: number
  produtoId: string
}

@Schema()
export class History {
  status: Status
  motivo: string;
  data: string
}

export type OrderDocument = HydratedDocument<Order>

const defaultHistory = () => [{
  status: Status.realizado,
  descricao: '',
  data: new Date().toISOString()
}]

@Schema()
export class Order {
  @Prop({ type: String })
  clienteId?: string

  @Prop({ type: [Product], required: true })
  produtos: Product[]

  @Prop({ type: Boolean, default: false })
  paraEntrega: boolean

  @Prop({ type: Number, default: 0 })
  acressimo: number

  @Prop({ type: Number, default: 0 })
  desconto: number

  @Prop({ enum: Object.values(Status), type: String, default: Status.realizado})
  status: Status

  @Prop({ type: [History], default: defaultHistory })
  historico: History[]

  @Prop({ type: Number, required: true,})
  total: number
 //enum: Object.values(Payments)
  @Prop({ required: true, type: String })
  pagamento: Payments

  @Prop({ required: true, type: String })
  lojaId: string

  @Prop({ type: String})
  createdAt: string

  @Prop({ type: String})
  updatedAt: string
}

export const OrderSchema = SchemaFactory.createForClass(Order)

OrderSchema.pre('save', function(next) {
  const date = new Date().toISOString();
  this.createdAt = date 
  this.updatedAt = date
  next()
})


