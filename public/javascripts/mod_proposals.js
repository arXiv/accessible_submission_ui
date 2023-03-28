$(document).ready(function() {

  $("select[name=primary_proposal].chosen-select").chosen({
    no_results_text : "No matching categories",
    single_backstroke_delete : "true",
    display_selected_options : "true",
    search_contains : "true",
    placeholder_text_multiple : "Search category"
  });

  $("select[name=secondary_proposal].chosen-select").chosen({
    no_results_text : "No matching categories",
    single_backstroke_delete : "true",
    display_selected_options : "true",
    search_contains : "true",
    placeholder_text_multiple : "Search category"
  });

});

$(function() {

  var reject_dialog, reject_form;
  reject_dialog = $("#reject-dialog-form").dialog(
      {
        autoOpen : false,
        height : 'auto',
        width : 400,
        modal : true,
        resizable : false,
        buttons : [
          {
          text : "Submit",
          id : "reject-category-button",
          click : function() {
              $(this).find("form").submit();
              $(this).dialog("close");
            },
          },
          {
          text : "Cancel",
          click : function() {
              $(this).dialog("close");
            }
          } ],

        open : function() {
            $(".chosen-select").val('').trigger('chosen:updated');
            $("#reject-reject").prop('checked',true);//ARXIVDEV-3576
        },

        close : function() {
          reject_form[0].reset();   
        }
      });

  reject_form = reject_dialog.find("form").on("submit", function(event) {
  });

  $(".reject-cat-primary").on(
      "click",
      function() {

        var cat = $(this).attr("value");
        $("#reject-form input[type='hidden']").remove();
        $("<input>").attr({
          type : "hidden",
          id : "reject_cat",
          name : "reject_cat",
          value : cat
        }).appendTo("#reject-form");
        $("<input>").attr({
          type : "hidden",
          id : "is_primary",
          name : "is_primary",
          value : 1
        }).appendTo("#reject-form");

        $("#cat-to-reject").html(
            "primary category <b>" + $(this).attr("value") + "</b>");
        $("#reject-accept-secondary").attr("disabled", false);
        reject_dialog.dialog({
          title : "Reject Submission's Primary Category"
        }).dialog("open");
      });

  $(".reject-cat").on("click", function() {
    var cat = $(this).attr("value");
    $("#reject-form input[type='hidden']").remove();
    $("<input>").attr({
      type : "hidden",
      id : "reject_cat",
      name : "reject_cat",
      value : cat
    }).appendTo("#reject-form");
    $("<input>").attr({
      type : "hidden",
      id : "is_primary",
      name : "is_primary",
      value : 0
    }).appendTo("#reject-form");
    $("#cat-to-reject").html($(this).attr("value"));
    $("#reject-accept-secondary").attr("disabled", true);
//    $("#reject-radio").buttonset("refresh");
    reject_dialog.dialog({
      title : "Reject Submission's Secondary Category"
    }).dialog("open");
  });

  // Creating new proposals
  var propose_dialog, propose_form;
  propose_dialog = $("#propose-dialog-form").dialog(
      {
        autoOpen : false,
        height : 'auto',
        width : 400,
        modal : true,
        buttons : [ {
          text : "Make Proposal",
          id : "make-proposal-save",
          click : function() {
            $(this).find("form").submit();
            $(this).dialog("close");
          },
          disabled : true
        }, {
          text : "Cancel",
          click : function() {
            $(this).dialog("close");
          }
        } ],

        open : function() {
          $("textarea#comment").keyup(function(e) {
            enableButtonForProposals(0);
          });

          $("#primary_proposal.chosen-select").on("change",
              function(evt, params) {
                enableButtonForProposals(params);
                enforcePrimaryProposals(params);
              });

          $("#secondary_proposal.chosen-select").on("change",
              function(evt, params) {
                enableButtonForProposals(params);
              });
        },

        close : function() {
          propose_form[0].reset();
          $(".chosen-select").val('').trigger('chosen:updated');
        }
      });

  propose_form = propose_dialog.find("form").on("submit", function(event) {
  });

  $("#create-new-proposals").on("click", function() {
    propose_dialog.dialog("open");
  });

  var min_comment_length = 0;
  var enableButtonForProposals = function(params) {
    var num_selected = $('.search-choice').size() - (params.deselected ? 1 : 0);

    if (num_selected == 0) {
      $(".ui-dialog-buttonpane button:contains('Make Proposal')").button(
          "disable");
    } else if (num_selected >= 1) {
      if ($("textarea#comment").val().length >= min_comment_length) {
        $(".ui-dialog-buttonpane button:contains('Make Proposal')").button(
            "enable");
      } else {
        $(".ui-dialog-buttonpane button:contains('Make Proposal')").button(
            "disable");
      }
    }
  };

  var enforcePrimaryProposals = function(params) {
    if (params.deselected) {
      var cat = params.deselected;
      // find in secondary chosen, and maybe enable
      var ele = $("select#secondary_proposal option[value='" + cat + "']");
      if (ele.prop('primary_disabled')) {
        ele.removeProp('primary_disabled');
        ele.removeProp('disabled', 0);
      }
    }
    if (params.selected) {
      var cat = params.selected;
      // unselected and disable in secondary chosen
      $(
          "#secondary_proposal_chosen > ul > li.search-choice:contains('" + cat
              + "') > a").click()
      $("select#secondary_proposal option[value='" + cat + "']").prop(
          'disabled', 'disabled');
      $("select#secondary_proposal option[value='" + cat + "']").prop(
          'primary_disabled', true);
    }
    $("#secondary_proposal").trigger("chosen:updated"); // update secondary
    // chosen for any
    // changes
  };

  $("[name='respond-radio']").click(function() {
    $(".ui-dialog-buttonpane button:contains('Submit')").button("enable");
  });

  // Responses to proposals (not submission categories)
  var respond_dialog, respond_form;
  respond_dialog = $("#respond-dialog-form").dialog(
      {
        autoOpen : false,
        height : 'auto',
        width : 400,
        modal : true,
        buttons : [ {
          text : "Submit",
          id : "respond-category-button",
          click : function() {
            $(this).find("form").submit();
            $(this).dialog("close");
          },
          disabled : true
        }, {
          text : "Cancel",
          click : function() {
            $(this).dialog("close");
          }
        } ],

        open : function() {
          $("textarea#comment").keyup(function(e) {
            // enableButtonForProposals(0);
          });

          // $("#proposal.chosen-select").on("change",function(evt,params){
          // enableButtonForProposals(params );
          // enforcePrimaryProposals( params ); });
        },

        close : function() {
          respond_form[0].reset();
          $("#respond-radio input").prop('checked',false).prop('checkstate',false);
          $("#respond-category-button").button("disable");
          $(".chosen-select").val('').trigger('chosen:updated');
        }
      });

  respond_form = respond_dialog.find("form").on("submit", function(event) {
  });

  $(".respond-cat-primary").on("click",function() {
        var cat = $(this).attr("value");
        $("#respond-form input[type='hidden']").remove();
        $("<input>").attr({
          type : "hidden",
          id : "respond_cat",
          name : "respond_cat",
          value : cat
        }).appendTo("#respond-form");
        $("<input>").attr({
          type : "hidden",
          id : "is_primary",
          name : "is_primary",
          value : 1
        }).appendTo("#respond-form");

        $("#cat-to-respond").html(
            "<b>" + $(this).attr("value") + "</b> as primary");

     $("label[for='respond-accept-secondary']").show()
           
 
     $("#respond-accept-secondary").attr("disabled", false);
//      $("#respond-radio").buttonset("refresh");
      
        respond_dialog.dialog({
          title : "Respond to Primary Category Proposal"
        }).dialog("open");
      });

  $(".respond-cat").on("click", function() {
    var cat = $(this).attr("value");
    $("#respond-form input[type='hidden']").remove();
    $("<input>").attr({
      type : "hidden",
      id : "respond_cat",
      name : "respond_cat",
      value : cat
    }).appendTo("#respond-form");
    $("<input>").attr({
      type : "hidden",
      id : "is_primary",
      name : "is_primary",
      value : 0
    }).appendTo("#respond-form");
      
      $("#cat-to-respond").html($(this).attr("value") + " as secondary");
      $("label[for='respond-accept-secondary']").hide()
      
      $("#respond-accept-secondary").attr("disabled", true);      
//      $("#respond-radio").buttonset("refresh");
      
    respond_dialog.dialog({
      title : "Respond to Secondary Category Proposal"
    }).dialog("open");
  });

});
