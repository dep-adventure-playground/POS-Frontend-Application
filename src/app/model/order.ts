import { OrderDetail } from "./order-detail";

export class Order {
    constructor(public orderId: string, public orderDate: string, public customerId: string, public orderDetails:Array<OrderDetail>) { }
}