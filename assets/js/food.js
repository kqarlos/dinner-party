var mainIng = "";


$(document).ready(function () {

    $(".card").click(function () {

        //set main ingredient
        mainIng = $(this).attr("id");
        console.log("Main Ingredient: " + mainIng);

        //set spirit for cocktail based on main ingredient
        spirit = getSpirit(mainIng);
        console.log("Spirit: " + spirit);

        //clear #features div and create row to be populated
        $("#features").empty();

        $("#features").append('<h3 class="center-align">Select a dish from the list</h3>');

        var row = $("<div>");
        row.addClass("row justify-content-center");
        row.attr("id", "choices");
        $("#features").append(row);

        //Preparing query for food dishes based on mainIng
        var queryURL = "https://api.edamam.com/search?q=" + mainIng + "&app_id=a9502a10&app_key=38e9596cea1782797a3e09245c9370fb&from=0&to=100";
        console.log("FOOD list query: " + queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //Generate random numbers to use as indexes from query result
            var randomNo = [];
            for (var i = 0; i < 6; i++) {
                var random = Math.floor(Math.random() * 100);
                var genNumber = randomNo.indexOf(random);
                if (genNumber === -1) {
                    randomNo.push(random);
                }
                else {
                    i--;
                }
            }

            console.log("Random numbers: " + randomNo);

            //Get dishes using random number and get their information
            for (var i = 0; randomNo.length; i++) {
                var foodImg = response.hits[randomNo[i]].recipe.image;
                var foodName = response.hits[randomNo[i]].recipe.label;
                // var ingredients = response.hits[randomNo[i]].recipe.ingredientLines;
                var ingredients = "";

                renderFood(foodImg, foodName, ingredients, randomNo[i]);
            }


        });


    });
});

//Event listener to when a dish selection has been made
$(document).on("click", ".choices", function () {
    //Clear row
    $("#features").empty();

    $("#features").append('<h3 class="center-align">Enjoy your dinner party!</h3>');

    var row = $("<div>");
    row.addClass("row justify-content-center");
    row.attr("id", "choices");
    $("#features").append(row);

    //Dish number chosen from list
    var number = $(this).attr("data-number");

    // --------------------------------------ADD FOOD CARD---------------------
    var queryURL = "https://api.edamam.com/search?q=" + mainIng + "&app_id=a9502a10&app_key=38e9596cea1782797a3e09245c9370fb&from=0&to=100";
    console.log("Dish query: " + queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var foodImg = response.hits[number].recipe.image;
        var foodName = response.hits[number].recipe.label;
        var ingredients = response.hits[number].recipe.ingredientLines;

        renderFood(foodImg, foodName, ingredients, number);
    });

    //Call to cocktail.js to query and generate cocktail
    getDrinkID(getCocktail);
});

//Renders food card with given information
function renderFood(foodImg, foodName, ingredients, dishNumber) {
    //setting up column and cards to add to the row
    var column = $("<div>");
    column.addClass("col s12 m6");
    var card = $("<div>");
    card.addClass("choices card z-depth-4");

    //Create dish card
    card.attr("data-number", dishNumber);

    //set up image with title and button---------
    var cardImg = $("<div>");
    cardImg.addClass("card-image");
    var img = $("<img>");
    img.attr("src", foodImg);
    //setting up title
    var titleSpan = $("<span>");
    titleSpan.addClass("card-title");
    var title = $("<h3>");
    title.text(foodName);
    titleSpan.append(title);
    cardImg.append(img);
    cardImg.append(titleSpan);
    //setting up button only if dishes are choices => ingredients string is empty
    if (ingredients === "") {
        var aTag = $("<a>");
        aTag.addClass("btn-floating btn-large btn waves-effect waves-red  halfway-fab cyan pulse");
        var iTag = $("<i>");
        iTag.addClass("material-icons");
        iTag.text("add");
        aTag.append(iTag);
        // ----------------------------------------
        cardImg.append(aTag);
    }
    //done setting up image -------------------

    //setting up content-----------------------
    var content = $("<div>");
    content.addClass("card-content");

    var recipe = $("<p>");
    recipe.text(ingredients);
    content.append(recipe);

    //done setting up content / Append everythin to row

    card.append(cardImg);
    card.append(content);
    column.append(card);
    $("#choices").append(column);
}