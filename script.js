var products={};
var indexEdit=null;
async function ajax(method, url, body) {
    
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(new Error("serverul a dat eroare"));
                }
            }
        };
        xhttp.open(method, url, true);
        xhttp.send(body);
    });
}
async function getProducts() {
    products = await ajax("GET", "https://proiectfinal-c2ae1.firebaseio.com/products.json"); 
    draw();
    totalSum();
}

function draw() {
    var str = "";
    for (var i in products) {
        if (!products.hasOwnProperty(i)) {
            continue;
        }
        if (products[i] === null) {
            continue;
        }
       	str += `
        <div class="box "><a href="details.html?${i}"><img class="details" src="${products[i].image}"></a></div>
		`;
    }
    document.getElementById("grid-wrapper").innerHTML = str;
    document.getElementById("total").innerHTML=totalSum()+" Ron";
    
}
getProducts();

function totalSum(){
    let sumProduct=0;
    let sumAllProducts=0;

    for(var i=0; i < localStorage.length;i++){
        let product=JSON.parse(localStorage.getItem(localStorage.key(i)));
        sumProduct+=product.qty * product.price;
    }
    return sumProduct;
    sumAllProducts+=sumProduct;
       
}