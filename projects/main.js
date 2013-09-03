$(function() {
	$(".dialog").dialog({
		autoOpen: false,
        width: 600,
    	buttons: {
    		OK: function() {
    			$( this ).dialog( "close" );
    		}
		},
    	modal: true
	});
	$(".battle-b").click(function() {
    	$(".battle").dialog("open");
    });
    $(".move-b").click(function() {
        $(".move").dialog("open");
    });
    $(".trade-b").click(function() {
        $(".trade").dialog("open");
    });
    $(".tech-b").click(function() {
        $(".tech").dialog("open");
    });
    $(".build-b").click(function() {
        $(".build").dialog("open");
    });
    $(".action-b").click(function() {
        $(".action").dialog("open");
    });
    $(".propaganda-b").click(function() {
        $(".propaganda").dialog("open");
    });
    $(".council-b").click(function() {
        $(".council").dialog("open");
    });
});