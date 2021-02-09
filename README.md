# Dinner Party 🌩️

</br>
<p align="center">
    <img src="https://img.shields.io/github/languages/count/kqarlos/dinner-party?style=for-the-badge" alt="Languages" />
    <img src="https://img.shields.io/github/languages/top/kqarlos/dinner-party?style=for-the-badge" alt="Top Language" />
    <img src="https://img.shields.io/github/languages/code-size/kqarlos/dinner-party?style=for-the-badge" alt="Code Size" />
    <img src="https://img.shields.io/github/repo-size/kqarlos/dinner-party?style=for-the-badge" alt="Repo Size" />   
    <img src="https://img.shields.io/tokei/lines/github/kqarlos/dinner-party?style=for-the-badge" alt="Total Lines" />   
    <img src="https://img.shields.io/github/last-commit/kqarlos/dinner-party?style=for-the-badge" alt="Last Commit" />  
    <img src="https://img.shields.io/github/issues/kqarlos/dinner-party?style=for-the-badge" alt="Issues" />  
    <img src="https://img.shields.io/github/followers/kqarlos?style=social" alt="Followers" />  
</p>


## Description
Dinner Party is an application that helps users get dish and drink ideas for for a dinner party that they are putting together. After selecting your main ingredient category, Dinner Party generates 6 dish ideas for the user to select. 
After they select their main dish Dinner Party returns the perfect cocktail pairing along with its recipe and the recipe for the main dish. 

## Table of Contents

* [Installation](#installation)
* [Usage](#demo)
* [Implementation](#implementation)
* [Credits](#credits)
* [License](#license)



## Installation

This application is compatible with the most commonly used web browsers.

<p align="center">
    <a href="https://kqarlos.github.io/dinner-party"><img src="https://img.shields.io/badge/-👉 See Live Site-success?style=for-the-badge"  alt="Live Site" /></a>
</p>


## Demo
![Site](./assets/images/demo1.gif)

## Implementation

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

![site](./assets/images/responsiveDemo.gif)

## API Call 
Querying the information from the The Cocktail DB was done in two steps . First we get the drink ID based on spirit. Second we are parsing out the cocktail informaton that we will need for that particular spirit. 
```js
//get drinkId based on spirit and API
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

## Credits 

### Authors

- 💼 Carlos Toledo: [portfolio](https://professional-portfolio2020.herokuapp.com/)
- :octocat: Github: [kqarlos](https://www.github.com/kqarlos)
- LinkedIn: [carlos-toledo415](https://www.linkedin.com/in/carlos-toledo415/)

<br />

- Chris Melby
- LinkedIn: [chris-melby-71106b126](https://www.linkedin.com/in/chris-melby-71106b126/)
- :octocat: Github: [cmelby](https://github.com/cmelby)

<br />

- Tai Le
- LinkedIn: [tu-tai-le-2a9646139](https://www.linkedin.com/in/tu-tai-le-2a9646139/)
- :octocat: Github: [TaiLe96](https://github.com/TaiLe96)

<br />

- Kevin Ko 


### Built With
    
<p align="center">
    <a href="https://developer.edamam.com/"><img src="https://img.shields.io/badge/-Moment.js-success?style=for-the-badge" alt="EDAMAM API" /></a>
    <a href="https://www.thecocktaildb.com/api.php"><img src="https://img.shields.io/badge/-Open Weather API-yellow?style=for-the-badge" alt="The Cocktail DB API" /></a>
    <a href="http://archives.materializecss.com/0.100.2/about.html"><img src="https://img.shields.io/badge/-Materialize CSS-success?style=for-the-badge" alt="Materialize CSS" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/-HTML-orange?style=for-the-badge"  alt="HMTL" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS-blue?style=for-the-badge" alt="CSS" /></a>
    <a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/-Javascript-yellow?style=for-the-badge" alt="Javascript" /></a>
    <a href="https://jquery.com/"><img src="https://img.shields.io/badge/-JQuery-blue?style=for-the-badge" alt="JQuery" /></a>
</p>
</br>

### Technologies Used
- Materialize CSS - Used to pull existing html and CSS for creating responsive organizational structer and styling for the site. In addtion, pulling from their JS library's built in scripts to utilize plugins for animations.
- jQuery - Used for event listeners of parent and childeren elements as well as to store and recall those varible in local      storage to be displayed dynamically in HTML on the page.
- momentjs - Used to pull current date for the current city.
- javascript - Used to dynamically change html and store user-input.
- HTML - Used to create elements on the DOM
- CSS - Styles html elements on page
- Git - Version control system to track changes to source code
- GitHub - Hosts repository that can be deployed to GitHub Pages


## License

<p align="center">
    <img align="center" src="https://img.shields.io/github/license/kqarlos/dinner-party?style=for-the-badge" alt="MIT license" />
</p>