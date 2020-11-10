const usernameInput = document.getElementById('name')
const emailInput = document.getElementById('mail')
const tShirtDesign = document.getElementById('design');
const tshirtColors = document.querySelector('.shirt-colors');
const shirtColor = document.getElementById('color')
const creditCardNumber = document.getElementById('cc-num')
const zipCode = document.getElementById('zip')
const cvv = document.getElementById('cvv')
const paymentInfo = document.querySelector('.paymentInfo')
const activities = document.querySelector('.activities')
const totalSpent = document.createElement('span')
totalSpent.textContent = ''
const paymentOption = document.getElementById('payment')
let individualOptions = document.getElementsByTagName('option')
const submitButton = document.getElementById('btnSubmit')
const jobRole = document.getElementById('title')
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const form = document.querySelector('form');
const bitcoin = document.getElementById('bitcoin');

let cost = 0
let costArray = [];
let workshopCheckboxes = [];

// Initial hiding elements
paypal.setAttribute('hidden', true);
bitcoin.setAttribute('hidden', true);
tShirtDesign[0].setAttribute('hidden', true);
tshirtColors.setAttribute('hidden', true);


// regex checker functions
function isValidUsername(username) {
    return /^[a-z]+$/.test(username)
}

function isValidEmail(email) {
    return /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/.test(email)
}

function isValidCreditCard(creditCardNumber) {
    return /^\d{13,16}$/.test(creditCardNumber)
}

function isValidZipcode(zipcode) {
    return /^\d{5}$/.test(zipcode)
}

function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv)
}

// showing error message
function showErrorMessage(parentNode, inputField, property, type) {
    const errorMessageElement = document.createElement('span')
    let errorText = ''
    switch (property) {
        case 'cc-num': errorText = 'invalid(13-16 digit)'
            break;
        case 'zip': errorText = 'invalid(5 digit)'
            break
        case 'cvv': errorText = 'invalid(3 digit)'
            break;
        case 'name': errorText = 'invalid(only letters)'
            break;
        case 'mail': errorText = 'invalid(should contain @)'
    }
    if (type == 'empty') {
        errorText = `cannot leave ${property} empty`
    }
    errorMessageElement.textContent = errorText
    errorMessageElement.id = `error-text-${property}`
    inputField.previousElementSibling.appendChild(errorMessageElement)
    inputField.previousElementSibling.setAttribute('style', 'display : inline')
    parentNode.insertBefore(errorMessageElement, inputField)
    return parent
}

// combined listner for different inputs
function createListener(validator, property) {
    return e => {
        const text = e.target.value;
        const inputField = document.getElementById(property)
        const parentOfInput = inputField.parentNode
        const valid = validator(text);
        const emptyText = text == ''
        const isInvalidText = ! emptyText && ! valid;

        emptyText || isInvalidText ? inputField.setAttribute('style', 'border-color : red') : inputField.setAttribute('style', 'background-color: ')
        const errorElement = document.getElementById(`error-text-${property}`)
        if (parentOfInput.contains(errorElement)) {
            parentOfInput.removeChild(errorElement)
        }
        if (isInvalidText) {
            showErrorMessage(parentOfInput, inputField, property, 'invalid');
        } else if (emptyText) {
            showErrorMessage(parentOfInput, inputField, property, 'empty');
        }
    };
}

function selectJobRole(e) {
    const fetchInputJobRole = document.getElementById('other-input-job')
    if (e.target.value === 'other') {
        fetchInputJobRole.removeAttribute('hidden');
    } else {
        fetchInputJobRole.setAttribute('hidden', true);
    }
}

function tShirtDesignListener() {
    let colorOptions = [];

    while (shirtColor.firstChild) {
        shirtColor.removeChild(shirtColor.lastChild);
    }

    for (let i = 0; i < 3; i++) {
        colorOptions[i] = document.createElement('option')
    }
    tShirtDesign.setAttribute('style', 'border-color : ')

    if (tShirtDesign.value == 'js puns') { // tshirt color dropdown options
        tshirtColors.removeAttribute('hidden');
        colorOptions[0].textContent = 'Cornflower Blue (JS Puns shirt only)'
        colorOptions[0].value = 'cornflowerblue'
        colorOptions[1].textContent = 'Dark Slate Grey (JS Puns shirt only)'
        colorOptions[1].value = 'darkslategrey'
        colorOptions[2].textContent = 'Gold (JS Puns shirt only)'
        colorOptions[2].value = 'gold'

    } else if (tShirtDesign.value == 'heart js') { // tshirt color dropdown options
        tshirtColors.removeAttribute('hidden');
        colorOptions[0].textContent = 'Tomato (I &#9829; JS shirt only)'
        colorOptions[0].value = 'tomato'
        colorOptions[1].textContent = 'Steel Blue (I &#9829; JS shirt only)'
        colorOptions[1].value = 'steelblue'
        colorOptions[2].textContent = 'Gold (JS Puns shirt only)'
        colorOptions[2].value = 'dimgrey'
    }
    for (let i = 0; i < 3; i++) {
        shirtColor.appendChild(colorOptions[i])
    }
}

