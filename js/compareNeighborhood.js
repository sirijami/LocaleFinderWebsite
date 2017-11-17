//Back button functionality at Compare Page//
function goBack() {
window.history.back();
}

$(function(){
  var imageMapping ={'University District':'../image/ud.jpg',
    'Queen Anne':           '../image/queenanne.jpg',
    'South Lake Union':     '../image/slu.jpg',
    'Ballard':              '../image/ballard.jpg',
    'Fremont':              '../image/fremont.jpg',
    'Downtown':             '../image/downtown.jpg',
    'Capitol Hill':         '../image/capitolhill.jpg',
    'NorthGate':            '../image/northgate.jpg',
    'Alki':                 '../image/alki.jpg'};
    $("#leftInput").change(function(){
      console.log($(this).val());
      var leftInput = $(this).val();
      $("#leftImg").attr('src',imageMapping[leftInput]);
    });
    $("#rightInput").change(function(){
      console.log($(this).val());
      var rightInput = $(this).val();
      $("#rightImg").attr('src',imageMapping[rightInput]);
    });
    //direct from neighbourhood page
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
       $("#leftInput").val(name);
    }
});
