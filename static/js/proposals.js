$(document).ready(function() {
  $("select[name=primary_proposal].chosen-select").chosen({
    no_results_text : "No matching categories",
    single_backstroke_delete : "true",
    display_selected_options : "true",
    placeholder_text_multiple : "Propose primaries..."
  });

  $("select[name=secondary_proposal].chosen-select").chosen({
    no_results_text : "No matching categories",
    single_backstroke_delete : "true",
    display_selected_options : "true",
    placeholder_text_multiple : "Propose secondaries..."
  });

  $("select[name=rtp_secondary_proposal].chosen-select").chosen({
    no_results_text : "No matching categories",
    single_backstroke_delete : "true",
    display_selected_options : "true",
    placeholder_text_multiple : "Accept secondaries...",
    width : "95%"
  });

  // clear other checkboxes for proposal when one is clicked.
  $(".prop-row input").click(function(e) {
    $(this).parent().siblings().find("input").attr('checked', false);
  });
   
  // only one primary proposal
  $(".primary-checkbox").click(function(e) {
    var id = $(this).attr('id');
    $(".primary-checkbox").each(function(checkbox) {
      if (this.id !== id) {
        $(this).attr('checked', false);
      }
    });
  });

  // Primary proposals almost always should put the submission on hold
  // Set put_on_hold when a primary is proposed
  // but should then follow the admin's wishes.
  $("select[name=primary_proposal].chosen-select").on('change', function() {
    var $hold =  $("input[name=put_on_hold]");
    if( $hold.attr('disabled') ){ return; }
    if( ! $hold.attr('user-selected') ){
       var $val = $("select[name=primary_proposal]").chosen().val();
       var $anyselected = $val && $val.length > 0;
       $hold.prop('checked', $anyselected);
    }
  });

  //Did the user click this?
  $("input[name=put_on_hold]").on('click', function(){
    $("input[name=put_on_hold]").attr('user-selected','1');
  });
   
});

$(function() {
    var min_comment_length = 5;
    var create_new_dialog, create_new_form;

    var enableButtonForProposals = function( params ) {
        var num_selected = $('.search-choice').size() - (params.deselected ? 1 : 0);

        if (num_selected == 0) {
            $(".ui-dialog-buttonpane button:contains('Make Proposal')")
                .button("disable");
        } else if (num_selected >= 1) {
            if ($("textarea#comment").val().length >= min_comment_length) {
                $(".ui-dialog-buttonpane button:contains('Make Proposal')")
                    .button("enable");
            } else {
                $(".ui-dialog-buttonpane button:contains('Make Proposal')")
                    .button("disable");
            }
        }
    };
    
    var enforcePrimaryProposals = function( params ){
        if( params.deselected ){
            var cat = params.deselected;
            //find in secondary chosen, and maybe enable
            var ele = $("select#secondary_proposal option[value='" + cat + "']");
            if( ele.prop('primary_disabled') ){
                ele.removeProp('primary_disabled');
                ele.removeProp('disabled',0);
            }
        }        
        if( params.selected ){
            var cat = params.selected;
            // unselected and disable in secondary chosen
            $("#secondary_proposal_chosen > ul > li.search-choice:contains('"+ cat +"') > a").click()            
            $("select#secondary_proposal option[value='" + cat + "']").prop('disabled','disabled');
            $("select#secondary_proposal option[value='" + cat + "']").prop('primary_disabled',true);
        }        
        $("#secondary_proposal").trigger("chosen:updated"); //update secondary chosen for any changes
    };
    
    create_new_dialog = $("#new-proposal-dialog-form")
      .dialog(
          {
            autoOpen : false,
            height : 'auto',
            width : 400,
            modal : true,
            buttons : [
                { text : "Make Proposal",
                  id : "make-proposal-save",
                  click : function() {
                      $(this).find("form").submit();
                      $(this).dialog("close");
                  },
                  disabled : true,
                  tabindex: 7,
                },
                { text : "Cancel",
                  click : function() { $(this).dialog("close"); },
                  tabindex: 8,
                }
            ],

            open : function() {                
                $("textarea#comment").keyup(
                    function(e) { enableButtonForProposals(0); });
                
                $("#primary_proposal.chosen-select").on("change",function(evt,params){
                    enableButtonForProposals(params );
                    enforcePrimaryProposals( params ); });
                
                $("#secondary_proposal.chosen-select").on("change",function(evt,params){
                    enableButtonForProposals(params ); });

                $("input[name=put_on_hold]").removeAttr('user-selected');
            },
             
            close : function() {
              create_new_form[0].reset();
              $(".chosen-select").val('').trigger('chosen:updated');
            }
          });

  create_new_form = create_new_dialog.find("form").on("submit",
      function(event) {} );

  $("#create-new-proposals").on("click", function() {
    create_new_dialog.dialog("open");
  });
    

  var respond_to_mockup;
    respond_to_mockup = $("#respond-to-proposal-mockup")
        .dialog(
            {
                autoOpen : false,
                height : 'auto',
                width : 900,
                modal : true,
                buttons : [
                    {   text : "Respond",
                        id : "respond-proposal-save",
                        click: function(){
                            $(this).find( "form" ).submit();
                            $(this).dialog("close");
                        },
                        disabled : true
                    },
                    {   text : "Cancel",
                        click : function() { $(this).dialog("close"); }
                    }
                ],                
                open : function() {
                    var checkValidProposalResp = function(){
                        var numChecked = $(".prop-row input:checkbox:checked").length;
                        if ( numChecked > 0 ) {
                            $("button#respond-proposal-save").button("enable");
                        } else {
                            $("button#respond-proposal-save").button("disable");
                        }
                    };

                    $("textarea#comment").keyup( checkValidProposalResp );
                    $(".prop-row input:checkbox").change( checkValidProposalResp );
                },
                
                close : function() { }
            });

    $("#respond-to-proposals").on("click", function() {
        respond_to_mockup.dialog("open");
    });

});
