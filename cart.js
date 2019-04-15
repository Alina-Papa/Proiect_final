var products={};
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
    cart = await ajax("GET", "https://proiectfinal-c2ae1.firebaseio.com/cart.json");
    draw();
}
function draw() {
	let totalItems=0;
	let totalSum=0;
	var str = "";
	for (var i = 0; i < localStorage.length; i++) {
		let id=localStorage.key(i);
		let idDetails={};
		idDetails=JSON.parse(localStorage.getItem(localStorage.key(i)));
		let subTotal=idDetails.price * idDetails.qty;
		totalItems+=idDetails.qty;
		totalSum+=subTotal;
        str+=`
        	<tr>
				<td>${idDetails.name}</td>
				<td>${idDetails.price}RON</td>
				<td><input class="buy-btn" type="button" onclick="substractItem(${i});" value="-">
			 		<input id="quantity" type="number" min="1" max="60" value="${idDetails.qty}">
			 		<input class="buy-btn" onclick="addQty(${i});" type="button" value="+">
			 	</td>
			 	<td>${subTotal}RON</td>
			 </tr>
        `;
	}
		document.querySelector("table>tbody").innerHTML=str;
		document.getElementById("totalItems").innerHTML=`${totalItems} items to pay`;
		document.getElementById("total").innerHTML=`Total value: ${totalSum} Ron`;	
    }

getProducts();

function addQty(idx){
	let idDetails={};
		idDetails=JSON.parse(localStorage.getItem(localStorage.key(idx)));
		console.log(idDetails);
	
		let quantity=JSON.parse(localStorage.getItem(localStorage.key(idx))).qty;
		quantity++;
		idDetails.qty=quantity;
		idDetails.stock--;
		console.log(idDetails);
		let newObj=JSON.stringify(idDetails);
		localStorage.setItem(localStorage.key(idx), newObj);
		// document.getElementById('quantity').value=quantity;
		draw();	
}
// addQty();
function substractItem(idx){
	let idDetails={};
		idDetails=JSON.parse(localStorage.getItem(localStorage.key(idx)));
		console.log(idDetails);
	
		let quantity=JSON.parse(localStorage.getItem(localStorage.key(idx))).qty;
		quantity--;
		idDetails.qty=quantity;
		idDetails.stock++;
		console.log(idDetails);
		let newObj=JSON.stringify(idDetails);
		localStorage.setItem(localStorage.key(idx), newObj);
		// document.getElementById('quantity').value=quantity;
		draw();	
}
	


function emptyCart(){
	localStorage.clear();
	draw();
}

