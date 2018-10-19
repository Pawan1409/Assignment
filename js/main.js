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
    var itemIndex = $(this);
    var itemType=itemIndex.context.id;
    console.log(e);
    $("#filters").show();
    $("#products").show();
    document.getElementById("filters").innerHTML= itemType+" filters";
    document.getElementById("products").innerHTML= itemType+" products";
    $.getJSON("/assets/products.json",function(data){
        for(d of data){
            if(d.category==itemType){
                $("#products").append(`<div>
                    ${d.name}
                </div>`);
            }
        }
    })
    return false;
});

// When the user scrolls the page, execute Function
window.onscroll = function() {fixHeader()};

// Get the header
var header = document.getElementById("mainNavbar");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function fixHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    }
    else {
        header.classList.remove("sticky");
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

