let product={};
let id = window.location.search.split('?')[1];
console.log(id);
// JSON.parse(localStorage.getItem(localStorage.key(i)))

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
        
async function getProduct() {
    product = await ajax("GET", `https://proiectfinal-c2ae1.firebaseio.com/products/${id}.json`);
    draw(id);
   
}

function draw(id) {
    let drawContainer = document.getElementById("theSelectedProduct");
    
    drawContainer.innerHTML = `
        <div class="product__photo">
            <div class="photo-container">
                <div class="photo-main">
                    <img src="`+ product.image +`" alt="the product you chose">
                </div>
           </div>
        </div>

        <div class="product_info">
            <div class="title">
                <h1>`+ product.name +`</h1>
            </div>
            <div class="price">
                RON <span>`+ product.price +`</span>
            </div>
            <hr/>
            <div class="stock">
                Stock:<span>`+ product.stock +`</span>
            </div>
            <div class="description">
            <div>`+ product.description +`
        </div>
            <button onclick=addToCart(name,product,1) class="buy-btn" id="myBtn" >Add to cart</button>        
            `; 
    document.getElementById("total").innerHTML=totalSum()+" Ron";

}
getProduct();
let cart=[];

function addToCart(){
    let name=product.name;
    let price=product.price;
    let qty=1;
    let stock=product.stock;
    var newEntry={
        name,
        price,
        qty,
        stock
    };

for (var i = 0; i < localStorage.length; i++) {
  let LSproduct=JSON.parse(localStorage.getItem(localStorage.key(i)));
  if(LSproduct.name===newEntry.name){
    newEntry.qty+=LSproduct.qty;
    if(LSproduct.stock<newEntry.qty){
      ui.showAlert(`No more stock available, you have:${LSproduct.stock} in cart`, 'error');
      newEntry.qty=LSproduct.stock;
    }else{
      ui.showAlert('Item added to cart', 'success');
    }
  }    
}
    cart.push(newEntry);
    let newProduct = localStorage.setItem(id, JSON.stringify(newEntry));  
    totalSum();
    document.getElementById("total").innerHTML=totalSum()+" Ron";
}

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

function UI() {}
const ui = new UI();
UI.prototype.showAlert = function(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.product');
  const selectedProd = document.getElementById('#theSelectedProduct');
  container.insertBefore(div, selectedProd);
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 2000);
}


var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  // slides[slideIndex-1].style.display = "block"; 
  // dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}