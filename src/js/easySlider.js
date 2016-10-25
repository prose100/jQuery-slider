// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "easySlider",
			defaults = {
				slideSpeed: 500,
				autoSlide: true,
				paginationSpacing: "15px",
				paginationDiameter: "12px",
				paginationPositionFromBottom: "0px",
				controlsClass: ".controls",
				slidesClass: ".slides",
				paginationClass: ".pagination"
			};

		// The actual plugin constructor
		function Plugin (element, options) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend({}, defaults, options);
			this._default = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				this.setProperties();
				this.positionPagination();
				this.slideParameters.setCurrentSlideNumber.call(this, 1);

				if (this.settings.autoSlide === true) {
					this.slideParameters.setAutoStatus.call(this, true);
					this.animations.autoSlide.call(this);
				} else {
					this.slideParameters.setAutoStatus(this, false);
				}

				this.events.clickRight.call(this);
				this.events.clickLeft.call(this);
				this.events.clickPaginate.call(this);
			},
			convertStringToInteger: function(string) {
				return parseInt(string);
			},
			setProperties: function() {
				$("#slider").css({
					"position": "relative",
					"overflow": "hidden"
					});
				$(this.settings.slidesClass).css({
					"position": "relative",
					"width": this.slideParameters.getMaxSlidePercentage.call(this).toString()+"%"
					});
				$(this.settings.controlsClass).css({
					"cursor": "pointer"
					});
				$(this.settings.controlsClass+" "+"li").css({
					"position": "absolute"
					});
				$(this.settings.slidesClass+" "+"li").css({
					"width": 100/this.slideParameters.getNumberOfSlides.call(this).toString()+"%",
					"float": "left"
					});
				$(this.settings.paginationClass).css({
					"position": "absolute",
					"left": "50%",
					"bottom": this.settings.paginationPositionFromBottom,
					"margin": 0
					});
				$(this.settings.paginationClass+" "+"li").css({
					"margin-right": this.settings.paginationSpacing,
					"float": "left",
					"cursor": "pointer",
					"width": this.settings.paginationDiameter,
					"height": this.settings.paginationDiameter,
					"border-radius": "9999px"
					});
			},
			positionPagination: function() {
				var numberOfSlides = this.slideParameters.getNumberOfSlides.call(this);
				var marginLeft = -(numberOfSlides*(this.convertStringToInteger(this.settings.paginationDiameter)) + (numberOfSlides-1)*(this.convertStringToInteger(this.settings.paginationSpacing)))/2;
				
				$(this.settings.paginationClass).css("margin-left", marginLeft);
			},
			slideParameters: {
				setCurrentSlideNumber: function(currentSlideNumber) {
					this.currentSlideNumber = currentSlideNumber;
				},
				getCurrentSlideNumber: function() {
					return this.currentSlideNumber;
				},
				setAutoStatus: function(autoStatus) {
					console.log(this)
					console.log(autoStatus);
					this.autoStatus = autoStatus;
				},
				getAutoStatus: function() {
					console.log(this.autoStatus);
					return this.autoStatus;
				},
				getNumberOfSlides: function() {
					return $(this.settings.slidesClass).children().length;
				},
				getSlideWidth: function() {
					return $(this.settings.slidesClass + " " + "li").width();
				},
				getSlideHeight: function() {
					// console.log($(this.settings.slidesClass + " " + "li").height());
					return $(this.settings.slidesClass + " " + "li").height();
				},
				getSliderHeight: function() {
					// console.log($(this.element).height());
					return $(this.element).height();
				},
				getMaxSlidePercentage: function() {
					return this.slideParameters.getNumberOfSlides.call(this)*100;
				}
			},
			events: {
				clickRight: function() {
					var _this = this;
					
					$(this.settings.controlsClass+" "+"li:last-child").click(
						function() {
							_this.animations.slideRight.call(_this, 1);
							_this.slideParameters.setAutoStatus.call(_this, false);
						}
					);
				},
				clickLeft: 	function() {
					var _this = this;

					$(this.settings.controlsClass+" "+"li:first-child").click(
						function() {
							_this.animations.slideLeft.call(_this, 1);
							_this.slideParameters.setAutoStatus.call(_this, false);
						}
					);							
				},
				clickPaginate: function() {
					var _this = this;

					$(this.settings.paginationClass + " " + "li").click(
						function() {

							var slideDistance = Math.abs(_this.slideParameters.getCurrentSlideNumber.call(_this) - ($(this).index()+1));
							_this.slideParameters.setAutoStatus.call(_this, false);

							//slide right or left depending on pagination element clicked with respect to current slide
							if (_this.slideParameters.getCurrentSlideNumber.call(_this) <= $(this).index()) {	
								_this.animations.slideRight.call(_this, slideDistance);
							} else {					
								_this.animations.slideLeft.call(_this, slideDistance);
							}
						}
					);
				}
			},
			animations: {
				slideRight: function(slideDistance) {
					if (this.slideParameters.getCurrentSlideNumber.call(this) === this.slideParameters.getNumberOfSlides.call(this)) {
						//go to first slide, when slideshow has reached max distance
						$(this.settings.slidesClass).animate({right: "0%"}, this.settings.slideSpeed);
						this.slideParameters.setCurrentSlideNumber.call(this, 1);
					} else {
						//go to next slide
						$(this.settings.slidesClass).animate({right: "+=" + slideDistance*100 + "%"}, this.settings.slideSpeed);
						this.slideParameters.setCurrentSlideNumber.call(this, this.slideParameters.getCurrentSlideNumber.call(this)+slideDistance);
					}
					this.animations.activatePagination.call(this, this.slideParameters.getCurrentSlideNumber.call(this));
				},
				slideLeft: function(slideDistance) {
					if (this.slideParameters.getCurrentSlideNumber.call(this) === 1) {
						//go to last slide, when slideshow has reached first slide
						$(this.settings.slidesClass).animate({right: (this.slideParameters.getMaxSlidePercentage.call(this)-100).toString()+"%"}, this.settings.slideSpeed);
						this.slideParameters.setCurrentSlideNumber.call(this, this.slideParameters.getNumberOfSlides.call(this));
					} else {
						//go to next slide
						$(this.settings.slidesClass).animate({right: "-=" + slideDistance*100 + "%"}, this.settings.slideSpeed);
						this.slideParameters.setCurrentSlideNumber.call(this, this.slideParameters.getCurrentSlideNumber.call(this)-slideDistance);
					}
					this.animations.activatePagination.call(this, this.slideParameters.getCurrentSlideNumber.call(this));
				},
				activatePagination: function(currentSlideNumber) {
					var i;
					var total = this.slideParameters.getNumberOfSlides.call(this);
					for (i=1; i<=total; i++) {
						$(this.settings.paginationClass + " " + "li:nth-child"+ "(" + i.toString() + ")").removeClass("active");
					}
					$(this.settings.paginationClass + " " + "li:nth-child"+ "(" + currentSlideNumber.toString() + ")").addClass("active");
					this.slideParameters.setCurrentSlideNumber.call(this, currentSlideNumber);
				},
				autoSlide: function() {
					var _this = this; 
					
					var stop = setInterval(function() {
					      	slide();
					    	}, 1500); 
					              
					function slide() {
						if (_this.slideParameters.getAutoStatus.call(_this) === false) {
							console.log("hi");
					    	clearInterval(stop);
					  	} else {
					  		_this.animations.slideRight.call(_this, 1);
					  	}
					} 
				}	
			}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
