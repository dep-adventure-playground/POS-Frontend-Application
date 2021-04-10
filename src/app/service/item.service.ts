import { resolve } from "../../../webpack.config";
import { Item } from "../model/item";

let items: Array<Item> = [];
// let items:Item[]=[];



export function getAllItems(): Promise<Array<Item>> {

    return new Promise((resolve, reject) => {

        let http = new XMLHttpRequest();

        
        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                resolve(items = JSON.parse(http.responseText));
            }

        }
        http.open('GET', 'http://localhost:8080/pos/items', true);
        http.send();

    });

}

export function saveItem(item:Item): Promise<void>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/pos/items",
            contentType: "application/json",
            data: JSON.stringify(item)
        }).then(()=>{
            items.push(item);
            resolve();
        }).fail(()=>{
            reject();
        })
    });
}

export function updateItem(code:string, item:Item): Promise<void>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method: "PUT",
            url: `http://localhost:8080/pos/items?code=${code}`,
            contentType: "application/json",
            data: JSON.stringify(item)
        }).then(()=>{
            let index=items.findIndex((elm)=>elm.code=code);
            items[index].description=item.description;
            items[index].unitPrice=item.unitPrice;
            items[index].qtyOnHand=item.qtyOnHand;
            resolve();
        }).fail(()=>{
            reject();
        })
    });
}

export function deleteItem(code: string): Promise<void>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/pos/items?code=${code}`
        }).then(()=>{
            items.splice(items.findIndex((elm)=>elm.code==code),1)
            resolve();
        }).fail(()=>{
            reject
        })
    });
}