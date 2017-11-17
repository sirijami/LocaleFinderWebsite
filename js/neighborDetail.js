$(function(){
    // detect viewport
    var isMobile = window.matchMedia("only screen and (max-width: 768px)");

    if (isMobile.matches) {//mobile viewport
        $("#galleryInfo").click(function(){
            $("#galleryDescM").slideToggle();
        });
        $("#historyInfo").click(function(){
            $("#historyDescM").slideToggle();
        });
        $("#schoolInfo").click(function(){
            $("#schoolDescM").slideToggle();
        });
        $("#incomeInfo").click(function(){
            $("#incomeDescM").slideToggle();
        });
        $("#housePriceInfo").click(function(){
            $("#housePriceDescM").slideToggle();
        });
        $("#activtyInfo").click(function(){
            $("#activityDescM").slideToggle();
        });
    }else{
        $("#galleryInfo").click(function(){
            hideOtherSection();
            $("#galleryDesc").fadeIn("slow");
        });
        $("#historyInfo").click(function(){
            hideOtherSection();
            $("#historyDesc").fadeIn("slow");
        });
        $("#schoolInfo").click(function(){
            hideOtherSection();
            $("#schoolDesc").fadeIn("slow");
        });
        $("#incomeInfo").click(function(){
            hideOtherSection();
            $("#incomeDesc").fadeIn("slow");
        });
        $("#housePriceInfo").click(function(){
            hideOtherSection();
            $("#housePriceDesc").fadeIn("slow");
        });
        $("#activtyInfo").click(function(){
            hideOtherSection();
            $("#activityDesc").fadeIn("slow");
        });
        function hideOtherSection(){
            $("#galleryDesc").css("display","none");
            $("#historyDesc").css("display","none");
            $("#schoolDesc").css("display","none");
            $("#incomeDesc").css("display","none");
            $("#housePriceDesc").css("display","none");
            $("#activityDesc").css("display","none");
        }
    }
        // gallery slide
        var slideIndex = 1;
        // showDivs(slideIndex);

        function plusDivs(n) {
          showDivs(slideIndex += n);
        }

        function currentDiv(n) {
          showDivs(slideIndex = n);
        }

        function showDivs(n) {
          var i;
          var x = $(".mySlides");
          var dots = $(".demo");
          if (n > x.length) {slideIndex = 1}
          if (n < 1) {slideIndex = x.length}
          for (i = 0; i < x.length; i++) {
             x[i].style.display = "none";
          }
          for (i = 0; i < dots.length; i++) {
             dots[i].className = dots[i].className.replace(" w3-white", "");
          }
          x[slideIndex-1].style.display = "block";
          dots[slideIndex-1].className += " w3-white";
        };
        function listenerToSlide(){
          $("#slidePre").click(function(){
             plusDivs(-1);
          });
          $("#slideNext").click(function(){
             plusDivs(1);
          });
          $("#badge1").click(function(){
             currentDiv(1);
          });
          $("#badge2").click(function(){
             currentDiv(2);
          });
          $("#badge3").click(function(){
             currentDiv(3);
          });
        };
        //getData
        // parse url parameter
        $.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
               return null;
            }
            else{
               return results[1] || 0;
            }
        };
        var fromURL = decodeURIComponent($.urlParam("from"));
        var name = decodeURIComponent($.urlParam("name"));
        //set name
        $(".neighborName span").html(name);
        //get area detial
        var areaDetail = localStorage.getItem("areaDetail");
        var areaDetailObj = JSON.parse(areaDetail);
        var neightbourDescription = localStorage.getItem("neightbourDescription");
        var neightbourDescriptionObj = JSON.parse(neightbourDescription);

        var neighborInfo = getNeighborInfoByName(name,areaDetailObj,neightbourDescriptionObj);
        //set background image
        $(".neighborName").css('background-image','url(../image/'+neighborInfo[0].image+')');
        //set table data
        $("#customers").append('<tr><td><i class="fa fa-bomb"></i>Crime Record</td><td>'+neighborInfo[0].crimeRecord+'</td></tr>');
        $("#customers").append('<tr><td><i class="fa fa-university"></i>School Rating </td><td>'+neighborInfo[0].schoolRating+'/10</td></tr>');
        $("#customers").append('<tr><td><i class="fa fa-bus"></i>Transit Score </td><td>'+neighborInfo[0].transportation+'/100</td></tr>');
        $("#customers").append('<tr><td><i class="fa fa-home"></i>Ave House Price</td><td>'+neighborInfo[0].housePrice+'(K)</td></tr>');
        $("#customers").append('<tr><td><i class="fa fa-money"></i>Ave Income </td><td>'+neighborInfo[0].income+'</td></tr>');
        //get neightbour description
        var galleryInfo = '<img class="mySlides" src="../image/'+neighborInfo[1].gallery[0]+'" style="width:100%">'+
        '<img class="mySlides" src="../image/'+neighborInfo[1].gallery[1]+'" style="width:100%">'+
        '<img class="mySlides" src="../image/'+neighborInfo[1].gallery[2]+'" style="width:100%">'+
        '<div class="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle" style="width:100%">'+
          '<div id="slidePre" class="w3-left"><i class="fa fa-chevron-left" style="font-size:36px;background-color:#000;color:#fff"></i></div>'+
          '<div id="slideNext" class="w3-right"><i class="fa fa-chevron-right" style="font-size:36px;background-color:#000;color:#fff"></i></div>'+
          '<span id="badge1" class="w3-badge demo w3-border w3-hover-white"></span>'+
          '<span id="badge2" class="w3-badge demo w3-border w3-hover-white"></span>'+
          '<span id="badge3" class="w3-badge demo w3-border w3-hover-white"></span>'+
        '</div>'
        if(isMobile.matches){//show info in center
          $("#galleryDescM div").html(galleryInfo);
          $("#historyDescM p").append(neighborInfo[1].history);
          $("#schoolDescM p").append(neighborInfo[1].education);
          $("#incomeDescM p").append(neighborInfo[1].wholive);
          $("#housePriceDescM p").append(neighborInfo[1].houseexpecse);
          $("#activityDescM p").append(neighborInfo[1].activity);
        }else{//show info right below the nav bar
          $("#galleryDesc div").html(galleryInfo);
          $("#historyDesc p").append(neighborInfo[1].history);
          $("#schoolDesc p").append(neighborInfo[1].education);
          $("#incomeDesc p").append(neighborInfo[1].wholive);
          $("#housePriceDesc p").append(neighborInfo[1].houseexpecse);
          $("#activityDesc p").append(neighborInfo[1].activity);
        }
        showDivs(slideIndex);
        listenerToSlide();
        //button actions
        $("#compareBtn").click(function(){
            document.location.href = "../html/CompareNeighborhoods.html?name="+name;
        });
        if(fromURL == "s"){
           fromURL = "SuggestionsPage.html";
        }else if(fromURL == "c"){
           fromURL = "DetailedComparePage.html";
        }else{
           fromURL = "map.html";
        }
        //back button
        $("#backBtn").click(function(){
             document.location.href = "../html/"+fromURL;
        });
        //view house button
        $("#viewHouseBtn").click(function(){
             document.location.href = "../html/finalPage.html?name="+name;
        });

    });
function getNeighborInfoByName(name,areaDetailObj,neightbourDescriptionObj){
    var neighbor = [];
    for(var n in areaDetailObj){
      if(areaDetailObj[n].name == name && neightbourDescriptionObj[n].name == name){
         neighbor[0] = areaDetailObj[n];
         neighbor[1] = neightbourDescriptionObj[n];
         break;
      }
    }
    return neighbor;
}
