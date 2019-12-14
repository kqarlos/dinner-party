$(document).ready(function(){
    var search = "beef"
    var queryURL = "https://api.edamam.com/search?q=" + search + "&app_id=a9502a10&app_key=38e9596cea1782797a3e09245c9370fb&from=0&to=100";
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    console.log(response)
    
    var randomNo = [];
    for (var i = 0; i < 6; i++) {
        var random = Math.floor(Math.random() * 100);
        var genNumber = randomNo.indexOf(random);
        if (genNumber === -1) {
            randomNo.push(random);
        }

        console.log(random);
        var foodImg = response.hits[random].recipe.image;
        var foodName = response.hits[random].recipe.label;

        var container = $("<div class='col s4'>");
        var foodContainer = $("<div class='card'>");
        var foodImgDiv = $("<div class='card-image'>");
        var foodImgEl = $("<img>");
        foodImgEl.attr("src", foodImg);
        var foodNameEl = $("<span class='card-title black-text'>");


    foodNameEl.text(foodName);



    foodImgDiv.append(foodImgEl, foodNameEl);
    foodContainer.append(foodImgDiv);


    container.append(foodContainer);
    
    //this appens to test.html.
    $("#test").append(container);
    
    

    // var recipeEl = $("<p class='recipe'>");
    // var recipe = response.hits[i].recipe.ingredientLines;
        
    
    }
    });
});