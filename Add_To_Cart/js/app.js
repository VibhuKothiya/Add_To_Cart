// **************Home Page Letest Top 4 Products Display**************

const topProducts = products.sort((a, b) => b.rating - a.rating).slice(0, 4); // Display top 4 products

// Get the container element on the home page
const topProductsContainer = document.querySelector('.listProduct');

// Create and append HTML elements for each top product

const letestDisplay = () =>{
    topProducts.map((val, ind) =>{
        console.log(val.product_name);
        topProductsContainer.innerHTML +=
        `
        <div class="item">
            <div class="img-box">
            <img src="${val.imgSrc}" alt="${val.product_name}">
            </div>
            <div class="desc">
            <h2>${val.product_name}</h2>
            <div class="price"><span class="a-price-symbol">₹</span>${val.price}</div>
            <button class="addCart" onclick="addToCart(${val.id})">Add To Cart</button>
            </div>
        </div>       
    `
    });
}
letestDisplay();

// **************Product Page Display & Add To Cart**************

//Select element
const productEle = document.querySelector('.listProduct');
const cartEle = document.querySelector('.cart-items');
let iconCart = document.querySelector('.nav-cart');
let iconCartSpan = document.querySelector('.nav-cart span');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
const subTotal = document.querySelector('.subtotal');

//Click on Cart icon, Display Cart Items

iconCart.addEventListener('click', () =>{
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () =>{
    body.classList.toggle('showCart');
});


//Render products on page

const randerProducts = () =>{
    products.map((val, ind) =>{
        productEle.innerHTML +=
        ` <div class="item">
            <div class="img-box">
            <img src="${val.imgSrc}" alt="${val.product_name}">
            </div>
            <div class="desc">
            <h2>${val.product_name}</h2>
            <div class="price"><span class="a-price-symbol">₹</span>${val.price}</div>
            <button class="addCart" onclick="addToCart(${val.id})">Add To Cart</button>
            </div>
        </div>        
    `
    });

    //All Products Stored in Local Storage

    const productstring = JSON.stringify(products);
    localStorage.setItem("products", productstring);

    const storedString = localStorage.getItem("products");
    const retrive = JSON.parse(storedString)

    console.log(retrive);

}
randerProducts();

// ******************Add to cart******************

let cart = JSON.parse(localStorage.getItem("CART")) || [];

const addToCart = (id) =>{
    //check product already exist in cart
    if(cart.some((item) => item.id === id)){
        changeUnitNum('plus', id);
    }
    else{
        const item = products.find((products) => products.id === id);
        cart.push(item);
        console.log(cart);
    }

    updateCart();
    
}

const updateCart = ()=>{
    randerCartitem();
    randersubtotal();
    
    localStorage.setItem("CART", JSON.stringify(cart));
}
// localStorage.clear();

const randerCartitem = () =>{
    cartEle.innerHTML = "";                     //clear cart element
    cart.map((item, ind) =>{   
    cartEle.innerHTML += `
    <div class="cart-item">
            <div class="item-info" onclick="remove(${item.id})">
                <img src="${item.imgSrc}" alt="${item.product_name}">
                <h4>${item.product_name}</h4>
            </div>
            <div class="unit-price">
                <small><span class="a-price-symbol">₹</span></small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeUnitNum('minus', ${item.id})">-</div>
                <div class="number">${item.productNumber}</div>
                <div class="btn plus" onclick="changeUnitNum('plus', ${item.id})">+</div>           
            </div>
        </div>`
    }); 
};

//Edit quntity of products

const changeUnitNum = (action, id) =>{
    
     cart = cart.map((item)=>{
        
        let productNumber = item.productNumber;
        if(item.id === id){
        
        if(action === 'minus' && productNumber > 1){
            productNumber--;
        }
        else if(action === 'plus' && productNumber < 15){
            productNumber++;
        }
        
    }
     return {
        ...item,
        productNumber,
     };       
    });
    updateCart();
}

//Subtotal Display

const randersubtotal = () => {

    let totalPrice = 0, totalItem = 0;
    cart.map((item) =>{
        totalPrice += item.price * item.productNumber;
        totalItem += item.productNumber;
    });
    
        iconCartSpan.innerText = totalItem; 

        subTotal.innerHTML = `
        Subtotal <br>(${totalItem} items): <br><span class="a-price-symbol">₹</span>${totalPrice.toFixed(2)}`     
     
};

//Click on Cart's products, items will be deleted from cart

const remove = (id) => {
   cart = cart.filter((item) => item.id !== id);
   updateCart();      
        
}



