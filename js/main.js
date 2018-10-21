var currentItems = [];
var cartItems = [];
var wishlistItems = [];
var displayModal = document.getElementById("displayItem");
var closeModal = document.getElementsByClassName("close")[0];


$(document).ready(function(){
    $("#filters").hide();
    $("#products").hide();

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
    $("#filters").show();
    $("#products").show();
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

function addToCart(itemId){
    console.log(itemId);
    for(d of currentItems){
        if(d.id == itemId){
            cartItems.push(d)
        }
    }
    console.log(cartItems);
}

function addToWishlist(itemId){
    console.log(itemId);
    for(d of currentItems){
        if(d.id == itemId){
            wishlistItems.push(d)
        }
    }
    console.log(wishlistItems);
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

////Slideshow
//var slideIndex=0;
//function showSlides() {
//    var i;
//    var slides = document.getElementsByClassName("mySlides");
//    for (i = 0; i < slides.length; i++) {
//        slides[i].style.display = "none";
//    }
//    slideIndex++;
//    if (slideIndex > slides.length) {slideIndex = 1}
//    slides[slideIndex-1].style.display = "block";
//    setTimeout(showSlides, 2000); // Change image every 2 seconds
//}

