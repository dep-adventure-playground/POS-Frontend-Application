/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import manageItems from './manage-items.component.html';
import style from './manage-items.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteItem, getAllItems, saveItem, updateItem } from '../service/item.service';
import { Item } from '../model/item';

$("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

$("#tbl-items tbody").on("click","tr .fas",async (event: Event)=>{
    let code = $(event.target as any).parents("tr").find("td:first-child").text();
    try{
        await deleteItem(code);
        alert("Item has been deleted successfully");
        loadAllItems();
    }catch(error){
        alert("Failed to delete the item");
    }
});

$("#tbl-items tbody").on("click","tr",(event: Event)=>{
    let code = $(event.target as any).parents("tr").find("td:first-child").text();
    let description = $(event.target as any).parents("tr").find("td:nth-child(2)").text();
    let unitPrice = $(event.target as any).parents("tr").find("td:nth-child(3)").text();
    let qtyOnHand = $(event.target as any).parents("tr").find("td:nth-child(4)").text();
    
    $("#txt-code").val(code);
    $("#txt-description").val(description);
    $("#txt-unitprice").val(parseFloat(unitPrice));
    $("#txt-qty").val(parseInt(qtyOnHand));
})

let dataTableItems:any =null;

function oldLoadAllItems(): void {

    getAllItems().then(function (items: Array<Item>) {
        for (const item of items) {

            $("#tbl-items tbody").append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.unitPrice}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
            `);

        }

        ($("#tbl-items") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
            
        });
    }).catch(() => {

    });


}

async function loadAllItems(): Promise<void> {

    let items = await getAllItems();

    if (dataTableItems) {
        ($("#tbl-items") as any).DataTable().destroy();
        $("#tbl-items tbody tr").remove();
    }


    for (const item of items) {

        $("#tbl-items tbody").append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
            `);

    }

    dataTableItems = ($("#tbl-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false
    });

    dataTableItems.page(Math.ceil(items.length / 5) - 1).draw(false);


}

loadAllItems();

$("#btn-save-item").click(async() => {
    let code = <string>$("#txt-code").val();
    let description = <string>$("#txt-description").val();
    let unitPrice = <number>$("#txt-unitprice").val();
    let qtyOnHand = <number>$("#txt-qty").val();

    /* Frontend Validation */
    if (!code.match(/^P\d{3}$/) || description.trim().length == 0 || !(unitPrice >0) || !(qtyOnHand >= 0)) {
        alert("Invalid item information");
        return;
    }

    let items=await getAllItems();
    let update: boolean = false;
    for (const item of items) {
        if(code == item.code){
            update=true;
        }
    }


    if(update){
        try {
            await updateItem(code,new Item(null as any, description, qtyOnHand, unitPrice));
            alert("Item Updated");
            loadAllItems();
        } catch (error) {
            alert("Failed to update the item")
        }

    }else{
        try {
            await saveItem(new Item(code, description, qtyOnHand, unitPrice));
            alert("Item Saved");
            loadAllItems();
        } catch (error) {
            alert("Failed to save the item")
        }
    }

    
});





