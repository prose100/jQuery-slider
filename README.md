#[jQuery-slider Plugin](http://www.paultrose.com/blogJul16.html)

The jQuery-slider Plugin provides a simple, adaptable slideshow that is responsive.

## Getting Started

[Downloading](https://github.com/prose100/jQuery-slider/zipball/master) or Forking this repository

## Usage Instructions

####Include the CSS & JS
style.css can be modified to fit a website design

    <link href="css/style.css">
    <script src="js/easySlider.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/
                 jquery/2.1.4/jquery.min.js"></script>

####Menu Markup

    <div id="slider">
	  <ul class="slides">
	    <li><img class="responsive" src="http://placehold.it/350x150"></li>
	    <li><img class="responsive" src="http://placehold.it/350x150"></li>
	    <li><img class="responsive" src="http://placehold.it/350x150"></li>    
	  </ul>

	  <ul class="controls">
	    <li><img src="img/prev.png" alt="previous"></li>
	    <li><img src="img/next.png" alt="next"></li>
	  </ul>

	  <ul class="pagination">
	    <li class="active"></li>
	    <li></li>
	    <li></li>
	  </ul>
	</div>

####Initialize

    <script>
	  $(function() {
	      $("#slider").easySlider({});
	  });
	</script>

## Default `options`

There are some customizable options in this plugin using key : value pairs. These are the defaults. 
Visit [jQuery-slider Plugin](http://www.paultrose.com/blogJul16.html) for description of these properties.

```
$(".nav-menu").mobilemenu({
    slideSpeed: 500,
	paginationSpacing: "15px",
	paginationDiameter: "12px",
	paginationPositionFromBottom: "20px",
	controlsClass: ".controls",
	slidesClass: ".slides",
	paginationClass: ".pagination"
});

```
 
## To see a demo and for more details:

Visit [jQuery-slider Plugin](http://www.paultrose.com/blogJul16.html).