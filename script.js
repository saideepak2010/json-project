$(document).ready(function(){

});

$(function() {
    var json = {
        "people": {
            "product": [{
                "name": "Samsung Mobile",
                "price": 25000,
                "image": "images/1.jpg",
                "rating": 1,
                "categoryid": "cat3",
                "discount": 15,
            },
            {
                "name": "Lenovo",
                "price": 40000,
                "image": "images/1.jpg",
                "rating": 1,
                "categoryid": "cat3",
                "discount": 0
            },
            {
                "name": "Saree ",
                "price": 20000,
                "image": "images/1.jpg",
                "rating": 1,
                "categoryid": "cat2",
                "discount": 15
            },
            {
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
    	$(".centerContainer tbody").html("");
    	var tableContent="<tr><td colspan='5'>No Products Found</td></tr>";    					
    	var getValue=$(this).val();
    	$.each(json.people.category, function(i, v) {
    		var getContent="";
    		for(getCategories in v){
    			if (v[getCategories].search(new RegExp(getValue)) != -1) {
    				$.each(json.people.product, function(i, v) {
    					if (v.categoryid==getCategories)
    					{
    						var tableContent="<tr><td>"+v.name+"</td><td>"+v.price+"</td><td>"+v.image+"</td><td>"+v.discount+"</td><td>"+v.rating+"</td></tr>";
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
});