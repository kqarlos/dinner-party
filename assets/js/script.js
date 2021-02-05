
var savedEmails = [];
//Page load event listener for carousel.......................

$(document).ready(function () {
  $('.slider').slider();
});

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

  // savedEmails.push(email);
  // localStorage.setItem("Emails", savedEmails)


});


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


