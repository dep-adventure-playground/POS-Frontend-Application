import { Order } from "../model/order";

let orders: Array<Order> = [];

export function placeOrder(order: Order): Promise<void>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/pos/orders",
            contentType: "application/json",
            data: JSON.stringify(order)
        }).then(()=>{
            orders.push(order);
            resolve();
        }).fail(()=>{
            reject();
        })
    })
}


