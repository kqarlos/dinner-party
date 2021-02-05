var spirit;
var drinkID;

//based on a given protein figure out a spirit that pairs
function getSpirit(protein) {
    let spirit;
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
    let queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let randomDrink = Math.floor(Math.random() * response.drinks.length);
        drinkID = response.drinks[randomDrink].idDrink;
        callback();
    });
}

//Given a drink ID get the cocktail information. Call to render cocktail pnce information is completely retireved
function getCocktail() {

    //query building to lookup cocktail info
    let queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let drinkInfo = response.drinks[0];
        renderCocktail(drinkInfo);
    });
}

//render cocktail to html
function renderCocktail(drinkInfo) {

    //Creating column to append to #choices row
    let column = $("<div>");
    column.addClass("col s12 m6");

    //create card
    let card = $("<div>");
    card.addClass("card z-depth-4");
    //set up image with title
    let cardImg = $("<div>");
    cardImg.addClass("card-image");
    let img = $("<img>");
    img.attr("src", drinkInfo.strDrinkThumb);
    //set up title
    let titleSpan = $("<span>");
    titleSpan.addClass("card-title");
    let title = $("<h3>");
    title.text(drinkInfo.strDrink);
    titleSpan.append(title);
    cardImg.append(img);
    cardImg.append(titleSpan);
    //done setting up image  wit title

    //setting up content
    let content = $("<div>");
    content.addClass("card-content");

    //Recipe and ingredients ---------
    let ingredientList = $("<ol>");
    ingredientList.text("Ingredients");

    for (let i = 1; i <= 15; i++) {

        let measure = eval("drinkInfo.strMeasure" + i);
        let name = eval("drinkInfo.strIngredient" + i);

        if (!measure)
            measure = "";
        if (name) {
            let ingredient = $("<li>");
            ingredient.text(measure + " " + name);
            ingredientList.append(ingredient);
        }
    }

    let ingredient = $("<li>");
    ingredient.text(drinkInfo.strGlass);
    ingredientList.append(ingredient);
    let recipe = $("<p>");
    recipe.text("Recipe: " + drinkInfo.strInstructions);

    content.append(ingredientList);
    content.append(recipe);
    //done setting up content / append to card

    card.append(cardImg);
    card.append(content);
    column.append(card);
    $("#choices").append(column);
}
