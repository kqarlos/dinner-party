

// //add this line to the listener when they click a dish choice this will generate the drinks card
//------ getDrinkID(getCocktail);-----

var spirit;
var drinkID;

//sets spirit once a protein is chosen
// $("#features").on("click", ".card", function () {
    // console.log($(this)[0].id);
    // spirit = getSpirit($(this)[0].id);
    // console.log("Spirit: " + spirit);
    // $("#features").empty();
    // getDrinkID(getCocktail);
// });


//based on a given protein figure out a spirit that pairs
function getSpirit(protein) {
    console.log(protein);
    var spirit;
    if (protein === "beef")
        spirit = "bourbon";
    if (protein === "salmon")
        spirit = "vodka";
    if (protein === "tofu")
        spirit = "gin";
    if (protein === "lentils")
        spirit = "rum";
    if (protein === "shellfish")
        spirit = "rum";

    return spirit;
}

//get drinkId based on spirit and API. Unpon completion call callback function
function getDrinkID(callback) {
    console.log("Spirit queried: " + spirit);
    //building query to get a drink
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("getDrinkID query");
        console.log(queryURL);
        console.log(response);
        var randomDrink = Math.floor(Math.random() * response.drinks.length);
        // console.log("Random drink index:" + randomDrink);
        drinkID = response.drinks[randomDrink].idDrink;
        console.log("drinkID: " + drinkID);
        callback();
    });
}

//Given a drink ID get the cocktail information. Call to render cocktail pnce information is completely retireved
function getCocktail() {

    console.log("Random drink id queried: " + drinkID);

    //query building to lookup cocktail info

    // var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=san&francisco"
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;

    //execute query
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("getCocktail query");
        console.log(queryURL);
        console.log(response);

        var drinkInfo = response.drinks[0];

        renderCocktail(drinkInfo);
    });
}

//render cocktail to html
function renderCocktail(drinkInfo) {

    // //setting up row column and card
    // var row = $("<div>");
    // row.addClass("row justify-content-center");

    var column = $("<div>");
    column.addClass("col s6 m6");

    var card = $("<div>");
    card.addClass("card z-depth-4");


    //set up image with title
    var cardImg = $("<div>");
    cardImg.addClass("card-image");


    var img = $("<img>");
    img.attr("src", drinkInfo.strDrinkThumb);

    var titleSpan = $("<span>");
    titleSpan.addClass("card-title");

    var title = $("<h3>");
    title.text(drinkInfo.strDrink);

    titleSpan.append(title);
    cardImg.append(img);
    cardImg.append(titleSpan);
    //done setting up image 

    //setting up content
    var content = $("<div>");
    content.addClass("card-content");

    var ingredientList = $("<ol>");
    ingredientList.text("Ingredients");

    for (var i = 1; i <= 15; i++) {

        var measure = eval("drinkInfo.strMeasure" + i);
        var name = eval("drinkInfo.strIngredient" + i);
        console.log(measure + " " + name);

        if (!measure)
            measure = "";
        if (name) {
            var ingredient = $("<li>");
            ingredient.text(measure + " " + name);
            ingredientList.append(ingredient);
        }
    }

    var ingredient = $("<li>");
    ingredient.text(drinkInfo.strGlass);
    ingredientList.append(ingredient);

    var recipe = $("<p>");
    recipe.text("Recipe: " + drinkInfo.strInstructions);

    content.append(ingredientList);
    content.append(recipe);

    //done setting up content
    card.append(cardImg);
    card.append(content);

    column.append(card);

    //------append column to row----
    // $(row).append(column);



    $("#choices").append(column);
}
