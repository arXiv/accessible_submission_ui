/**
 * 
 * 
 * 
 */

function isrequiredFilled() {
    if (!requiredInputs) {
        return true;
    }
    for (var i = 0; i < requiredInputs.length; i++) {
        if (!requiredInputs[i].value) {
            return false; // If any required input is empty, return false
        }
    }
    return true; // If all required inputs are filled, return true
}

/* 

Validation Functions.

*/

// Special: Function to check if the author name contains any phd(.etc) words
function checkAuthors() {
    if (!authorInput) {
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
    var selectorValid = isSelectorFilled();
    if (anySelected && allChecked && anyFile && requiredFilled && authorValid && selectorValid) {
        NextBtnStatus(true);
    } else {
        NextBtnStatus(false);
    }
}

// General: Function to check if all checkboxes are checked
function areAllCheckboxesChecked(certifyCheckboxes) {
    for (var i = 0; i < certifyCheckboxes.length; i++) {
        if (!certifyCheckboxes[i].checked) {
            return false; // If any checkbox is not checked, return false
        }
    }
    return true; // If all checkboxes are checked, return true
}

// Change the button status.
function NextBtnStatus(ValidityState) {
    //var nextBtn = document.getElementById('nextBtn');
    if (ValidityState) {
        nextBtn.classList.remove('disabled');
        nextBtn.setAttribute('aria-disabled', 'false');
    } else {
        nextBtn.classList.add('disabled');
        nextBtn.setAttribute('aria-disabled', 'true');
    }
}

// Special: Detect Start Page Title.
function checkStartPageTitles(paperTitleInput) {
    var title = paperTitleInput.value;
    const errorMsg = document.getElementById('errorMsg');
    const correctMsg = document.getElementById('correctMsg');
    //general
    if(checkGeneralInput(title)){
        if (!title.startsWith("Title")){
            NextBtnStatus(true);
            errorMsg.classList.remove('d-block');
            correctMsg.classList.add('d-block');

        }
        else{
            NextBtnStatus(false);
            errorMsg.classList.add('d-block');
            correctMsg.classList.remove('d-block');
        }
    }
    else{
        NextBtnStatus(false);
        errorMsg.classList.add('d-block');
        correctMsg.classList.remove('d-block');
    }
}

// General: check general input.
// 1. Cannot All casps.
// 2. No unresolved brackets/parenthesis.
// 3. No extra spaces inside of brackets/parenthesis. (Just Warning)
//    3a. add warning html elemnt for every input.(Later!) 
function checkCAPS(input) {
    const uppercaseRegex = /^[^a-z]*[A-Z]+[^a-z]*$/;
    return !uppercaseRegex.test(input);
}

//check unresolved brackets/parenthesis.
function checkunsolvedbrackets(input) {
    const bracketStack = [];
    const unresolvedBrackets = [];
    for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        if (char === '(' || char === '[') {
            bracketStack.push({
                char,
                index: i
            });
        } else if (char === ')' || char === ']') {
            if (bracketStack.length === 0) {
                unresolvedBrackets.push({
                    char,
                    index: i
                });
            } else {
                bracketStack.pop();
            }
        }
    }
    bracketStack.forEach((unresolvedBracket) => {
        unresolvedBrackets.push(unresolvedBracket);
    });

    return unresolvedBrackets.length === 0;
}

//check extra spaces inside of brackets/parenthesis.
function checkExtraSpaces(input) {
    const pattern = /\([\s]+|\[\s+|\s+\)|\s+\]/g;
    const matches = input.match(pattern);
    if (matches) {
        for (const match of matches) {
        if (match.trim().length === 0) {
            return false;
        }
        }
    }
    return true;
}

