/* 

Function for testing.

*/

// Special: Function to update the error display based on the input value
function checkCAPS() {
    var errorDiv = document.getElementById('errorCAPS');
    var correctDiv = document.getElementById('correctCAPS')
    var title = paperTitleInput.value;
    if (title === title.toUpperCase()) {
        errorDiv.classList.add('d-block');
        correctDiv.classList.remove('d-block');
        paperTitleInput.classList.add('is-invalid');
        NextBtnStatus(false);
    } else {
        errorDiv.classList.remove('d-block');
        correctDiv.classList.add('d-block');
        paperTitleInput.classList.remove('is-invalid');
        NextBtnStatus(true);
    }
}

function areAllCheckboxesChecked() {
    for (var i = 0; i < certifyCheckboxes.length; i++) {
        if (!certifyCheckboxes[i].checked) {
            return false; // If any checkbox is not checked, return false
        }
    }
    return true; // If all checkboxes are checked, return true
}

function isAnyRadioButtonSelected() {
    if (licenseRadios.length == 0) {
        return true;
    }
    for (var i = 0; i < licenseRadios.length; i++) {
        if (licenseRadios[i].checked) {
            return true; // If any radio button is selected, return true
        }
    }
    return false; // If no radio button is selected, return false
}

function isFileUploaded() {
    if (!fileInput) {
        return true;
    }
    if (fileInput.value) {
        return true;
    } else {
        return false;
    }
}

function isrequiredFilled(){
    if(!requiredInputs){
        return true;
    }
    for (var i = 0; i < requiredInputs.length; i++) {
        if (!requiredInputs[i].value) {
            return false; // If any required input is empty, return false
        }
    }
    return true; // If all required inputs are filled, return true
}

function isSelectorFilled(){
    if(!selectors){
        return true;
    }
    for (var i = 0; i < selectors.length; i++) {
        if (!selectors[i].value) {
            return false; // If any required input is empty, return false
        }
    }
    return true; // If all required inputs are filled, return true
}

// Special: Function to check if the author name contains any phd(.etc) words
function checkAuthors() {
    if(!authorInput){
        return true;
    }
    var errorSymbol = authorInput.nextElementSibling;
    var inputValue = authorInput.value;
    var prefix = ["Dr.", "Ph.D.", "PhD"];
    var hasWords = prefix.some(word => inputValue.includes(word));

    if (hasWords) {
        errorSymbol.classList.add('d-block'); // Show the error symbol if offending words are found
        return false;
    } else {
        errorSymbol.classList.remove('d-block'); // Hide the error symbol if no offending words are found
        return true;
    }
}

// Function to update the "Continue" button status
function updateButtonStatus() {
    var allChecked = areAllCheckboxesChecked();
    var anySelected = isAnyRadioButtonSelected();
    var anyFile = isFileUploaded();
    var requiredFilled = isrequiredFilled();
    var authorValid = checkAuthors();
    var selectorValid= isSelectorFilled();
    if (anySelected && allChecked && anyFile && requiredFilled && authorValid && selectorValid) {
        NextBtnStatus(true);
    } else {
        NextBtnStatus(false);
    }
}

// Change the button status.
function NextBtnStatus(ValidityState) {
    // var nextBtn = document.getElementById('nextBtn');
    if (ValidityState) {
        nextBtn.classList.remove('disabled');
        nextBtn.setAttribute('aria-disabled', 'false');
    } else {
        nextBtn.classList.add('disabled');
        nextBtn.setAttribute('aria-disabled', 'true');
    }
}

/*

    Validation Function for each page.

*/

function startValidation() {
    console.log("nextBtn Test: " + nextBtn);
    return;   
}

function contactInformationValidation() {
    console.log("nextBtn Test: " + nextBtn);
    return;
}

function termsConditionsValidation() {
    return;
}

function licensingValidation() {
    return;
}

function addFilesValidation() {
    return;
}

function pdfPreviewValidation() {
    return;
}

function htmlPreviewValidation() {
    return;
}

function metadataValidation() {
    return;
}

function categoryValidation() {
    return;
}

function finalizeSubmissionValidation() {
    return;
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the page title.]
    const nextBtn = document.getElementById('nextBtn');
    const page = document.head.querySelector('title');
    console.log("Load testing:" + page.innerHTML);

    // Title need to follow name in app.py! html title!
    /*
    'page1': 'start',
    'page2': 'contactInformation',
    'page3': 'termsConditions',
    'page4': 'licensing',
    'page5': 'addFiles',
    'page6': 'processing',
    'page7': 'pdfPreview',
    'page8': 'htmlPreview',
    'page9': 'metadata',
    'page10': 'category',
    'page11': 'review',
    'page12': 'finalizeSubmission',
    */
    switch (page.innerHTML) {
        case "processing" || "review":
            NextBtnStatus(true);
            break;
        case "start":
            startValidation();
            break;
        case "contactInformation":
            contactInformationValidation();
            break;
        case "termsConditions":
            termsConditionsValidation();
            break;
        case "licensing":
            licensingValidation();
            break;
        case "addFiles":
            addFilesValidation();
            break;
        case "pdfPreview":
            pdfPreviewValidation();
            break;
        case "htmlPreview":
            htmlPreviewValidation();
            break;
        case "metadata":
            metadataValidation();
            break;
        case "category":
            categoryValidation();
            break;
        case "finalizeSubmission":
            finalizeSubmissionValidation();
            break;
        default:
            console.log("Error: page not found!");
    }

    var paperTitleInput = document.getElementById('input_title');
    var certifyCheckboxes = document.querySelectorAll('.certify');
    var licenseRadios = document.querySelectorAll('.license-radio');
    var fileInput = document.getElementById('formFile');
    
    var authorInput = document.getElementById('author');
    var requiredInputs = document.querySelectorAll('.required');
    var selectors = document.querySelectorAll('.selector');

    // Add event listener to the input field to check for changes
    if (paperTitleInput) {
        paperTitleInput.addEventListener('input', checkCAPS);
    }
    // Add event listener to each checkbox to check for changes
    if (certifyCheckboxes) {
        certifyCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateButtonStatus);
        });
    }
    if (licenseRadios) {
        // Add event listener to each radio button to check for changes
        licenseRadios.forEach(radio => {
            radio.addEventListener('change', updateButtonStatus);
        });
    }
    if (fileInput) {
        fileInput.addEventListener('change', updateButtonStatus);
    }
    if (authorInput) {
        authorInput.addEventListener('change', checkAuthors);
    }
    if(requiredInputs){
        requiredInputs.forEach(input => {
            input.addEventListener('change', updateButtonStatus);
        });
    }
    if(selectors){
        selectors.forEach(selector => {
            selector.addEventListener('change', updateButtonStatus);
        });
    }
});