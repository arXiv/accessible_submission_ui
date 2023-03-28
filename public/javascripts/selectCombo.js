/**
 *   
 * @example  $('#myselect').selectCombo('myurltoprocess.lasso?additionalparamtoserverifnecessary=myparam', '#mytargetselect', {hidetarget: false});
 * 
 * Option: hidetarget - Allows you to override the default hide behavior if set to false.  Default true will hide your target select and its label until an option from your source select is selected.  Use this if your target select is not empty when the page loads and its values correspond to your default selected of your source select.
 *
 * Parameter sent to server is q
 *
 * Expected server response is JSON in this format: [{oV: 'myfirstvalue', oT: 'myfirsttext'}, {oV: 'mysecondvalue', oT: 'mysecondtext'}]
 *
 */
(function($){

$.fn.selectCombo = function(url, target, settings){
   var defaults = {hidetarget: true, indicator: false, pageload: false};
   $.extend(defaults, settings);
   return this.each(function(){
      var qobj = this;

      if(defaults.indicator != false)
         $(defaults.indicator).hide();
         
      settargetlabel	= function(target){
         var targetlabel = target.replace(/#/, '');
         targetlabel = "label[for='" + targetlabel + "']";
         return targetlabel;
      }
      
      hidetargetinfo = function(qobj, target){
         if(qobj.id != $(target).attr('id')){
            var targetlabel = settargetlabel(target);
            $(targetlabel).hide();
            $(target).hide().html('').change();
         }
      }
      if(defaults.hidetarget && ($(target).val() == '' || $(target).val() == null)){
         hidetargetinfo(qobj, target);
         $(target).html('').val('').change();
      }
      loadOptions = function(){
         qval = $(qobj).val();
         if(defaults.indicator != false)
            $(defaults.indicator).show();
         if($(qobj).attr('id') != $(target).attr('id'))
            $(target).empty();
         $.getJSON(url, {q: qval}, function(j){
            var setoptions = '';
            if(j.length > 0 && qval != ''){
               //console.log('should only be here if qval not blank');
               for (var i = 0; i < j.length; i++) 
                  setoptions += '<option value="' + j[i].oV + '">' + j[i].oT + '</option>';
               $(target).html(setoptions);
               $("option:first", target).attr("selected","selected");
               var targetlabel = settargetlabel(target);
               $(targetlabel).show();
               $(target).show();
            }
            else {
               //console.log('from ' + qobj.id + ' hide info on target ' + target);
               if(defaults.hidetarget)
                  hidetargetinfo(qobj, target);
               else{
                  $(target).html('').change();
               }
            }
            if(defaults.indicator != false)
               $(defaults.indicator).hide();
         });//end JSON
      }

      $(this).change(loadOptions);//end change fn

      if(defaults.pageload && $(qobj).val() != ''){
         loadOptions();
      }

   });//end return for each
}
})(jQuery);
