import { resolve } from "../../../webpack.config";
import { Item } from "../model/item";

let items: Array<Item> = [];
// let items:Item[]=[];



export function getAllItems(): Promise<Array<Item>> {

    return new Promise((resolve, reject) => {



        let http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                console.log("Hoory, Awa awa, items awa");
                let dom = $(http.responseXML as any);
                dom.find("item").each((index, elem) => {
                    let code = $(elem).find("code").first().text();
                    let description = $(elem).find("description").text();
                    let qtyOnHand = $(elem).find("qty-on-hand").text();
                    let unitPrice = $(elem).find("unit-price").text();
                    items.push(new Item(code, description, +qtyOnHand, +unitPrice));
                });
                resolve(items);
            }

        }
        http.open('GET', 'http://localhost:8080/pos/items', true);
        http.send();

    });

}