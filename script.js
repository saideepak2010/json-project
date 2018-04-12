$(document).ready(function(){

});

$(function() {
    var json = {
        "people": {
            "product": [{
            	"id": "prod-1",
                "name": "Samsung Mobile",
                "price": 25000,
                "image": "images/1.jpg",
                "rating": 1,
                "categoryid": "cat3",
                "discount": 15,
            },
            {
                "id": "prod-2",
                "name": "Lenovo",
                "price": 40000,
                "image": "images/1.jpg",
                "rating": 1,
                "categoryid": "cat3",
                "discount": 0
            },
            {
                "id": "prod-3",
                "name": "Saree ",
                "price": 20000,
                "image": "images/1.jpg",
                "rating": 1,
                "categoryid": "cat2",
                "discount": 15
            },
            {
                "id": "prod-4",
                "name": "Nike",
                "price": 4000,
                "image": "images/1.jpg",
                "rating": 3,
                "categoryid": "cat1",
                "discount": 15
            }],
	        "category": 
	        	[{
	                	"cat1": "shoes",
	                	"cat2": "sarees",
	                	"cat3": "electrical"
	                }]
        }
    };
    $.each(json.people.person, function(i, v) {
        if (v.name.search(new RegExp(/peter/i)) != -1) {
            console.log(v.name);
            return;
        }
    });

    $.each(json.people.category, function(i, v) {
    	var getContent="";
    	for(getCategories in v){
    		var getContent="<li><a href=\"#\" data-target=\""+getCategories+"\">"+v[getCategories]+"</a></li>";
    		/*console.log(getCategories+":"+v[getCategories]);*/
    		$(".leftContainer ul").append(getContent);
    	}
    });
    $("#searchprod input").on("keyup",function(){
    	$(".centerContainer").html("<table class='table table-bordered'><thead><tr><th>Product Name</th><th>Product Price</th><th>Product Image</th><th>Discount</th><th>Ratings</th></tr></thead><tbody></tbody></table>");
    	var tableContent="<tr><td colspan='5'>No Products Found</td></tr>";
    	var getValue=$(this).val();
    	$.each(json.people.category, function(i, v) {
    		var getContent="";
    		for(getCategories in v){
    			if (v[getCategories].search(new RegExp(getValue)) != -1) {
    				$.each(json.people.product, function(i, v) {
    					if (v.categoryid==getCategories)
    					{
    						var tableContent="<tr><td><a href='#' data-target='bookdetail.html?prod="+v.id+"'>"+v.name+"</a></td><td>"+v.price+"</td><td>"+v.image+"</td><td>"+v.discount+"</td><td>"+v.rating+"</td></tr>";
    					}
    					$(".centerContainer tbody").append(tableContent);
    				});
    			}
    		}    		
	       /* if (v.name.search(new RegExp(/peter/i)) != -1) {
	            
	            return;
	        }*/
	    });
    });

    $(".leftContainer li").each(function(){
    	$(this).find("a").on("click",function(){
    		$(".centerContainer").html("<table class='table table-bordered'><thead><tr><th>Product Name</th><th>Product Price</th><th>Product Image</th><th>Discount</th><th>Ratings</th></tr></thead><tbody></tbody></table>");
    		var getAnchorURL=$(this).attr("data-target");
    		$.each(json.people.product, function(i, v) {
				if (v.categoryid==getAnchorURL)
				{
					var tableContent="<tr><td><a href='#' data-target='bookdetail.html?prod="+v.id+"'>"+v.name+"</a></td><td>"+v.price+"</td><td>"+v.image+"</td><td>"+v.discount+"</td><td>"+v.rating+"</td></tr>";
				}
				$(".centerContainer tbody").append(tableContent);
			});    		
    		return false;
    	});
    });


    $("body").on("click",".centerContainer td a",function(){
    	var url = $(this).attr("data-target");
    	$.ajax({
    		url: url,
    		success:function(returnResult){
    			$(".centerContainer").html(returnResult);
    			var getProduct=findParam(url,"prod");
    			$.each(json.people.product, function(i, v) {
			        if (v.id.search(new RegExp(getProduct)) != -1) {
    					$("#bookdetails .thumbnail img").attr("src",v.image);
    					$("#bookdetails .productname span").html(v.name);
    					$("#bookdetails .productprice span").html(v.price);
    					$("#bookdetails .productdiscount span").html(v.discount);
    					$("#bookdetails .productrating span").html(v.rating);
			        }
			    });
    		}
    	});
	    return false;
    });


    function findParam(url, param){
	  var check = "" + param;
	  if(url.search(check )>=0){
	      return url.substring(url.search(check )).split('&')[0].split('=')[1];
	  }
	}
	
});