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

		assert.equal( typeof $.fn.defaultPluginName, "function", "has function inside jquery.fn" );
		assert.equal( typeof $fixture.defaultPluginName, "function", "another way to test it" );
	} );

	QUnit.test( "returns jQuery functions after called (chaining)", function( assert ) {
		assert.equal(
			typeof $fixture.defaultPluginName().on,
			"function",
			"'on' function must exist after plugin call" );
	} );

	QUnit.test( "caches plugin instance", function( assert ) {
		$fixture.defaultPluginName();
		assert.ok(
			$fixture.data( "plugin_defaultPluginName" ),
			"has cached it into a jQuery data"
		);
	} );

	QUnit.test( "enable custom config", function( assert ) {
		$fixture.defaultPluginName( {
			foo: "bar"
		} );

		var pluginData = $fixture.data( "plugin_defaultPluginName" );

		assert.deepEqual(
			pluginData.settings,
			{
	          	foo: "bar",				
				slideSpeed: 500,
				paginationSpacing: "15px",
				paginationDiameter: "12px",
				paginationPositionFromBottom: "20px",
				controlsClass: ".controls",
				slidesClass: ".slides",
				paginationClass: ".pagination"
			},
			"extend plugin settings"
		);

	} );

}( jQuery, QUnit ) );
