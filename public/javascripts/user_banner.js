function setCookie(){   
    var delay_days = 1;
    var date = new Date();
    date.setTime(date.getTime()+(delay_days*3600*24*1000));
    var expires = "; expires="+date.toGMTString();    
    document.cookie = 'seenUserBanner=1' + expires + '; path=/; domain=' + window.location.hostname + ';';
}

function hasCookie(){
    return document.cookie.indexOf('seenUserBanner=') != -1;
}

$(document).ready(function(){
    if( hasCookie() ){
        $('.user-banner').hide();
    }    
    
    $( '.close-user-banner' ).click(function(e) {        
        e.preventDefault();
        $('.user-banner').fadeOut( 400 );
        setCookie();
    });
    
})


// $(document).ready(
//     function() {

//       $(".close-slider").click(function() {
//         $("#cu-identity, #header").slideDown();
//         $(".slider-wrapper").slideUp();
//         setCookie();       
//       });

//       $("a.banner_link").click(function() {
//         setCookie();
//       });

//       $(function() {        
//         if( !hasCookie() ) {  
//             $(".slider-wrapper").delay(1000).slideDown();
// //          $("#cu-identity, #header").delay(1000).slideUp();
//         }
//       });

//     });
