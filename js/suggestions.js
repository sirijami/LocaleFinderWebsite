var retrievedObject = localStorage.getItem('survey');
var survey = JSON.parse(retrievedObject);

/* queations to cretirion mapping explaination:
1)if user have kis, give credit to top three ares with lowest crime and highest shcool rate
2)if user use public transportation daily or a fews time a week, give credit to top three areas with the most bus stop
3)user's income and house price mapping:
	user's income in '10-50',  give credit to top three areas with house price above '200' in ascding order
	user's income in '50-100',  give credit to top three areas with house price above '500' in ascding order
	user's income in '100-150',   give credit to top three areas with house price above '800' in ascding order
	user's income in '150+',  give credit to top three areas with house price above '100' in ascding order
4)user's activity mapping:
	user select hiking, give credit to top three area where support hiking activity
	user select swimming, give credit to top three area where support swimming activity
	user select travelling, give credit to top three area where support travelling activity

At last, sort areas by credit and choose top three
*/
//each element is in this format:{"area":"","score":"","detail":{"crime":"","school":"","transportation":"","housePrice":""}}
var suggestionList = [];
//question kids mapping
var suggestedNeighbours;
if (survey.kids === "YES") {
  suggestedNeighbours = getNeighbourByCrime();
  console.log(suggestedNeighbours);
   //set the score to the crime less Areas
   setScoreToNeighbours(suggestedNeighbours,credit.crime,criteria.crime);
   //set the score to the area with highest school rating
   suggestedNeighbours  = getNeighbourBySchool();
   setScoreToNeighbours(suggestedNeighbours,credit.school,criteria.school);
}
//question income range mapping
//filter three area with lowest average housing price that over the "housePrice"
var housePrice = incomeHousePriceMapping[survey.income];
suggestedNeighbours = getNeighbourByIncome(housePrice);
setScoreToNeighbours(suggestedNeighbours,credit.housePrice,criteria.housePrice);

//question public transportation mapping
if(survey.transportation === "DAILY" || survey.transportation === "FEW DAYS IN A WEEK"){
     suggestedNeighbours = getNeighbourByTransporation();
     setScoreToNeighbours(suggestedNeighbours,credit.transportation,criteria.transportation);
}
//question activity mapping
if(survey.activity === "outdoor" || survey.activity === "movies" || survey.activity === "bar-hopping"||survey.activity === "foodie"){
     suggestedNeighbours = getNeighbourByActivity(survey.activity);
     setScoreToNeighbours(suggestedNeighbours,credit[survey.activity.toLowerCase()],criteria.supportingAct,survey.activity);
}
//sort suggesting list by credit
suggestionList.sort(function(a, b) {
    return (a.score < b.score) ? 1 : ((a.score > b.score) ? -1 : 0)
});
console.log(suggestionList);

var suggestedAreaDetail = [];
var areaDetail = localStorage.getItem('areaDetail');
var areaDetailObj = JSON.parse(areaDetail);
suggestionList = suggestionList.slice(0,neighborhood.top);
for(var i in suggestionList){
    for(var j in areaDetailObj){
      if(suggestionList[i].area == areaDetailObj[j].name){
        suggestedAreaDetail[i] = areaDetailObj[j];
        break;
      }
    }
}
console.log(suggestedAreaDetail);

//this function to form the suggesting list according to filtered neighborhood, credit and criteria
function setScoreToNeighbours(suggestedNeighbours,credit,criteria,sport){
    var modified = false;
    for(var n in suggestedNeighbours){
      var i = 0;
      for(i = 0;i<suggestionList.length;i++){
          if(suggestionList[i].area == suggestedNeighbours[n].area){
            var origScore = parseInt(suggestionList[i].score);
            suggestionList[i].score = origScore + parseInt(credit)
            modified = true;
          }
      }
      if(!modified){
          suggestionList[i] = {};
          suggestionList[i].area = suggestedNeighbours[n].area;
          suggestionList[i].score = credit;          
      }else modified = false;
    }

}
//get top three neighbours according to activity
function getNeighbourByActivity(selectedActivity){
  var activity = localStorage.getItem("activity");
  var activityObj = JSON.parse(activity);
  var neighbours= [];
  for(var n in activityObj){
      if(activityObj[n].sport == selectedActivity){
        var places = activityObj[n].place;
        //get top three area that support that activity
        neighbours = places.slice(0,neighborhood.top);
        break;
      }
  }
  return neighbours;
}
//get top three neighbours according to bus stop number
function getNeighbourByTransporation(){
  var transportation = localStorage.getItem("transportation");
  var transportationObj = JSON.parse(transportation);
  var neighbours = transportationObj.slice(0,neighborhood.top);
  return neighbours;
}
//get top three neighbours according to income
function getNeighbourByIncome(minHousePrice){
     var housePrice = localStorage.getItem("housePrice");
     var housePriceObj = JSON.parse(housePrice);
     var neighbours= [];
     for(var n in housePriceObj){
          if(housePriceObj[n].data >= minHousePrice){
            neighbours[0] = housePriceObj[n];
            n++;
            if(n< housePriceObj.length) neighbours[1] = housePriceObj[n];
            n++;
            if(n< housePriceObj.length) neighbours[2] = housePriceObj[n];
            break;
          }
     }
     return neighbours;
}
//get top three highest rating school area
function getNeighbourBySchool(){
     var schoolRating = localStorage.getItem("schoolRating");
     var schoolRatingObj = JSON.parse(schoolRating);   
    var neighbours = schoolRatingObj.slice(0,neighborhood.top);   
     return neighbours;
}
//get top three least crime area
function getNeighbourByCrime(){
   var crimeRecords = localStorage.getItem("crimeRecords");
   var crimeRecordsObj = JSON.parse(crimeRecords);
   var neighbours = crimeRecordsObj.slice(0,neighborhood.top);
   return neighbours;
}
//crime display


