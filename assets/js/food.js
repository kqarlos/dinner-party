var mainIng = "";


$(document).ready(function () {

    $(".protein").click(function () {

        //set main ingredient
        mainIng = $(this).attr("id");

        //set spirit for cocktail based on main ingredient
        spirit = getSpirit(mainIng);

        //clear #features div and create row to be populated
        $("#features").empty();
        $("#features").append('<h3 class="center-align">Select a dish from the list</h3>');
        let row = $("<div>");
        row.addClass("row justify-content-center");
        row.attr("id", "choices");
        $("#features").append(row);

        //Preparing query for food dishes based on mainIng
        let queryURL = "https://api.edamam.com/search?q=" + mainIng + "&app_id=a9502a10&app_key=38e9596cea1782797a3e09245c9370fb&from=0&to=100";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //Generate random numbers to use as indexes from query result. response.hits = response array
            let randomNo = [];
            for (let i = 0; i < 6; i++) {
                let random = Math.floor(Math.random() * response.hits.length);
                if (!randomNo.includes(random)) {
                    randomNo.push(random);
                }
                else {
                    i--;
                }
            }
            //Get dishes using random number and get their information
            for (let i = 0; randomNo.length; i++) {
                let dish = {
                    foodImg: response.hits[randomNo[i]].recipe.image,
                    foodName: response.hits[randomNo[i]].recipe.label,
                    ingredients: "",
                    dishNumber: randomNo[i]
                }
                renderDish(dish);
            }


        });


    });
});

//Event listener to when a dish selection has been made
$(document).on("click", ".choices", function () {
    //Clear row
    $("#features").empty();

    $("#features").append('<h3 class="center-align">Enjoy your dinner party!</h3>');

    let row = $("<div>");
    row.addClass("row justify-content-center");
    row.attr("id", "choices");
    $("#features").append(row);

    //Dish number chosen from list
    let dishNumber = $(this).attr("data-number");

    // --------------------------------------ADD FOOD CARD---------------------
    let queryURL = "https://api.edamam.com/search?q=" + mainIng + "&app_id=a9502a10&app_key=38e9596cea1782797a3e09245c9370fb&from=0&to=100";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let dish = {
            foodImg: response.hits[dishNumber].recipe.image,
            foodName: response.hits[dishNumber].recipe.label,
            ingredients: response.hits[dishNumber].recipe.ingredientLines,
            dishNumber: dishNumber
        }
        renderDish(dish);
    });

    //Call to cocktail.js to query and generate cocktail
    getDrinkID(getCocktail);
});

//Renders food card with given information
function renderDish(dish) {
    //setting up column and cards to add to the row
    let column = $("<div>");
    column.addClass("col s12 m6");
    let card = $("<div>");
    card.addClass("choices card z-depth-4");

    //Create dish card
    card.attr("data-number", dish.dishNumber);

    //set up image with title and button---------
    let cardImg = $("<div>");
    cardImg.addClass("card-image");
    let img = $("<img>");
    img.attr("src", dish.foodImg);
    //setting up title
    let titleSpan = $("<span>");
    titleSpan.addClass("card-title");
    let title = $("<h3>");
    title.text(dish.foodName);
    titleSpan.append(title);
    cardImg.append(img);
    cardImg.append(titleSpan);
    //setting up button only if dishes are choices => ingredients string is empty
    if (dish.ingredients === "") {
        let aTag = $("<a>");
        aTag.addClass("btn-floating btn-large btn waves-effect waves-red  halfway-fab cyan pulse");
        let iTag = $("<i>");
        iTag.addClass("material-icons");
        iTag.text("add");
        aTag.append(iTag);
        // ----------------------------------------
        cardImg.append(aTag);
    }
    //done setting up image -------------------

    //setting up content-----------------------
    let content = $("<div>");
    content.addClass("card-content");

    let recipe = $("<p>");
    recipe.text(dish.ingredients);
    content.append(recipe);

    //done setting up content / Append everythin to row
    card.append(cardImg);
    card.append(content);
    column.append(card);
    $("#choices").append(column);
}