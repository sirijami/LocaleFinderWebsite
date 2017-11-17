
$(document).ready(function() 
{
	var selection1 = localStorage.getItem('neighborhoods1')
	var selection2 = localStorage.getItem('neighborhoods2')
	document.getElementById("a1Name").innerHTML = selection1
	document.getElementById("a2Name").innerHTML = selection2
	/*document.getElementById("homeArea1").innerHTML = selection1
	document.getElementById("homeArea2").innerHTML = selection2 */

	$('#a1Name').on('click', function() {
    location.href = 'neighborDetail.html?from=c&name=' + selection1    
	});

	$('#a2Name').on('click', function() {
    location.href = 'neighborDetail.html?from=c&name=' + selection2   
	});

	


	var crimes = localStorage.getItem('crimeRecords')
	var crimes1 = findData(crimes, selection1)
	var crimes2 = findData(crimes, selection2)
	var crimeGrade1 = getGradeForCrime(crimes1)
	var crimeGrade2 = getGradeForCrime(crimes2)
	document.getElementById("a1crimeText").innerHTML = crimeGrade1
	document.getElementById("a2crimeText").innerHTML = crimeGrade2
	/*--------------------------------------------------------------------------*/
	var school = localStorage.getItem('schoolRating')
	var school1 = findData(school, selection1)
	var school2 = findData(school, selection2)
	var schoolGrade1 = getGradeForSchool(school1)
	var schoolGrade2 = getGradeForSchool(school2)
	document.getElementById("a1schoolText").innerHTML = getGradeForSchool(school1)
	document.getElementById("a2schoolText").innerHTML = getGradeForSchool(school2)
	/*-----------------------------------------------------------------------------*/
	var transport = localStorage.getItem('transportation')
	var transport1 = findData(transport, selection1)
	var transport2 = findData(transport, selection2)
	var transportGrade1 = getGradeForTransport(transport1)
	var transportGrade2 = getGradeForTransport(transport2)
	document.getElementById("a1transportText").innerHTML = getGradeForTransport(transport1)
	document.getElementById("a2transportText").innerHTML = getGradeForTransport(transport2)
	/*-------------------------------------------------------------------------------------*/
	var house = localStorage.getItem('housePrice')
	var house1 = findData(house, selection1)
	var house2 = findData(house, selection2)
	var houseGrade1 = getGradeForHousePrice(house1)
	var houseGrade2 = getGradeForHousePrice(house2)
	document.getElementById("a1houseText").innerHTML = getGradeForHousePrice(house1)
	document.getElementById("a2houseText").innerHTML = getGradeForHousePrice(house2)
	/*-------------------------------------------------------------------------------*/
	var income = localStorage.getItem('income')
	var income1 = findData(income, selection1)
	var income2 = findData(income, selection2)
	var incomeGrade1 = getGradeForIncome(income1)
	var incomeGrade2 = getGradeForIncome(income2)
	document.getElementById("a1incomeText").innerHTML = getGradeForIncome(income1)
	document.getElementById("a2incomeText").innerHTML = getGradeForIncome(income2)
	/*------------------------------- COLORS --------------------------------------*/
	document.getElementById("a1crime").className = getClassForGrade(crimeGrade1)
	document.getElementById("a2crime").className = getClassForGrade(crimeGrade2)
	document.getElementById("a1school").className = getClassForGrade(schoolGrade1)
	document.getElementById("a2school").className = getClassForGrade(schoolGrade2)
	document.getElementById("a1transport").className = getClassForGrade(transportGrade1)
	document.getElementById("a2transport").className = getClassForGrade(transportGrade2)
	document.getElementById("a1house").className = getClassForGrade(houseGrade1)
	document.getElementById("a2house").className = getClassForGrade(houseGrade2)
	document.getElementById("a1income").className = getClassForGrade(incomeGrade1)
	document.getElementById("a2income").className = getClassForGrade(incomeGrade2)
});
/***********************************************************************************/
function findData(map, value) 
{
	var list = JSON.parse(map);
	for (var i=0;i<list.length;i++)
	{
		if (list[i].area == value) 
		{
			return list[i].data;
		}
	} 
}

function getClassForGrade(grade) {
	if (grade == 'A+')
	{
		return 'AA';
	} 
	else if (grade == 'A')
	{
		return 'A';
	} 
	else if (grade == 'B+') 
	{
		return 'BB'
	}
	else if(grade == 'B')
	{
		return 'B'
	}
	else if (grade == 'C')
	{
		return 'C'
	}
	else
	{
		return 'D'
	}
}

function getGradeForCrime(value) 
{
	value=value.replace(/\,/g,'');
	value=parseInt(value,10);
	if (value < 2500)
	{
		return 'A+'
	} 
	else if (value < 3000) 
	{
		return 'A'
	} 
	else if (value < 3500) 
	{
		return 'B+'
	} 
	else if (value < 4000) 
	{
		return 'B'
	} 
	else if (value < 6500) 
	{
		return 'C'
	} 
	else 
	{
		return 'D'
	}
}

function getGradeForSchool(value)
{
	value=value.replace(/\,/g,'');
	value=parseInt(value,10);
	if (value == 10)
	{
		return 'A+'
	} 
	else if (value == 9)
	{
		return 'A'
	} 
	else if (value == 8)
	{
		return 'B+'
	} 
	else if (value == 7)
	{
		return 'B'
	} 
	else if (value >= 5)
	{
		return 'C'
	} 
	else
	{
		return 'D'
	}
}

function getGradeForTransport(value)
{
 	value=value.replace(/\,/g,'');
	value=parseInt(value,10);
	if (value > 500) 
	{
		return 'A+'

	} 
	else if (value > 400 )
	{
		return 'A'

	} 
	else if (value >300 ) 
	{
		return 'B+'

	} 
	else 
	{
		return 'B'

	} 
}

function getGradeForHousePrice(value)
{
 	value=value.replace(/\,/g,'');
	value=parseInt(value,10);
	if (value > 500) 
	{
		return 'A+'

	} 
	else if (value > 400 )
	{
		return 'A'

	} 
	else if (value >300 ) 
	{
		return 'B+'

	} 
	else 
	{
		return 'B'

	} 
}
function getGradeForIncome(value) 
{
	value=value.replace(/\,/g,'');
	value=parseInt(value,10);
	if (value > 70000)
	{
		return 'A+'
	} 
	else if (value > 50000)
	{
		return 'A'
	} 
	else 
	{
		return 'B'
	}
}

function setFinalValue1() 
{
	localStorage.setItem('finalSelection', document.getElementById('choice1').innerHTML)
	redirect()
}

function setFinalValue2() 
{
	localStorage.setItem('finalSelection', document.getElementById('choice2').innerHTML)
	redirect()
}

function redirect() {
	window.location.href = "finalPage.html";
}

