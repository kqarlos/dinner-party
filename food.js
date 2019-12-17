$(document).ready(function () {

    $(".card").click(function () {
        var mainIng = $(this).attr("id");
        $("#features").empty();
        // $(".row").append(".newDiv");
        console.log(mainIng);
        var row = $("<div>");
        row.addClass("row justify-content-center");
        $("#features").append(row);

        var food = mainIng
        var queryURL = "https://api.edamam.com/search?q=" + food + "&app_id=a9502a10&app_key=38e9596cea1782797a3e09245c9370fb&from=0&to=100";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var randomNo = [];
            for (var i = 0; i < 6; i++) {
                var random = Math.floor(Math.random() * 100);
                var genNumber = randomNo.indexOf(random);
                if (genNumber === -1) {
                    randomNo.push(random);
                }
            }

            console.log(randomNo);

            for (var i = 0; randomNo.length; i++) {
                var foodImg = response.hits[randomNo[i]].recipe.image;
                var foodName = response.hits[randomNo[i]].recipe.label;
                var recipe = response.hits[randomNo[i]].recipe.ingredientLines;

                // var newDiv = $("<div class='row'>");

                // var container = $("<div class='col s6 m6'>");
                // var foodContainer = $("<div class='card z-depth-4'>");
                // var foodImgDiv = $("<div class='card-image'>");
                // var foodImgEl = $("<img>");
                // foodImgEl.attr("src", foodImg);
                // var foodNameEl = $("<span class='card-title black-text'>");
                // var recipeEl = $("<p class='recipe'>");


                // foodNameEl.text(foodName);
                // foodImgDiv.append(foodImgEl, foodNameEl);
                // foodContainer.append(foodImgDiv);

                // container.append(foodContainer);

                // var detailContainer = $("div class='col s3 card'>");




                // //this appens to test.html.
                // $(".newDiv").append(container);
                // $("#features").append(newDiv);


                //setting up row column and card
                // var row = $("<div>");
                // row.addClass("row justify-content-center");
                var column = $("<div>");
                column.addClass("col s6  ");
                var card = $("<div>");
                card.addClass("card z-depth-4");
                //set up image with title
                var cardImg = $("<div>");
                cardImg.addClass("card-image");
                var img = $("<img>");
                img.attr("src", foodImg);
                var titleSpan = $("<span>");
                titleSpan.addClass("card-title");
                var title = $("<h3>");
                title.text(foodName);
                titleSpan.append(title);
                cardImg.append(img);
                cardImg.append(titleSpan);
                //done setting up image 
                //setting up content
                var content = $("<div>");
                content.addClass("card-content");

                // var ingredientList = $("<ol>");
                // ingredientList.text("Ingredients");
                // for (var i = 1; i <= 15; i++) {
                //     var measure = eval("drinkInfo.strMeasure" + i);
                //     var name = eval("drinkInfo.strIngredient" + i);
                //     console.log(measure + " " + name);
                //     if (!measure)
                //         measure = "";
                //     if (name) {
                //         var ingredient = $("<li>");
                //         ingredient.text(measure + " " + name);
                //         ingredientList.append(ingredient);
                //     }
                // }
                // var ingredient = $("<li>");
                // ingredient.text(drinkInfo.strGlass);
                // ingredientList.append(ingredient);


                var recipe = $("<p>");
                // recipe.text("Recipe: " + recipe);
                recipe.text("");

                // content.append(ingredientList);
                content.append(recipe);
                //done setting up content
                card.append(cardImg);
                card.append(content);
                column.append(card);

                //------append column to row----
                $(row).append(column);
                // $("#features").append(row);

            }


        });


    });
});