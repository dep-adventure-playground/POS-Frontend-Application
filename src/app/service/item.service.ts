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