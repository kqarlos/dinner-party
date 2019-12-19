# Dinner Party



## Summary 
Dinner Party is an application that helps users get dish and drink ideas for for a dinner party that they are putting together. After selecting your main ingredient category, Dinner Party generates 6 dish ideas for the user to select. 
After they select their main dish Dinner Party returns the perfect cocktail pairing along with its recipe and the recipe for the main dish. 



## Site Demo
<img src="https://media.giphy.com/media/LMR6hg0e0eTLVujUB8/giphy.gif"></img>

 
## Technologies Used
- Materialize CSS - Used to pull existing html and CSS for creating responsive organizational structer and styling for the site. In addtion, pulling from their JS library's built in scripts to utilize plugins for animations.
- jQuery - Used for event listeners of parent and childeren elements as well as to store and recall those varible in local      storage to be displayed dynamically in HTML on the page.
- momentjs - Used to pull current date for the current city.
- javascript - Used to dynamically change html and store user-input.
- HTML - Used to create elements on the DOM
- CSS - Styles html elements on page
- Git - Version control system to track changes to source code
- GitHub - Hosts repository that can be deployed to GitHub Pages
 


## Grid Layout Code Snippet
Using Materialize CSS our basic layout for the content we are displaying to user fits on cards, which sit within a column, which fits within a row. We leveraged materialize's predefined classes to style the UI in the way that we wanted and ensured resonivenss to different screensizes by specifying column widht on larg, medium, and small devices.


```html
<div class="row justify-content-center">
  <div class="col s12 m12">
    <div id="salmon" class="card hoverable z-depth-2">
      <div class="card-image">
        <img src="https://images.theconversation.com/files">
         <span class="card-title" ><h3>Salmon</h3></span>
           <a class="btn-floating btn-large btn waves-effect 
           waves-red  halfway-fab cyan pulse"><i
           class="material-icons">add</i></a></div>
            <div class="card-content">
            <p>I am a very simple card. I am good at containing small bits of information.</p>
         </div>
       </div>
     </div>
   </div>

```

## Mobile Responsivness
To ensure mobile responsivness we specify specific materialize CSS classes to changed column widths on smaller screens so our cards will stack creating a better user-experience.
```html
<div class="col s12 m6">	
<div id="salmon" class="card hoverable z-depth-2">
```
Wanting to remain consistent in the results we are generating based on user input we then define the larger column size on smaller screens in the divs we insert dynamically.
```js
var column = $("<div>");
column.addClass("col s12");
var column = $("<div>");
column.addClass("col s12");
```

![site](https://media.giphy.com/media/lqMd8zCm1ZpdnfS4sU/giphy.gif)

## API Call 
Querying the information from the The Cocktail DB was done in two steps . First we get the drink ID based on spirit. Second we are parsing out the cocktail informaton that we will need for that particular spirit. 
```js
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


```
Once we've gathered the information needed from our API call based on user input we empty our html container area and append the infromation sytled in the necessary classes.
```js
//render cocktail to html
function renderCocktail(drinkInfo) {

    //Creating column to append to #choices row
    var column = $("<div>");
    column.addClass("col s6 m6");

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

```


## Built With

* [EDEMAM API](https://developer.edamam.com/)
* [The Cocktail DB API](https://www.thecocktaildb.com/api.php)
* [Materialize CSS](http://archives.materializecss.com/0.100.2/about.html)
* [jQuery](https://api.jquery.com/)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Boostrap](https://getbootstrap.com/)

## Authors


**Kevin Ko** 
- [LinkedIn](#)
- [Link to Github]()

**Chris Melby**
- [LinkedIn](https://www.linkedin.com/in/chris-melby-71106b126/)
- [Link to Github](https://github.com/cmelby)

**Tai Le** 
- [LinkedIn](#)
- [Link to Github](#)

**Carlos Toledo** 
- [LinkedIn](#)
- [Link to Github](#)


Dinner Party Project
- [Link to Project](https://github.com/kokevin678/project1)
