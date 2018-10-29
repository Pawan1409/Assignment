var cat = [];
var sub_cat = [];
var max_fields = 10;

$(document).ready(function(){

    $("#category").hide();
    $("#sub-category").hide();
    $("#product").hide();

    $.ajax({
        type:"GET",
        url:'http://localhost:3000/categories',
        success:function(categories){
            console.log(categories);
            $.each(categories,function(i,category){
                cat.push(category);
                console.log(category);
                $("#dropcategories").append('<option id="${category.text} value="${category.text}">'+category.text+'</option>');
                $("#dropcategories1").append('<option id="${category.text} value="${category.text}">'+category.text+'</option>');
            })
        },
        error:function(){
            alert("error loading products")
        }
    })


    $.ajax({
        type:"GET",
        url:'http://localhost:3000/products',
        success:function(products){
            //console.log(products);
            $.each(products,function(i,product){
                console.log(product);
            })
        },
        error:function(){
            alert("error loading products")
        }
    })

    var iCnt = 0;

    $('#btAdd').click(function() {
            if (iCnt <= 19) {

                iCnt = iCnt + 1;

                // ADD TEXTBOX.
                $("#subcategory-form").append(`<div class="form-group"><label class="col-sm-2"></label><input type=text class="input" id="tb${iCnt}" placeholder="Enter Field ${iCnt}"/></div>`);

                // SHOW SUBMIT BUTTON IF ATLEAST "1" ELEMENT HAS BEEN CREATED.
                if (iCnt > 0) {
                    $('.submitBtn').show();
                }
            }
            // AFTER REACHING THE SPECIFIED LIMIT, DISABLE THE "ADD" BUTTON.
            // (20 IS THE LIMIT WE HAVE SET)
            else {
                $("#subcategory-form").append('<label>Reached the limit</label>');
                $('#btAdd').attr('class', 'bt-disable');
                $('#btAdd').attr('disabled', 'disabled');
            }
        });
    $('#btRemove').click(function() {
            if (iCnt != 0){
                $('#tb' + iCnt).remove();
                iCnt = iCnt - 1;
            }
            if(iCnt==0){
                $('.submitBtn').hide();
            }
            $('#btAdd').removeAttr('disabled') .attr('class', 'bt');

        });
})


function displaySub(){
    $("#dropsub-categories").empty();
    $("#dropsub-categories").append('<option value="-1">-- Select Sub-category --</option>')
    $("#dropsub-categories1").empty();
    $("#dropsub-categories1").append('<option value="-1">-- Select Sub-category --</option>')
    var cat_dropdown = document.getElementById("dropcategories");
    var cat_selected = cat_dropdown.options[cat_dropdown.selectedIndex].text;
    for(d of cat){
        if(d.text == cat_selected){
            for(e of d.children){
                sub_cat.push(e);
                $("#dropsub-categories").append('<option id="${e.text} value="${e.text}">'+e.text+'</option>');
            }
        }
    }
}

function displayFields(){
    $(".dynamic").remove();
    var cat_dropdown = document.getElementById("dropsub-categories1");
    var cat_selected = cat_dropdown.options[cat_dropdown.selectedIndex].text;
    for(d of sub_cat){
        if(d.text == cat_selected){
            for(e of d.fields){
                alert("Hello")
                $("#product-form").append(`
                    <div class="form-group dynamic">
                        <label class="control-label col-sm-2" for="${e.field}">${e.field}</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="${e.field}" name="${e.field}" placeholder="Enter ${e.field}">
                        </div>
                    </div>
                `)
            }
            $("#product-form").append(`
                <div class="form-group dynamic">
                    <div class="col-sm-offset-2 col-sm-4">
                        <button class="btn btn-default" id="add-product">Add Product</button>
                    </div>
                </div>
            `)
        }
    }
}

$("#product-form").submit(function(e){
//        e.preventDefault();
        var form = $(this);
        var data = form.serializeArray();

        $.ajax({
                    url: 'http://localhost:3000/products',
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(getFormData(data,"product")),
                    success: function(data){
                        console.log("DATA POSTED SUCCESSFULLY"+data);
                    },
                    error: function( jqXhr, textStatus, errorThrown ){
                        console.log( errorThrown );
                    }
        });
});

$("#category-form").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var data = form.serializeArray();

        $.ajax({
                    url: 'http://localhost:3000/categories',
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(getFormData(data,"category")),
                    success: function(data){
                        console.log("DATA POSTED SUCCESSFULLY"+data);
                    },
                    error: function( jqXhr, textStatus, errorThrown ){
                        console.log( errorThrown );
                    }
        });
});


$("#subcategory-form").submit(function(e){
    e.preventDefault();
    var form = $(this);
    var json;
    var data = form.serializeArray();
    var index;
    var fields = [];
    var sel = $("#dropcategories").val();
    for(i=0;i<cat.length;i++){
        if(sel==cat[i].text){
            index=i+1;
            console.log(index);
            console.log(i);
        }
    }
//    var d = JSON.stringify(getFormData(data,"sub-category"));
//    console.log(d);
        $.ajax({
                    url: 'http://localhost:3000/categories/'+index,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(getFormData(data,"sub-category")),
                    success: function(data){
                        console.log("DATA POSTED SUCCESSFULLY"+data);
                    },
                    error: function( jqXhr, textStatus, errorThrown ){
                        console.log( errorThrown );
                    }
        });
});


function getFormData(data,str) {
    var unindexed_array = data;
    var indexed_array = {};
    var json;

   $.map(unindexed_array, function(n, i) {
    indexed_array[n['name']] = n['value'];
   });


    if(str=="product"){
        indexed_array.image="/assets/dell.jpg"
        console.log(indexed_array)
    }

    if(str=="category"){
        indexed_array.children=[];
    }


    if(str=="sub-category"){
        var sel = $("#dropcategories").val();
        console.log(sel);
        var json;
        indexed_array.fields=[];
        $('.input').each(function() {
            var data = {field: this.value};
            console.log(data);
            indexed_array.fields.push(data);
        });
        indexed_array.href="#";
        console.log(indexed_array);
        for(e of cat){
            //console.log(e);
            if(e.text==sel){
                e.children.push(indexed_array);
                json=e;
            }
        }
        console.log(json);
        return json;
    }

   return indexed_array;
}

function showCatForm(){
    $("#category").show();
    $("#sub-category").hide();
    $("#product").hide();
}

function showSubcatForm(){
    $("#category").hide();
    $("#sub-category").show();
    $('.submitBtn').hide();
    $("#product").hide();
}

function showProdForm(){
    $("#category").hide();
    $("#sub-category").hide();
    $("#product").show();
}


function displaySub1(){
    $("#dropsub-categories1").empty();
    $("#dropsub-categories1").append('<option value="-1">-- Select Sub-category --</option>')
    var cat_dropdown = document.getElementById("dropcategories1");
    var cat_selected = cat_dropdown.options[cat_dropdown.selectedIndex].text;
    for(d of cat){
        if(d.text == cat_selected){
            for(e of d.children){
                sub_cat.push(e);
                $("#dropsub-categories1").append('<option id="${e.text} value="${e.text}">'+e.text+'</option>');
            }
        }
    }
}