//check general input.
function checkGeneralInput(input) {
    const capsValid = checkCAPS(input);
    const unsolvedValid = checkunsolvedbrackets(input);
    const extraSpacesValid = checkExtraSpaces(input);
    /*console.log("capsValid: " + capsValid);
    console.log("unsolvedValid: " + unsolvedValid);
    console.log("extraSpacesValid: " + extraSpacesValid);*/
    const errorExtraSpace = document.getElementById('errorExtraSpace');
    if(extraSpacesValid){
        //error Msg
        //console.log("extraSpacesValid: " + extraSpacesValid);
        errorExtraSpace.classList.remove('d-block');
    }
    else{
        //warning Msg
        //console.log("extraSpacesValid: " + extraSpacesValid);
        errorExtraSpace.classList.add('d-block');
    }
    if (capsValid && unsolvedValid) {
        return true;
    } else {
        //show the error message.
        return false;
    }
}

// General: Function to check if any radio button is selected
function isAnyRadioButtonSelected(licenseRadio) {
    if (licenseRadio.checked) {
        return true; // If any radio button is selected, return true
    }
    return false; // If no radio button is selected, return false
}

// General: Function to check if a file is uploaded
function isFileUploaded(fileInput) {
    if (fileInput.value) {
        return true;
    } else {
        return false;
    }
}

// General: Function to check if a selector is filled
function isSelectorFilled(selectors) {
    for (var i = 0; i < selectors.length; i++) {
        if (!selectors[i].value) {
            return false; // If any required input is empty, return false
        }
    }
    return true; // If all required inputs are filled, return true
}

/*

    Validation Function for each page.

*/

function startValidation() {
    const paperTitleInput = document.getElementById('input_title');
    // var paperTitleInputStatus = false;
    if (paperTitleInput) {
        //console.log("find input_title");
        paperTitleInput.addEventListener('input', function () {
            checkStartPageTitles(paperTitleInput); // Pass paperTitleInput as an argument
        });
    }
}

function contactInformationValidation() {
    const certifyCheckboxes = document.querySelectorAll('.certify');
    certifyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (areAllCheckboxesChecked(certifyCheckboxes)) {
                NextBtnStatus(true);
            } else {
                NextBtnStatus(false);
            }
        });
    });
}

function termsConditionsValidation() {
    const certifyCheckboxes = document.querySelectorAll('.certify');
    certifyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (areAllCheckboxesChecked(certifyCheckboxes)) {
                NextBtnStatus(true);
            } else {
                NextBtnStatus(false);
            }
        });
    });
}

function licensingValidation() {
    const licenseRadios = document.querySelectorAll('.license-radio');
    licenseRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (isAnyRadioButtonSelected(radio)) {
                NextBtnStatus(true);
            } else {
                NextBtnStatus(false);
            }
        });
    });

}

function addFilesValidation() {
    const fileInput = document.getElementById('formFile');
    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (isFileUploaded(fileInput)) {
                NextBtnStatus(true);
            } else {
                NextBtnStatus(false);
            }
        });
    }
    return;
}

function pdfPreviewValidation() {
    const certifyCheckboxes = document.querySelectorAll('.certify');
    certifyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (areAllCheckboxesChecked(certifyCheckboxes)) {
                NextBtnStatus(true);
            } else {
                NextBtnStatus(false);
            }
        });
    });
}

function htmlPreviewValidation() {
    const certifyCheckboxes = document.querySelectorAll('.certify');
    certifyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (areAllCheckboxesChecked(certifyCheckboxes)) {
                NextBtnStatus(true);
            } else {
                NextBtnStatus(false);
            }
        });
    });
}

function metadataValidation() {
    return;
}

// Need special id for html element. Not Completed.
function categoryValidation() {
    const selectors = document.querySelectorAll('.selector');
    selectors.forEach(selector => {
        selector.addEventListener('change', function () {
            if (isSelectorFilled(selectors)) {
                NextBtnStatus(true);
            } else {
                NextBtnStatus(false);
            }
        });
    });
}

function finalizeSubmissionValidation() {
    const certifyCheckboxes = document.querySelectorAll('.certify');
    certifyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (areAllCheckboxesChecked(certifyCheckboxes)) {
                NextBtnStatus(true);
            } else {
                NextBtnStatus(false);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the page title.]
    const nextBtn = document.getElementById('nextBtn');
    const page = document.head.querySelector('title');

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
        case "processing":
            NextBtnStatus(true);
            break;
        case "review":
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
});