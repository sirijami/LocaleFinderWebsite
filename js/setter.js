$('.compareButton').click(function(){
	 var leftVal = $('#leftInput').val();
	 var rightVal = $('#rightInput').val();
	 if(leftVal == ""){
		 $("#errorMessage1").text("Please Select a neighborhood name");
		 $("#leftInput").css({"border-color" :"red", "border-width":"2px", "border-style":"solid"});
	 }else if(rightVal == ""){
		 $("#errorMessage2").text("Please Select a neighborhood name");
		 $("#rightInput").css({"border-color" :"red", "border-width":"2px", "border-style":"solid"});
	 }else
		 setValues();
});
$('#leftInput').click(function(){
	$("#errorMessage1").hide();
	$("#leftInput").css({"border-color" :"#2DBCB6", "border-width":"2px", "border-style":"solid"});
});
$('#rightInput').click(function(){
	$("#errorMessage2").hide();
	$("#rightInput").css({"border-color" :"#2DBCB6", "border-width":"2px", "border-style":"solid"});
});
function setValues()
{
	localStorage.setItem('neighborhoods1', document.getElementById('leftInput').value)
	localStorage.setItem('neighborhoods2', document.getElementById('rightInput').value)
	window.location.href = "DetailedComparePage.html";
}
