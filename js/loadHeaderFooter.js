
/*Header Footer load*/
$(document).ready(function() {
    $("#header").load("/html/header.html");
    $("#footer").load("/html/footer.html");
    $("#search").load("/html/findNeighbor.html");
    /*drop-dwon toogle */
    $(document).on('click','#down',function(){
      $(this).find("#down-content").toggle();
    });
    /*drop down- sidebar open close*/
    function lfOpen() {
        $("#down-content").style.display = "block";
    }
    function lfClose() {
        $("#down-content").style.display = "none";
    }
});
