var savedEmails = [];

$(document).ready(function () {
  //-------------------Set Up materialize elements-------------------------
  $('.slider').slider();
  //Page load event listener for carousel.......................
  //Slider methods controling each slider class..................
  // Pause slider
  $('.slider').slider('start');
  // Next slide
  $('.slider').slider('next');
  // Previous slide
  $('.slider').slider('prev');
  //Methods for tunring the fixed menu on and off................
  $('.fixed-action-btn').openFAB();
  $('.fixed-action-btn').closeFAB();
  $('.fixed-action-btn.toolbar').openToolbar();
  $('.fixed-action-btn.toolbar').closeToolbar();
  //Scroll fire function to prompt user to select their main ingredient...........
  Materialize.scrollFire(options);
  let options = [
    {
      selector: '#staggered-test', offset: 20, callback: function (el) {
        Materialize.showStaggeredList($(el));
      }
    },
    {
      selector: '#image-test', offset: 500, callback: function (el) {
        Materialize.fadeInImage($(el));
      }
    }
  ];
  Materialize.scrollFire(options);
  //Keep this at the Bottom. This initializes any built in materialize js that we set in place.............
  M.AutoInit();

});

function clearContent(message) {
  $("#mainContent").empty();
  $("#mainContent").append(`<h3 class="center-align">${message}</h3>`);
  let row = $("<div>");
  row.addClass("row justify-content-center");
  row.attr("id", "choices");
  $("#mainContent").append(row);
}

//Saves email information to local storage
$("#enter").on("click", function (e) {
  e.preventDefault();
  var email = $("#email").val().trim();
  email = email.split(" ").join("");
  if (localStorage.getItem("Emails")) {
    //If email in input is already on local storage then don't add it   
    savedEmails = JSON.parse(localStorage.getItem("Emails"));
    let index = -1;
    for (let i = 0; i < savedEmails.length; i++) {
      // id found
      if (savedEmails[i] === email) {
        index = i;
      }
    }
    //if index is -1 id was not found and we need to add to local storage 
    if (index === -1) {
      savedEmails.push(email);
    } else {
      savedEmails[index] = email;
    }
  } else {
    savedEmails.push(email);
  }
  //update savedEmails iten on local storage
  localStorage.setItem("Emails", JSON.stringify(savedEmails));
});

// When they click a protein
$(".protein").click(function () {

  //set main ingredient
  mainIng = $(this).attr("id");

  //set spirit for cocktail based on main ingredient
  spirit = getSpirit(mainIng);

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
    clearContent("Select a dish from the list")
    //Get dishes using random number and get their information
    for (let i = 0; randomNo.length; i++) {
      let dish = {
        foodImg: response.hits[randomNo[i]].recipe.image,
        foodName: response.hits[randomNo[i]].recipe.label,
        ingredients: "",
        dishNumber: randomNo[i]
      }
      //clear #mainContent div
      renderDish(dish);
    }
  });
});


//Event listener to when a dish selection has been made
$(document).on("click", ".choices", function () {

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
    clearContent("Enjoy your dinner party!");
    renderDish(dish);
    //Call to cocktail.js to query and generate cocktail
    getDrinkID().then((drinkId) => {
      getCocktail(drinkId).then((cocktail) => {
        renderCocktail(cocktail)
      });
    });
  });
});
