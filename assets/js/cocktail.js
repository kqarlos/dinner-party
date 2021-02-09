var spirit;
// var drinkID;

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

//get drinkId based on spirit and API.
function getDrinkID() {
    return new Promise((resolve, reject) => {
        //building query to get a drink
        let queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let randomDrink = Math.floor(Math.random() * response.drinks.length);
            drinkID = response.drinks[randomDrink].idDrink;
            resolve(drinkID);
        });

    });

}

//Given a drink ID get the cocktail information.
function getCocktail(drinkID) {
    return new Promise((resolve, reject) => {
        //query building to lookup cocktail info
        let queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let drinkInfo = response.drinks[0];
            resolve(drinkInfo);
        });
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
    let ingredientH = $("<h4>");
    ingredientH.text("Ingredients:");
    content.append(ingredientH);

    let ingredient = $("<p>");
    ingredient.text(`${1}. ${drinkInfo.strGlass}`);
    content.append(ingredient);

    for (let i = 1; i <= 15; i++) {

        let measure = eval("drinkInfo.strMeasure" + i);
        let name = eval("drinkInfo.strIngredient" + i);

        if (!measure)
            measure = "";
        if (name) {
            let ingredient = $("<p>");
            ingredient.text(`${i + 1}. ${measure} ${name}`);
            content.append(ingredient);
        }
    }

    let recipeH = $("<h4>");
    recipeH.text("Recipe:");
    let recipe = $("<p>");
    recipe.text(drinkInfo.strInstructions);

    content.append(recipeH);
    content.append(recipe);


    //done setting up content / append to card

    card.append(cardImg);
    card.append(content);
    column.append(card);
    $("#choices").append(column);
}
