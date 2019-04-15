var products={};
let idxEdit = null;

// let idx =window.location.search.split('?')[1];
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
async function getProductAdmin() {
    products = await ajax("GET", "https://proiectfinal-c2ae1.firebaseio.com/products.json");
    drawDetalii();       
}

function drawDetalii() {
    var str2 = "";
   for (let i in products) {
            if (!products.hasOwnProperty(i)) {
                continue;
            }
            if (products[i] === null) {
                continue;
            }
        str2 +=`
            <tr>
                <td onclick="edit${i};">${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].stock}</td>
                <td onclick="del('${i}')">Remove</td>
                <td onclick="edit('${i}')">Edit</td>
                </td>
            </tr>`;
    }
    document.getElementById("detaliiProdus").innerHTML = str2;
    showTable();
}
// getProductAdmin();

function showTable() {
    document.querySelector('[type="submit"]').value = "Add";
    document.querySelector("form").style.display = "none";
    document.querySelector("table").style.display = "";
}

async function del(idx) {
    if (confirm(`are you sure you want to delete ${products[idx].name}?`)) {
        await ajax("DELETE", `https://proiectfinal-c2ae1.firebaseio.com/products/${idx}/.json`);
        await getProductAdmin();
    }
}

function showAddForm() {
    document.querySelector("form").reset();
    document.querySelector("form").style.display = "";
    document.querySelector("table").style.display = "none";
}

async function add(el) {
    const elem = {};
 
    elem.name = document.querySelector('[name="name"]').value;
    elem.image = document.querySelector('[name="image"]').value;
    elem.description = document.querySelector('[name="description"]').value;
    elem.stock = document.querySelector('[name="stock"]').value;
    elem.price = document.querySelector('[name="price"]').value;
    if (idxEdit === null) {
        //getLista si ,function(){getLista();}); inseamna cam acelasi lucru
        await ajax("POST", `https://proiectfinal-c2ae1.firebaseio.com/products.json`, JSON.stringify(elem));
        await getProductAdmin();
    } else {
        await ajax("PUT", `https://proiectfinal-c2ae1.firebaseio.com/products/${idxEdit}.json`, JSON.stringify(elem));
        await getProductAdmin();
        idxEdit = null;
        document.querySelector('[type="submit"]').value = "Upload product";
    }
}

function edit(idx) {
    showAddForm();
    idxEdit=idx;
    const el = products[idx];
    document.querySelector('[type="submit"]').value = "Edit";
    document.querySelector('[name="name"]').value = el.name;
    document.querySelector('[name="description"]').value = el.description;
    document.querySelector('[name="price"]').value = el.price;
    document.querySelector('[name="stock"]').value = el.stock;
}