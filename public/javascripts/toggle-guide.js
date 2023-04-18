// toggle author guide
$(document).ready(function() {
 // uses js.cookie.min.js
  var authorGuideCookie = Cookies.getJSON("arxiv_author_guide");
  if (authorGuideCookie) {
    if ( authorGuideCookie["minimize"] == "true" ){
      $("#guide_element").toggleClass("minimize", true);
    }
  } else {
    Cookies.set("arxiv_author_guide", {minimize: "false"}, { sameSite: "strict"});
    $("#guide_element").toggleClass("minimize", false);
  }

  $(".minimize-guide").on("click", function() {
    if ( $("#guide_element").hasClass("minimize") ) {
      Cookies.set("arxiv_author_guide", {minimize: "true"}, { sameSite: "strict", minimize: "true" });
      console.log("set arxiv_author_guide to minimize");
    }

    else {
      Cookies.set("arxiv_author_guide", {minimize: "false"}, { sameSite: "strict", minimize: "false" });
      console.log("set arxiv_author_guide to maximize");
    }
  });
});
