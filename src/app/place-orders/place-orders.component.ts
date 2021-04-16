/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-03-19
 **/

import { Customer } from '../model/customer';
import { Item } from '../model/item';
import { getAllCustomers } from '../service/customer.service';
import { getAllItems } from '../service/item.service';
import placeOrders from './place-orders.component.html';
import style from './place-orders.component.scss';

import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { placeOrder } from '../service/order.service';
import { Order } from '../model/order';
import { OrderDetail } from '../model/order-detail';

let dataTable: any = null;
let totalCost: number = 0;

$("app-place-orders").replaceWith('<div id="place-orders">' + placeOrders + '</div>');
var html = '<style>' + style + '</style>';
$("#place-orders").append(html);

// $("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
// var html = '<style>' + style + '</style>';
// $("#dashboard").append(html);

export async function loadAllCustomersToOrders() {

    $("#customer_id").empty();

    let customers = await getAllCustomers();

    $("#customer_id").append(`
        <option selected>Customer Id</option>
    `);

    for (const customer of customers) {

        $("#customer_id").append(`
            <option>${customer.id}</option>
        `);

        // $(".deleteIcon").click(() => {
        //     alert("Hi");
        // });

    }
}

loadAllCustomersToOrders();

export async function loadAllItemsToOrders() {

    $("#item_code").empty();

    let items = await getAllItems();

    $("#item_code").append(`
        <option selected>Item Code</option>
    `);

    for (const item of items) {

        $("#item_code").append(`
            <option >${item.code}</option>
        `);

    }
}

loadAllItemsToOrders();


$($("select")[1]).on("click", async (event: Event) => {
    let customers = await getAllCustomers();

    let id = $("#customer_id option:selected").text();
    let index = customers.findIndex((elm) => elm.id == id);
    let name = customers[index].name;
    let address = customers[index].address;

    $("#customer_name").val(name);
    $("#customer_address").val(address);
});



$("select").last().on("click", async (event: Event) => {
    let items = await getAllItems();

    let code = $("#item_code option:selected").text();
    let index = items.findIndex((elm) => elm.code == code);
    let description = items[index].description;
    let qtyOnHand = items[index].qtyOnHand;
    let unitPrice = items[index].unitPrice.toFixed(2);

    $("#description").val(description);
    $("#qtyOnHand").val(qtyOnHand);
    $("#unitPrice").val(unitPrice);
});

$("#btn-addToCart").click(() => {
    let qty: number = $("#qty").val() as number;
    let id = $("#item_code option:selected").text();
    let description = $("#description").val();
    let qtyOnHand = $("#qtyOnHand").val();
    let unitPrice: number = $("#unitPrice").val() as number;
    let cost = qty * unitPrice;
    totalCost += cost;


    $("#tbl-orders tbody").append(`
        <tr>
            <td scope="row">${id}</td>
            <td>${description}</td>
            <td>${qtyOnHand}</td>
            <td>${unitPrice}</td>
            <td>${cost}</td>
            <td><button class="btn btn-outline-light btn-sm" type="button">Delete</button></td>
        <tr>
    `);

    // dataTable=($("#tbl-orders") as any).DataTable({
    //     "info": false,
    //     "searching": false,
    //     "lengthChange": false,
    //     "pageLength": 5,
    // });

    $("#tbl-orders tfoot").hide();

    $("#total-cost").text(`Total Cost : Rs. ${totalCost}/=`);

});

$("#btn-order").click(async() => {

    let orderId: string = $("#txt-orderId").val() as string;
    let orderDate = new Date().toISOString().split("T")[0];
    let customerId = $("#customer_id option:selected").text();
    let orderDetails = new Array<OrderDetail>();

    let noOfRows = $("#tbl-orders tbody tr").length;
    var i;
    for (i = 1; i < noOfRows; i += 2) {
        let itemCode = $(`#tbl-orders tbody tr:nth-child(${i}):even`).find(`td:nth-child(1)`).text();
        let qty = parseInt($(`#tbl-orders tbody tr:nth-child(${i}):even`).find(`td:nth-child(3)`).text());
        let unitPrice = parseFloat($(`#tbl-orders tbody tr:nth-child(${i}):even`).find(`td:nth-child(4)`).text());
        orderDetails.push(new OrderDetail(orderId, itemCode, qty, unitPrice))
    }

    // console.log(new Order(orderId, orderDate, customerId, orderDetails));
    
    try {
        await placeOrder(new Order(orderId, orderDate, customerId, orderDetails));
        alert("Order is sucessfully placed");
        // loadAllItemsToOrders()
    }catch(error){
        alert("Failed to place the order");
    }

    $("#tbl-orders tbody").empty();
    $("#tbl-orders tfoot").show();
    totalCost = 0;
    $("#total-cost").text(`Total Cost : Rs. ${totalCost}/=`);
    $('[name=customer-id]').val("");

})