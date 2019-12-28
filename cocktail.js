var spirit;
var drinkID;

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
    //building query to get a drink
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("Drink query: " + queryURL);
        console.log(response);
        var randomDrink = Math.floor(Math.random() * response.drinks.length);
        drinkID = response.drinks[randomDrink].idDrink;
        console.log("drinkID: " + drinkID);
        callback();
    });
}

//Given a drink ID get the cocktail information. Call to render cocktail pnce information is completely retireved
function getCocktail() {

    //query building to lookup cocktail info
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("Get cocktail based ID query: " + queryURL);
        console.log(response);

        var drinkInfo = response.drinks[0];
        renderCocktail(drinkInfo);
    });
}

//render cocktail to html
function renderCocktail(drinkInfo) {

    //Creating column to append to #choices row
    var column = $("<div>");
    column.addClass("col s12 m6");

    //create card
    var card = $("<div>");
    card.addClass("card z-depth-4");
    //set up image with title
    var cardImg = $("<div>");
    cardImg.addClass("card-image");
    var img = $("<img>");
    img.attr("src", drinkInfo.strDrinkThumb);
    //set up title
    var titleSpan = $("<span>");
    titleSpan.addClass("card-title");
    var title = $("<h3>");
    title.text(drinkInfo.strDrink);
    titleSpan.append(title);
    cardImg.append(img);
    cardImg.append(titleSpan);
    //done setting up image  wit title

    //setting up content
    var content = $("<div>");
    content.addClass("card-content");

    //Recipe and ingredients ---------
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
    //done setting up content / append to card

    card.append(cardImg);
    card.append(content);
    column.append(card);
    $("#choices").append(column);
}
