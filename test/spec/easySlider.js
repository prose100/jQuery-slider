( function( $, QUnit ) {

	"use strict";

	var $testCanvas = $( "#testCanvas" );
	var $fixture = null;

	QUnit.module( "jQuery Boilerplate", {
		beforeEach: function() {

			// fixture is the element where your jQuery plugin will act
			$fixture = $( "<div/>" );

			$testCanvas.append( $fixture );
		},
		afterEach: function() {

			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	} );

	QUnit.test( "is inside jQuery library", function( assert ) {

		assert.equal( typeof $.fn.easySlider, "function", "has function inside jquery.fn" );
		assert.equal( typeof $fixture.easySlider, "function", "another way to test it" );
	} );

	QUnit.test( "returns jQuery functions after called (chaining)", function( assert ) {
		assert.equal(
			typeof $fixture.easySlider().on,
			"function",
			"'on' function must exist after plugin call" );
	} );

	QUnit.test( "caches plugin instance", function( assert ) {
		$fixture.easySlider();
		assert.ok(
			$fixture.data( "plugin_easySlider" ),
			"has cached it into a jQuery data"
		);
	} );

	QUnit.test( "enable custom config", function( assert ) {
		$fixture.easySlider( {
			foo: "bar"
		} );

		var pluginData = $fixture.data( "plugin_easySlider" );

		assert.deepEqual(
			pluginData.settings,
			{
	          	foo: "bar",				
				slideSpeed: 500,
				automatic: true,
				paginationSpacing: "15px",
				paginationDiameter: "12px",
				paginationPositionFromBottom: "0px",
				controlsClass: ".controls",
				slidesClass: ".slides",
				paginationClass: ".pagination"
			},
			"extend plugin settings"
		);

	} );

}( jQuery, QUnit ) );
