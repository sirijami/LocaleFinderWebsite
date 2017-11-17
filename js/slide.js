$(function(){
	  sliderTimer();
		var imgadr= ['image/Seattle-skyline4.png','image/main1.jpg','image/main2.jpg','image/main4.jpg','image/main5.jpg','image/main6.jpg'];
		var headArray= ['Find Your Dream Neighborhood','Find Your Dream Neighborhood', 'Find Your Dream Neighborhood', 'Find Your Dream Neighborhood','Find Your Dream Neighborhood','Find Your Dream Neighborhood'];
		var paraArray= ['We care what matters to you',
						'We care what matters to you!',
						'We care what matters to you',
						'We care what matters to you',
            'We care what matters to you',
            'We care what matters to you'];
    // var paraColor = ['#fff','#000','#e05915','#fff','#f2b632','#f2b632'];
		var cnt= 0;
		var timer;
		$('#left').click(function(){
			 prev();
		});
		$('#right').click(function(){
			 next();
		});
		function sliderTimer()
		{
		  timer= setInterval(slider, 3500);
		}

		function slider()
		{
		  cnt++;
		  if(cnt == imgadr.length)
		    cnt= 0;

		  var slider= $('#indexMain').css("background-image","url(\'"+imgadr[cnt]+"\')");
		  // $('#sliderHeader').html(headArray[cnt]);  //or append?
		  // $('#sliderPara').html(paraArray[cnt]);
      // $('#sliderHeader').css("color",paraColor[cnt]);
      // $('#sliderPara').css("color",paraColor[cnt]);
		}

		function next()
		{
		  clearInterval(timer);

		  cnt++;
		  if(cnt == imgadr.length)
		    cnt= 0;

		  var slider= $('#indexMain').css("background-image","url(\'"+imgadr[cnt]+"\')");
		  // $('#sliderHeader').html(headArray[cnt]);
		  // $('#sliderPara').html(paraArray[cnt]);
      // $('#sliderHeader').css("color",paraColor[cnt]);
      // $('#sliderPara').css("color",paraColor[cnt]);
		  sliderTimer();
		}

		function prev()
		{
		  clearInterval(timer);

		  cnt--;
		  if(cnt == -1)
		    cnt= imgadr.length-1;

			var slider= $('#indexMain').css("background-image","url(\'"+imgadr[cnt]+"\')");
		  // $('#sliderHeader').html(headArray[cnt]);
		  // $('#sliderPara').html(paraArray[cnt]);
      // $('#sliderHeader').css("color",paraColor[cnt]);
      // $('#sliderPara').css("color",paraColor[cnt]);
		  sliderTimer();
		}
});
