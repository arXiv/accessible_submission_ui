// Line break is not allowed it title.
// The server side controller collapses them to single spaces.
//
// There still seem to be instances of user copying their
// title from the PDF and then introducing typos when trying
// to delete the line breaks.
//
// This strips line breaks on the initall paste of the title
// to avoid having the user inproperly edit a line break.
// This is intended to have no effect any other time.

// This will not work on IE<11

window.addEventListener("DOMContentLoaded", function(){
    $('#metainputtitle').on('paste', function(event){
        let currentTxt = $(event.target).val() 
        if( currentTxt && currentTxt.trim().length > 0){
            return; // Only strip on paste to empty textarea
        }
        let cbdata = (event.clipboardData ||
            (event.originalEvent && event.originalEvent.clipboardData) ||
            window.clipboardData)
        let paste = cbdata.getData('text');
        paste = paste.replace(/(\r\n|\n|\r)/gm," "); // line break to space
        paste = paste.replace(/\s+/g," "); // replace double spaces

        $(event.target).val( paste );
        event.preventDefault();
    });
});
