

//Page load event listener for carousel.......................

$(document).ready(function(){
  $('.slider').slider();
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
var options = [
  {selector: '#staggered-test', offset: 20, callback: function(el) {
    Materialize.showStaggeredList($(el));
  } },
  {selector: '#image-test', offset: 500, callback: function(el) {
    Materialize.fadeInImage($(el));
  } }
];
Materialize.scrollFire(options);





  //Keep this at the Bottom. This initializes any built in materialize js that we set in place.............
  M.AutoInit();


