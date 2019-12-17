$(document).ready(function() {
    var newDiv = $("<div class='row'>");
    $(".card").click(function() {
        var mainIng = $(this).attr("id");
        $(".row").remove();
        $(".newDiv").append();
        console.log(mainIng);

    var food = mainIng    
    var queryURL = "https://api.edamam.com/search?q=" + food + "&app_id=a9502a10&app_key=38e9596cea1782797a3e09245c9370fb&from=0&to=100";
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var randomNo = [];
        for (var i = 0; i < 6; i++) {
            var random = Math.floor(Math.random() * 100);
            var genNumber = randomNo.indexOf(random);
            if (genNumber === -1) {
                randomNo.push(random);
            }}
    
            console.log(random);
            var foodImg = response.hits[random].recipe.image;
            var foodName = response.hits[random].recipe.label;
            var recipe = response.hits[random].recipe.ingredientLines;
    
    
            var container = $("<div class='col s4'>");
            var foodContainer = $("<div class='card'>");
            var foodImgDiv = $("<div class='card-image'>");
            var foodImgEl = $("<img>");
            foodImgEl.attr("src", foodImg);
            var foodNameEl = $("<span class='card-title black-text'>");
            var recipeEl = $("<p class='recipe'>");
    
    
            foodNameEl.text(foodName);
            foodImgDiv.append(foodImgEl, foodNameEl);
            foodContainer.append(foodImgDiv);
    
            container.append(foodContainer);
    
            var detailContainer = $("div class='col s3 card'>");
    
    
    
        
        //this appens to test.html.
        $(".newDiv").append(container);

    });


    });
});