/*Graph Color Theme - Different Colors light bg all graphs*/
var graphBgColor='#fff';
var color1="#FF7D7D";
var color2="#B870FF";
var color3="#73D573";

$("#crimeContainer").CanvasJSChart(displayCrime());

function displayCrime(){
  var options = {
       backgroundColor: graphBgColor,

		title:{
			//text: "Crime record in three area"
		},
        animationEnabled: true,
		legend:{
			verticalAlign: "bottom",
			horizontalAlign: "center"
		},
		data: [
		{
			//indexLabelFontSize: 20,
			//indexLabelFontFamily: "Monospace",
			indexLabelFontColor: "darkgrey",
			indexLabelLineColor: "darkgrey",
			indexLabelPlacement: "outside",
			type: "pie",
			showInLegend: true,
			toolTipContent: "{y} - <strong>#percent%</strong>",

			dataPoints: [
				{  y: parseInt(suggestedAreaDetail[0].crimeRecord), legendText:suggestedAreaDetail[0].name, indexLabel: suggestedAreaDetail[0].name,color:color1 },
				{  y: parseInt(suggestedAreaDetail[1].crimeRecord), legendText:suggestedAreaDetail[1].name, indexLabel: suggestedAreaDetail[1].name,color: color2},
				{  y: parseInt(suggestedAreaDetail[2].crimeRecord), legendText:suggestedAreaDetail[2].name,exploded: true, indexLabel: suggestedAreaDetail[2].name,color:color3 },

			]
		}
		]
	};
  return options;
};

//income display
var dataObj = {
  //title:'Average Income in Three Area',

  ytitle:'Monthly Average Income in $',
  detail:[
    {name:suggestedAreaDetail[0].name,data:suggestedAreaDetail[0].income,color:color1},
    {name:suggestedAreaDetail[1].name,data:suggestedAreaDetail[1].income,color:color2},
    {name:suggestedAreaDetail[2].name,data:suggestedAreaDetail[2].income,color:color3}
  ]
}
$("#incomeChartContainer").CanvasJSChart(displayBarChar(dataObj));
//house price display
dataObj = {
 //title:'Average House Price in Three Area',
  ytitle:'yearly Average House Price in $(K)',
  detail:[
    {name:suggestedAreaDetail[0].name,data:suggestedAreaDetail[0].housePrice,color:color1},
    {name:suggestedAreaDetail[1].name,data:suggestedAreaDetail[1].housePrice,color:color2},
    {name:suggestedAreaDetail[2].name,data:suggestedAreaDetail[2].housePrice,color:color3}
  ]
}
$("#housePriceChartContainer").CanvasJSChart(displayBarChar(dataObj));



function displayBarChar(dataObj){
  var options = {
       backgroundColor: graphBgColor,
		title: {

			text: dataObj.title
		},

    axisY: {
				title: dataObj.ytitle
			},
    animationEnabled: true,
		data: [
		{
			type: "column", //change it to line, area, bar, pie, etc
			toolTipContent: "{label}: {y}",
			dataPoints: [
				{ label: dataObj.detail[0].name, y: parseInt(dataObj.detail[0].data),color:dataObj.detail[0].color },
				{ label: dataObj.detail[1].name, y: parseInt(dataObj.detail[1].data),color:dataObj.detail[1].color },
				{ label: dataObj.detail[2].name, y: parseInt(dataObj.detail[2].data),color:dataObj.detail[2].color }
			]
		}
		]
	};
  return options;
}


var dataObj = {
 // title:'School Rating of the top three areas',
  ytitle:'School Rating out of 10',
  detail:[
    {name:suggestedAreaDetail[0].name,data:suggestedAreaDetail[0].schoolRating,color:color1},
    {name:suggestedAreaDetail[1].name,data:suggestedAreaDetail[1].schoolRating,color:color2},
    {name:suggestedAreaDetail[2].name,data:suggestedAreaDetail[2].schoolRating,color:color3}
  ]
}
$("#schoolRatingChartContainer").CanvasJSChart(displayHorizontalBarChart(dataObj));

