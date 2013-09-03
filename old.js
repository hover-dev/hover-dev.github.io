$(document).ready(function() {
  // Slideshow on the index page
  $('.slideshow').cycle({
    fx: 'fade',
    speed: 2000,
    timeout: 800
  });
  
  // Expandable info boxes on project page
  $(".hide").hide();
  $(".more").click(function(){
    $(this).prev().slideToggle(600);
    if ($(this).text() == "Less...") $(this).text("More...")
    else $(this).text("Less...");
  });
});