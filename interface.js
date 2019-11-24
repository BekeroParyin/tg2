$(function() {
$("#resgood").change(function() {
	$('#resource-list').fadeToggle();
	$('#goods-list').fadeToggle();
}); });
function drawLeftBar(){
	if($('a#resource-tab').hasClass('active')){
		console.log("Draw resources");
	}
}