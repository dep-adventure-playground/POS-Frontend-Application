import { Customer } from "../model/customer";

// let customers: Customer[]=[];
let customers: Array<Customer> = [];

export function getAllCustomers(): Promise<Array<Customer>> {
    // To do : retrieve the data from the backend and fill the customers array.

    return new Promise((resolve, reject) => {



        //(1) Initiate the xml request
        let http = new XMLHttpRequest();

        // (2) Setting up the call back function
        http.onreadystatechange = function () {
            
            if (http.readyState == 4) {
                // console.log("Hoory, Awa awa, customersla awa");
                // console.log(http.responseXML)  // console.log(http.responseXML)---->null
                // let dom = $(http.responseText);

                // console.log(http.responseText)
                customers=JSON.parse(http.responseText);
                resolve(customers);

                // let dom = $(<any>http.responseXML);
                // dom.find("customer").each((index, elm) => {
                //     let id = $(elm).find("id").text();
                //     let name = $(elm).find("name").text();
                //     let address = $(elm).find("address").text();
                //     customers.push(new Customer(id, name, address));
                // });
                // resolve(customers);

            }
        }

        //(3) Let's open the request
        http.open('GET', 'http://localhost:8080/pos/customers', true);

        //(4) If we have to set headers

        //(5) 
        http.send();

        // for(let i=0;i<50; i++){
        //     // new Customer('C'+i,'Kasun','Galle');
        //     customers.push(new Customer(`C${i}`,'Kasun','Galle'));
        // }

    });

}