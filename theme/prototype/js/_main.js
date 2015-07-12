

/*! Fix header when scrolling down */
$(document).ready(function() {
    var $header = $(".navigation"),
        $clone = $header.before($header.clone().addClass("clone"));
    
    $(window).on("scroll", function() {
        var fromTop = $(window).scrollTop();
        $("body").toggleClass("down", (fromTop > 120));
    });

    $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
    $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
    e.preventDefault();
  });

    $('.sliding-search-panel-button,.sliding-search-panel-fade-screen,.sliding-search-panel-close').on('click touchstart',function (e) {
    $('.sliding-search-panel-content,.sliding-search-panel-fade-screen').toggleClass('is-visible');
    e.preventDefault();
  });
});
 
/*! Parallax window */ 
$(document).ready(function() {
  if ($(".section--parallax").length) {
    parallax();
  }
});

$(window).scroll(function(e) {
  if ($(".section--parallax").length) {
    parallax();
  }
});

function parallax(){
  $( ".section--parallax" ).each(function() {
    
    var plxBackground = $( this ).find(".section__background");
    var plxWindow = $( this );
     
    var plxWindowTopToPageTop = $(plxWindow).offset().top;
    var windowTopToPageTop = $(window).scrollTop();
    var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

    var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
    var windowInnerHeight = window.innerHeight;
    var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
    var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
    var plxSpeed = 0.35;

    plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
  });

}

$(document).ready(function(){
// Target your .container, .wrapper, .post, etc.
    $(".video--page").fitVids();
});

    
$("img--lazy").unveil(200, function() {
    
    $(this).load(function() {
          
              this.style.opacity = 1;
          
    });
    
});
