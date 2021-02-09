var mainIng = "";

//Renders food card with given information
function renderDish(dish) {
    //setting up column and cards to add to the row
    let column = $("<div>");
    //Create dish card
    let card = $("<div>");
    card.addClass("card hoverable z-depth-4");
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
    titleSpan.append(title);
    cardImg.append(img);
    cardImg.append(titleSpan);

    let recipe = $("<p>");
    //If no ingredients, dish is part of a choice
    if (!dish.ingredients) {
        //Choices is 3x2 at l
        column.addClass("col s12 m6 l4");

        // Add choice class to attach to an event listener
        card.addClass("choices");
        // Add button
        let aTag = $("<a>");
        aTag.addClass("btn-floating btn-large btn waves-effect waves-red  halfway-fab cyan pulse");
        let iTag = $("<i>");
        iTag.addClass("material-icons");
        iTag.text("add");
        aTag.append(iTag);
        cardImg.append(aTag);
        // Title goes in content 
        recipe.text(dish.foodName);
    } else {
        // If dish is not a choice is final result title goes in header and ingredients go in content
        column.addClass("col s12 m6 l6");
        title.text(dish.foodName);
        recipe.text(dish.ingredients);
    }

    //setting up content-----------------------
    let content = $("<div>");
    content.addClass("card-content");
    content.append(recipe);

    //done setting up content / Append everythin to row
    card.append(cardImg);
    card.append(content);
    column.append(card);
    $("#choices").append(column);
}