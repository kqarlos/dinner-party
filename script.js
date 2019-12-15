

//Page load event listener for carousel.......................


// $(document).ready(function(){
//     $('.carousel').carousel();
//   });

//   $('.carousel.carousel-slider').carousel({
//     fullWidth: true
//   });

$(document).ready(function(){
  $('.slider').slider();
});


// Pause slider
$('.slider').slider('pause');
// Start slider
$('.slider').slider('start');
// Next slide
$('.slider').slider('next');
// Previous slide
$('.slider').slider('prev');
      









  //Keep this at the Bottom. This initializes any built in materialize js that we set in place.............
  M.AutoInit();


