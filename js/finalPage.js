/*$(document).ready(function() 
{
	var name = document.getElementById('choice1')
	document.getElementById('neighborhoodName').innerHTML = name
}); */

/*$( "#choice1" ).click(function() 
{
  var name = document.getElementById('choice1')
	document.getElementById('neighborhoodName').innerHTML = name
}); */
$(document).ready(function()
{
	document.getElementById("neighborhoodName").innerHTML = localStorage.getItem('finalSelection');
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(document.location.href);
		if (results==null){
		   return null;
		}
		else{
		   return results[1] || 0;
		}
	    };
	    var name = decodeURIComponent($.urlParam("name"));
	    if(name!="null"){
		$("#neighborhoodName").html(name);
	    }

/*$("#choice1").click(function()
    {
      var name = document.getElementById('choice1')
		document.getElementById('neighborhoodName').innerHTML = name
    }); */
});
