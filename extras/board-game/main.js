$(function() {
	$(".dialog").dialog({
		autoOpen: false,
    	buttons: {
    		OK: function() {
    			$( this ).dialog( "close" );
    		}
		},
    	modal: true
	});
	$("#battles-b").click(function() {
    	$("#battles").dialog("open");
    });
});