$(document).ready(function() {
  $(".confirm_delete").click( function(e){
    e.preventDefault();
    
    var targetUrl = $(this).attr("href");
    var paperid = $(this).attr("id");

    $("#dialog").dialog({
      autoOpen: false,
      modal: true,
      buttons : {
        "Confirm" : function() {
          window.location.href = targetUrl;
        },
        "Cancel" : function() {
          $(this).dialog("close");
        }
      }
    });

    $("#dialog").html("Are you sure you want to delete submission " + paperid + "?");
    $("#dialog").dialog("open");

  });
});