var dataObj = {
    // title:'School Rating of the top three areas',
    ytitle:'Transit Score out of 100',
    detail:[
        {name:suggestedAreaDetail[0].name,data:suggestedAreaDetail[0].transportation,color:color1},
        {name:suggestedAreaDetail[1].name,data:suggestedAreaDetail[1].transportation,color:color2},
        {name:suggestedAreaDetail[2].name,data:suggestedAreaDetail[2].transportation,color:color3}
    ]
}
$("#transportationContainer").CanvasJSChart(displayHorizontalBarChart(dataObj));

function displayHorizontalBarChart(dataObj){
  var options = {
       backgroundColor: graphBgColor,
		title: {
			text: dataObj.title
		},
        axisY: {
				title: dataObj.ytitle
			},
        animationEnabled: true,
		data: [
		{
			type: "bar",

            indexLabel: "{y}",
			dataPoints: [
				{ label: dataObj.detail[0].name, y: parseInt(dataObj.detail[0].data),color:dataObj.detail[0].color },
				{ label: dataObj.detail[1].name, y: parseInt(dataObj.detail[1].data),color:dataObj.detail[1].color },
				{ label: dataObj.detail[2].name, y: parseInt(dataObj.detail[2].data),color:dataObj.detail[2].color }
			]
		}
		]
	};
  return options;
}

/* Top Three Suggested Neighborhood Names */
for(i = 0; i < 3; i++) {
    y=i+1;

    $('#suggestionNames ul').append(
        $('<li role="menuitem" class="desktopLayout" style="align-items: center">').append('<div class="visible"><span class="fa-stack fa-4x">  <i class="fa fa-map-marker fa-stack-2x"></i> <strong class="fa-stack-1x map-marker-text">'+y +'</strong> </span></div><br/><p>')
            .append(suggestedAreaDetail[i].name.toUpperCase()).append(
            $('<a>').attr('href', "neighborDetail.html?from=s&name=" + suggestedAreaDetail[i].name).addClass('lf-padding-small lf-link').append('view details'))
            );
}

$('#crimeContent').append('The neighborhood with the least number of crimes is rated as the best. The number of crimes in a year are:'+ '<br/>' );
$('#incomeContent').append('The neighborhood with high average income is rated as the best. The monthly average incomes are:'+ '<br/>' );
$('#priceContent').append('The neighborhood with low average house prices is rated as the best. The average house prices are:'+ '<br/>');
$('#schoolRateContent').append('The neighborhood with high school ratings out 10 is rated as best. The school ratings are:'+ '<br/>');
$('#transportContent').append('The neighborhood with high ratings out of 100 is rated as best. The transit scores are:'+ '<br/>');

for(i = 0; i < 3; i++) {
    $('#crimeContent').append('<b>' + suggestedAreaDetail[i].name + '</b>'+ ' :' + suggestedAreaDetail[i].crimeRecord + ' yearly'+ '<br/>');
    $('#incomeContent').append('<b>' + suggestedAreaDetail[i].name + '</b>'+ ' :$' + suggestedAreaDetail[i].income + '<br/>' );
    $('#priceContent').append( '<b>' + suggestedAreaDetail[i].name + '</b>'+ ' :$' + suggestedAreaDetail[i].housePrice + '(K)' + '<br/>');
    $('#schoolRateContent').append('<b>' + suggestedAreaDetail[i].name + '</b>'+ ' :' + suggestedAreaDetail[i].schoolRating + '<br/>');
    $('#transportContent').append('<b>' + suggestedAreaDetail[i].name + '</b>'+ ' :' + suggestedAreaDetail[i].transportation + '<br/>');
}

$(document).ready(function(){
    $("#graphDisplay").click(function(){
        $("#graphs").toggle();
        //console.log($("#graphs").css('display'));
    });
    for(i = 0; i < 3; i++) {
        $('#popup-like ul').append($('<a class="lf-text-white">').attr('href', "../html/finalPage.html")
          .attr('onclick', 'setFinalSelection("'+suggestedAreaDetail[i].name+'")')
          .addClass('lf-link').append(suggestedAreaDetail[i].name.toUpperCase()));          

        //$('#popup-like ul').append($('<a class="lf-text-white">').attr('href', "neighborDetail.html?name=" + suggestedAreaDetail[i].name).addClass('lf-link').append(suggestedAreaDetail[i].name.toUpperCase()));
      //  $('#popup-like form').append('<input type="radio" name="top" value="top' + i + '">'+suggestedAreaDetail[i].name+'</input><br/>');
    }
});

function setFinalSelection(value){
   localStorage.setItem('finalSelection', value)
}