function toggleWorkshopCheckbox(e, bool) {
    for (var i = 0; i < workshopCheckboxes.length; i++) {
        if (e.target != workshopCheckboxes[i] && e.target.getAttribute('data-day-and-time') == workshopCheckboxes[i].getAttribute('data-day-and-time')) {
            workshopCheckboxes[i].disabled = bool
        }
    }
}

function handleCheckbox(e) {
    totalSpent.setAttribute('style', 'color : ')
    if (e.target.checked) {
        cost = cost + parseInt(e.target.getAttribute('data-cost'))
        toggleWorkshopCheckbox(e, true)
    } else {
        toggleWorkshopCheckbox(e, false)
        cost = cost - parseInt(e.target.getAttribute('data-cost'))
    } totalSpent.textContent = cost > 0 ? `$${cost}` : ''
}

function showWorkshopError() {
    totalSpent.textContent = 'Please check at least one workshop'
    totalSpent.setAttribute('style', 'color : red')
}

function showFillupError(property) {
    document.getElementById(property).setAttribute('style', 'border-color : red')
}

function showSelectShirtError() {
    tShirtDesign.setAttribute('style', 'border-color : red')
}

function handlePaymentOptions() {
    const payment = document.createElement('div')

    switch (paymentOption.value) {
        case 'bitcoin': payment.id = 'bitcoin'
            bitcoin.removeAttribute('hidden');
            creditCard.setAttribute('hidden', true);
            paypal.setAttribute('hidden', true);
            break;
        case 'paypal': payment.id = 'paypal'
            paypal.removeAttribute('hidden');
            creditCard.setAttribute('hidden', true);
            bitcoin.setAttribute('hidden', true);
            break;
        case 'credit card': payment.id = 'credit-card'
            creditCard.removeAttribute('hidden');
            bitcoin.setAttribute('hidden', true);
            paypal.setAttribute('hidden', true);

            // Event listeners for credit card input fields
            document.getElementById('cc-num').addEventListener('change', createListener(isValidCreditCard, 'cc-num'))
            document.getElementById('zip').addEventListener('change', createListener(isValidZipcode, 'zip'))
            document.getElementById('cvv').addEventListener('change', createListener(isValidCvv, 'cvv'))
            break;
    }
}


activities.appendChild(totalSpent)
const childElements = activities.children

workshopCheckboxes = activities.getElementsByTagName('input');

// Event listners for workshop checkboxes
for (var i = 0; i < workshopCheckboxes.length; i++) {
    workshopCheckboxes[i].addEventListener('change', (e) => handleCheckbox(e))
}

function checkAllValues(e) {
    let creditcardValue = document.getElementById('cc-num').value
    let zipcodeValue = document.getElementById('zip').value
    let cvvValue = document.getElementById('cvv').value
    let userInputValidation = usernameInput.value !== '' && isValidUsername(usernameInput.value)
    let emailInputValidation = emailInput.value !== '' && isValidEmail(emailInput.value)
    let creditCardValidation = creditcardValue !== '' && isValidCreditCard(creditcardValue)
    let zipcodeValidation = zipcodeValue !== '' && isValidZipcode(zipcodeValue)
    let cvvValidation = cvvValue !== '' && isValidCvv(cvvValue)

    if (userInputValidation && emailInputValidation && creditCardValidation && zipcodeValidation && cvvValidation && cost > 0) {
        form.submit();
    } else {
        e.preventDefault()
        if (! userInputValidation) {
            showFillupError('name')
        }
        if (! emailInputValidation) {
            showFillupError('mail')
        }
        if (cost <= 0) {
            showWorkshopError()
        }
        console.log('actual', tShirtDesign.value)
        if (!(tShirtDesign.value == 'js puns' || tShirtDesign.value == 'heart js')) {
            showSelectShirtError()
        }
        if (paymentOption.value == 'credit card') {
            if (! creditCardValidation) {
                showFillupError('cc-num')
            }
            if (! zipcodeValidation) {
                showFillupError('zip')
            }
            if (! cvvValidation) {
                showFillupError('cvv')
            }
        }
    }
}
// User Input Event listeners
usernameInput.addEventListener('input', createListener(isValidUsername, 'name'));
emailInput.addEventListener('change', createListener(isValidEmail, 'mail'));
jobRole.addEventListener('change', (e) => selectJobRole(e))
tShirtDesign.addEventListener('change', () => tShirtDesignListener());
paymentOption.addEventListener('change', (e) => handlePaymentOptions(e))
form.addEventListener('submit', (e) => checkAllValues(e))
paymentOption.value = 'credit card'
handlePaymentOptions()
