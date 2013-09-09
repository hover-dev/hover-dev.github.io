var houses = 		["Bear", 		"Elk", 		"Falcon", 	"Serpent", 	"Fox", 		"Wolf"];
var family_names = 	["Burghe", 		"Elk", 		"Thorne", 	"Mwnn", 	"Yvarai", 	"Adrente"];
var virtues = 		["Strength", 	"Cunning", 	"Courage", 	"Wisdom", 	"Beauty", 	"Prowess"];
var places = ["first", "second", "third", "fourth", "fifth", "sixth"];
var numbers = ["zero", "one", "two", "three", "four", "five"];
var integers = ["0", "1", "2", "3", "4", "5"];
var titles = ["Barons", "Barons", "Barons", "Counts", "Counts", "Marquis"];
var public_name_cleared = false;
var secret_name_cleared = false;
var age_cleared = false;
var regions = ["Castle", "Farm", "Forest", "Hills", "Mountain", "Plains", "Ruin", "Shoreline/River", "Swamp", "Village"];
			
$(document).ready(function() {
	$("#married").change(function() {
		if ($(this).val() == 0)
			$("#about_marriage").hide();
		else
			$("#about_marriage").show();
	});
	$("select").change(function() {
		update_influence_points();
	});
	
	//$("button#generate").click(function() {
		// Parents
		var mothers_house = d6();
		$("#mothers_house").html(select_from_list(houses, mothers_house));
		var fathers_house = d6();
		$("#fathers_house").html(select_from_list(houses, fathers_house));
		$("#parents_title").html(select_from_list(titles));
		
		// Siblings
		var siblings = d6();
		$("#nth_born").html(select_from_list(places));
		$("#remaining_siblings").html(select_from_list(integers, siblings));
		var brothers = set_brothers_and_sisters(siblings);
		$("#remaining_siblings").change(function() {
			set_brothers_and_sisters($(this).find("option:selected").text().substring(0,1));
		});
		$("#brothers").change(function() {
			$("#sisters").val(siblings-$(this).find("option:selected").text().substring(0,1));
		});
		
		// You
		$("#your_house").html(select_all_from_list(houses));
		$("#house_name").val(family_names[$("#your_house").val()]);
		$("#your_house").change(function() {
			$("#house_name").val(family_names[$(this).val()]);
		});
		
		// Virtues
		$("#weakness, #rank4, #rank3A, #rank3B, #rank2A, #rank2B, #house_virtue").html(select_all_from_list(virtues));
		
		// Domain
		$("#regionA, #regionB, #regionC, #regionD, #regionE").html(select_all_from_list(regions));
		
		// Extra bits
		$("select").each(function() { sortSelect($(this)); });
		update_influence_points();
	//});
});

function select_all_from_list(list) {
	select = "";
	for (x = 0; x < list.length; x++)
	{
		select += "<option value=\""+x+"\">"+list[x]+"</option>";
	}
	
	return select;
}
function set_brothers_and_sisters(siblings,brother_count) {
	var brothers = 0;
	if (typeof brother_count != 'undefined')
	{
		brothers = brother_count;
	}
	else {
		for (x = 0; x < siblings; x++)
		{
			if (d6() <= 3) brothers++;
		}
	}
	$("#brothers").html(select_from_list(integers, brothers, siblings));
	$("#sisters").val(siblings-brothers);
	
	return brothers;
}
function select_from_list(list,index,limit) { // assumes list of 6 items
	var i = d6();
	if (typeof index != 'undefined')
	{
		i = index;
	}
	var select = "";
	select += select_option(list[i]+" (-0)", 0);
	for (x = 1; x <= 3; x++)
	{
		if (i-x >= 0)
		{
			select += select_option(list[i-x]+" (-" + x + ")", x);
		}
		if ((i+x < 6) && (typeof limit == 'undefined' || i+x <= limit))
		{
			select += select_option(list[i+x]+" (-" + x + ")", x);
		}
	}
	return select;
}
function update_influence_points() {
	var p = 3;
	$("select:not(.no_cost)").each(function() {
		p -= $(this).val();
	});
	$("#influence_points").val(p);
	if (p < 0) $("#influence_points").css('background', '#F00').css('color', '#FF0');
	else $("#influence_points").css('background', '#FFF').css('color', '#000');
}
function select_option(name, value) {
	return "<option value=\"" + value + "\">" + name + "</option>";
}
function d6() {
	return Math.floor(6 * (Math.random() % 1));
}
function sortSelect(selElem) {
	if (typeof selElem.options == 'undefined') return;
	var tmpAry = new Array();
	for (var i=0;i<selElem.options.length;i++) {
			tmpAry[i] = new Array();
			tmpAry[i][0] = selElem.options[i].text;
			tmpAry[i][1] = selElem.options[i].value;
	}
	tmpAry.sort();
	while (selElem.options.length > 0) {
		selElem.options[0] = null;
	}
	for (var i=0;i<tmpAry.length;i++) {
			var op = new Option(tmpAry[i][0], tmpAry[i][1]);
			selElem.options[i] = op;
	}
	return;
}