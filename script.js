$(document).ready(function(){
    var search = "beef"
    var queryURL = "https://api.edamam.com/search?q=" + search + "&app_id=a9502a10&app_key=38e9596cea1782797a3e09245c9370fb&from=0&to=5";
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    console.log(response)
    
    for (var i = 0; i < 20; i++) {
        var foodImg = response.hits[i].recipe.image;
        var foodSelection = response.hits[i].recipe.label;
        var recipe = response.hits[i].recipe.ingredientLines;


    // }




    console.log(foodImg);

    var foodContainer = $("<div class='food'>");
    var foodImgEl = $("<img>");
    foodImgEl.attr("src", foodImg);
    // foodImgEl.attr("href", foodImg);
    var foodSelectionEl = $("<p class='selection'>");
    // var recipeEl = $("<p class='recipe'>");






    // foodImgEl.text(foodImg);
    foodSelectionEl.text(foodSelection);





    // foodContainer.append(foodEl);
    foodContainer.append(foodImgEl);
    foodContainer.append(foodSelectionEl);


    
        //this appends to front end HTML page
        // $("#display-articles").append(articleContainer);
    
        //this appens to test.html.
        $("#test").append(foodContainer);
    
    
        
    
    }
    });
    });