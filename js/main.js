var currentItems = [];
var cartItems = [];
var wishlistItems = [];
var displayModal = document.getElementById("displayItem");
var closeModal = document.getElementsByClassName("close")[0];
//var wishlistCount = document.getElementById("wishlistCount");
//var cartCount = document.getElementById("cartCount");
var wishlist=0;
var cart=0;

//when documents get loaded
$(document).ready(function(){
    $("#filters").hide();
    $("#products").hide();
    $("#cart").hide();
    $("wishlist").hide();
    var arrCategories;
    $.getJSON("/assets/data.json", function (data) {
        arrCategories = data;
        $('#mainMenu').renderizeMenu(arrCategories, { rootClass: "nav navbar-nav mr-auto", ulParentClass: "dropdown-menu", dropdownIcon: '<span class="caret"></span>' });
        jQuery.SmartMenus.Bootstrap.init();
    })
    //showSlides();
})


//Event handler for click event on Navigation Bar
$('#mainMenu').on('click','li', function(e,item) {
    $("#filters div").empty();
    $("#products div").empty();
    var itemIndex = $(this);
    var itemType=itemIndex.context.id;
    console.log(e);
//    $("#slideshow").hide();
    $("#filters").show();
    $("#products").show();
    $("#cart").hide();
    $("#wishlist").hide();
    $("#products").append(`
        <div class="row" id="productImage">
        </div>
    `)
//    document.getElementById("filters").appendChild= itemType+" filters";
//    document.getElementById("products").appendChild= itemType+" products";
    $.getJSON("/assets/products.json",function(data){
        for(d of data){
            if(d.category==itemType){
                currentItems.push(d);
                $("#productImage").append(`
                        <div class="column card">
                            <img src="${d.image}" alt="${d.name}" style="width:100%">
                            <center>
                                <p class="price">Rs. ${d.price}</p>
                                <p>${d.name}</p>
                                <p>
                                    <button onclick="addToCart(${d.id})">Add To Cart</button>
                                    <button onclick="addToWishlist(${d.id})">Add To Wishlist</button>
                                </p>
                                <p>
                                    <button onclick="itemDesc(${d.id})">Click here for description</button>
                                </p>
                            </center>
                        </div>
                `);
            }
        }
    })
    return false;
});


//function to update cart items count
function updateCartCount(){
    if(cart!=0){
        $('.cart').remove();
        $('#cartCount').append(`
            <span class="badge cart">${cart}</span>
        `)
    }
    else
        $('.cart').remove();
}


//function to update wishlist items count
function updateWishlistCount(){
    if(wishlist!=0){
        $('.wishlist').remove();
        $('#wishlistCount').append(`
        <span class="badge wishlist">${wishlist}</span>
    `)
    }
    else
        $('.wishlist').remove();
}


//function to add product in cart
function addToCart(itemId){
    console.log(itemId);
    for(d of currentItems){
        if(d.id == itemId){
            cartItems.push(d)
        }
    }
    cart++;
    console.log(cartItems);
    updateCartCount();
}

//function to add product in wishlist
function addToWishlist(itemId){
    console.log(itemId);
    for(d of currentItems){
        if(d.id == itemId){
            wishlistItems.push(d)
        }
    }
    console.log(wishlistItems);
    wishlist++;
    updateWishlistCount();
}

function itemDesc(itemId){
    $("#itemContent p").empty();
    var displayItem;
    for(d of currentItems){
        if(d.id == itemId){
            displayItem=d;
        }
    }
    $("#itemContent").append(`
        <div>
            <p>
                <img src="${displayItem.image}" alt="${displayItem.name}" width=50% style="float: right;">
                <h1>${displayItem.name}</h1>

            </p>
        </div>
    `)
    displayModal.style.display = "block";
}


closeModal.onclick = function() {
    displayModal.style.display = "none";
}


//function to display cart

function showCart(){
    $("#cart").empty();
//    $("#slideshow").hide();
    $("#filters").hide();
    $("#products").hide();
    $("#wishlist").hide();
    $("#cart").show();
    if(cartItems.length==0){
        $("#cart").append(`
            <p>Ooops! Your cart is empty...</p>
            <h4>Go and get some items in cart</h4>
            <button><a href="index.html">Go back to home</button>
        `)
    }
    else{
        for(d of cartItems){
        $("#cart").append(`
            <div class="col-lg-4">
                <img src="${d.image}" alt="${d.name}" style="width:100%">
                <center>
                    <p class="price">Rs. ${d.price}</p>
                    <p>${d.name}</p>
                    <p>
                        <button onclick="removeProductCart(${d.id})"><span class="glyphicon glyphicon-trash" ></span> Remove</button>
                    </p>
                </center>
            </div>
        `)
        }
    }
}

//function to show wishlist
function showWishlist(){
    console.log(wishlistItems)
//    $("#wishlist").empty();
    $("#slideshow").hide();
    $("#filters").hide();
    $("#products").hide();
    $("#cart").hide();
    $("#wishlist").show();
    if(wishlistItems.length==0){
        $("#wishlist").append(`
            <p>Ooops! Your wishlist is empty...</p>
            <h4>Go and get some items in wishlist</h4>
            <a href="index.html"><button>Go back to home</button></a>
        `)
    }
    else{
        for(d of wishlistItems){
        $("#wishlist").append(`
            <div class="col-lg-4">
                <img src="${d.image}" alt="${d.name}" style="width:100%">
                <center>
                    <p class="price">Rs. ${d.price}</p>
                    <p>${d.name}</p>
                    <p>
                        <button onclick="removeProductWishlist(${d.id})"><span class="glyphicon glyphicon-trash" ></span> Remove</button>
                    </p>
                </center>
            </div>
        `)
        }
    }
}



//function to remove product from cart
function removeProductCart(itemId){
    for(i=0;i<cartItems.length;i++){
        if(cartItems[i].id==itemId){
            cartItems.splice(i,1);
        }
    }
    cart--;
    console.log(cartItems);
    updateCartCount();
    showCart();
}

//function to remove product from wishlist
function removeProductWishlist(itemId){
    for(i=0;i<wishlistItems.length;i++){
        if(wishlistItems[i].id==itemId){
            wishlistItems.splice(i,1);
        }
    }
    wishlist--;
    console.log(wishlistItems);
    updateWishlistCount();
    showWishlist();
}

// When the user scrolls the page, execute Function
window.onscroll = function() {fixHeader()};

// Get the header
var header = document.getElementById("mainNavbar");
var content= document.getElementById("mainContent");
var filter= document.getElementById("filters");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function fixHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        content.classList.add("overlapping");
        filter.classList.add("filter");
    }
    else {
        header.classList.remove("sticky");
        content.classList.remove("overlapping");
        filter.classList.remove("filter");
    }
}

