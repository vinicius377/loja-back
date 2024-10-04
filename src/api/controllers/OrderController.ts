import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { User } from "src/utils/decorators/User";
import { ShopViewModel } from "../viewModels/ShopViewModel";
import { AuthRequired } from "src/utils/decorators/AuthDecorator";
import { Roles } from "src/utils/enums/Roles";
import { OrderApp } from "src/business/app/OrderApp";
import { CreateOrderDto } from "src/business/types/order/CreateOrderDto";
import { mapToCreateOrderViewModel, mapToOrderViewModel, OrderViewModel } from "../viewModels/OrderViewModel";
import { ChangeStatusDto } from "src/business/types/order/ChangeStatusDto";

@Controller('pedido')
export class OrderController {
  constructor(
    private readonly app: OrderApp
  ){}

  @AuthRequired([Roles.shop])
  @Post('loja')
  async createOrder(@Body() body: CreateOrderDto, @User() user: ShopViewModel) {
    return this.app.createOrder(body, user).then(mapToCreateOrderViewModel)
  }
  
  @AuthRequired([Roles.shop])
  @Get('loja/listarTodos')
  async listOrders(@User() user: ShopViewModel):Promise<OrderViewModel[]> {
    return this.app.listOrders(user).then(x => x.map(mapToOrderViewModel))
  }

  @AuthRequired([Roles.shop])
  @Get('loja/listarDeHoje')
  async listOrdersToday(@User() user: ShopViewModel):Promise<OrderViewModel[]> {
    return this.app.listOrdersToday(user.lojaId).then(x => x.map(mapToOrderViewModel))
  }

  @AuthRequired([Roles.shop])
  @Patch('loja/mudarStatus')
  async changeStatus(@User() user: ShopViewModel, @Body() body: ChangeStatusDto) {
    return this.app.changeStatus(user, body)
  }
}
