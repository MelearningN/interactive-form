const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const tShirtDesign = document.getElementById('design')
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

activities.appendChild(totalSpent)
const childElements = activities.children

let cost = 0
let costArray = [];
let workshopCheckboxes = [];
workshopCheckboxes = activities.getElementsByTagName('input');

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

function showErrorMessage(parentNode, inputField, property, type) {
    const errorMessageElement = document.createElement('span')
    type == 'empty' ? errorMessageElement.textContent = `cannot leave ${property} empty` : errorMessageElement.textContent = `invalid ${property}`
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
    const inputJob = document.createElement('input')
    inputJob.id = 'input-job'
    const fetchInputJobRole = document.getElementById('input-job')
    if (e.target.value == 'other') {
        inputJob.setAttribute('placeholder', 'Your job role')
        inputJob.setAttribute('style', 'display : block')
        jobRole.parentNode.appendChild(inputJob)
    } else if (jobRole.parentNode.contains(fetchInputJobRole)) 
        jobRole.parentNode.removeChild(fetchInputJobRole)

    

}

function tShirtDesignListener() {
    const shirtColor = document.getElementById('color')
    let colorOptions = [];

    while (shirtColor.firstChild) {
        shirtColor.removeChild(shirtColor.lastChild);
    }

    if (tShirtDesign.value == 'Select Theme') {
        const selectThemeOption = document.createElement('option')
        selectThemeOption.textContent = 'Please select a T-shirt theme'
        shirtColor.appendChild(selectThemeOption)
        shirtColor.setAttribute('disabled', '')
    } else {
        shirtColor.removeAttribute('disabled')
        for (let i = 0; i < 3; i++) {
            colorOptions[i] = document.createElement('option')
        }

        if (tShirtDesign.value == 'js puns') { // tshirt color dropdown options
            colorOptions[0].textContent = 'Cornflower Blue (JS Puns shirt only)'
            colorOptions[0].value = 'cornflowerblue'
            colorOptions[1].textContent = 'Dark Slate Grey (JS Puns shirt only)'
            colorOptions[1].value = 'darkslategrey'
            colorOptions[2].textContent = 'Gold (JS Puns shirt only)'
            colorOptions[2].value = 'gold'

        } else if (tShirtDesign.value == 'heart js') { // tshirt color dropdown options
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

function showWorkshopError() { // const activities = document.querySelector('.activities')

    totalSpent.textContent = 'Please check at least one workshop'
    totalSpent.setAttribute('style', 'color : red')
}
function showFillupError(property) {
    document.getElementById(property).setAttribute('style', 'border-color : red')

}

function handlePaymentOptions() {
    const payment = document.createElement('div')
    const description = document.createElement('p')
    paymentInfo.removeChild(paymentInfo.lastChild);
    const selectPayment = document.getElementById('payment')

    switch (paymentOption.value) {
        case 'select method':
            const errorPayment = document.createElement('div')
            errorPayment.textContent = 'Please select some valid payment method'
            errorPayment.setAttribute('style', 'color : red')
            paymentInfo.insertBefore(errorPayment, selectPayment.nextElementSibling)
            break;
        case 'bitcoin': payment.id = 'bitcoin'
            payment.className = 'bitcoin'
            description.textContent = "If you selected the Bitcoin option we'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final."
            payment.appendChild(description)
            paymentInfo.insertBefore(payment, selectPayment.nextElementSibling)
            break;
        case 'paypal': payment.id = 'paypal'
            payment.className = 'paypal'
            description.textContent = "If you selected the PayPal option we'll take you to Paypal's site to set up your billing information, when you click “Register” below."
            payment.appendChild(description)
            paymentInfo.insertBefore(payment, selectPayment.nextElementSibling)
            break;
        case 'credit card': payment.id = 'credit-card'
            payment.className = 'credit-card'
            let creditCardFields = [];
            let creditCardLabels = [];
            let creditCardInputs = [];
            for (let i = 0; i < 3; i++) {
                creditCardFields[i] = document.createElement('div')
                creditCardLabels[i] = document.createElement('label')
                creditCardLabels[i].setAttribute('style', 'display : inline')
                creditCardInputs[i] = document.createElement('input')
            }
            // 16-digit credit card number field
            creditCardFields[0].className = 'col-6 col'
            creditCardLabels[0].setAttribute('for', 'cc-name')
            creditCardLabels[0].textContent = 'Card Number:';
            creditCardInputs[0].id = 'card';
            creditCardInputs[0].setAttribute('name', 'user-cc-num')
            creditCardInputs[0].setAttribute('type', 'text')

            // zip-code field
            creditCardFields[1].className = 'col-3 col';
            creditCardLabels[1].setAttribute('for', 'zip')
            creditCardLabels[1].textContent = 'Zip Code:'
            creditCardInputs[1].id = 'zip'
            creditCardInputs[1].setAttribute('name', 'user-zip')
            creditCardInputs[1].setAttribute('type', 'text')

            // cvv field
            creditCardFields[2].className = 'col-3 col'
            creditCardLabels[2].setAttribute('for', 'cvv')
            creditCardLabels[2].textContent = 'CVV:'
            creditCardInputs[2].id = 'cvv';
            creditCardInputs[2].setAttribute('name', 'user-cvv')
            creditCardInputs[2].setAttribute('type', 'text')

            for (let i = 0; i < 3; i++) {
                creditCardFields[i].appendChild(creditCardLabels[i])
                creditCardFields[i].appendChild(creditCardInputs[i])
                payment.appendChild(creditCardFields[i])
            }
            const expMonth = document.createElement('label')
            expMonth.setAttribute('for', 'exp-month')
            expMonth.textContent = 'Expiration Date:'
            const selectMonth = document.createElement('select')
            selectMonth.setAttribute('name', 'user-exp-month')
            let monthOptions = []

            // dropdown options for valid months and years
            for (let i = 0; i < 12; i++) {
                monthOptions[i] = document.createElement('option')
                monthOptions[i].setAttribute('value', `'${i}'`)
                monthOptions[i].textContent = `${
                    i + 1
                } - ${
                    validMonths[i]
                }`
                selectMonth.appendChild(monthOptions[i])
            }
            const labelYear = document.createElement('label')
            labelYear.textContent = 'Expiration Year:'
            labelYear.setAttribute('for', 'exp-year')
            const selectYear = document.createElement('select')
            selectYear.setAttribute('name', 'user-exp-year')
            selectYear.id = 'exp-year'
            let yearOptions = [];
            for (let i = 0; i < 5; i++) {
                yearOptions[i] = document.createElement('option')
                yearOptions[i].setAttribute('value', `'${
                    upcomingYears[i]
                }'`)
                yearOptions[i].textContent = upcomingYears[i]
                selectYear.appendChild(yearOptions[i])
            }
            payment.appendChild(expMonth)
            payment.appendChild(selectMonth)
            payment.appendChild(labelYear)
            payment.appendChild(selectYear)
            paymentInfo.insertBefore(payment, selectPayment.nextElementSibling)

            // Event listeners for credit card input fields
            document.getElementById('card').addEventListener('keyup', createListener(isValidCreditCard, 'card'))
            document.getElementById('zip').addEventListener('keydown', createListener(isValidZipcode, 'zip'))
            document.getElementById('cvv').addEventListener('keydown', createListener(isValidCvv, 'cvv'))
            break;
    }
}


// Event listners for workshop checkboxes
for (var i = 0; i < workshopCheckboxes.length; i++) {
    workshopCheckboxes[i].addEventListener('change', (e) => handleCheckbox(e))
}

function checkAllValues(e) {
    e.preventDefault()
    let creditcardValue = document.getElementById('card').value
    let zipcodeValue = document.getElementById('zip').value
    let cvvValue = document.getElementById('cvv').value
    let userInputValidation = usernameInput.value !== '' && isValidUsername(usernameInput.value)
    let emailInputValidation = emailInput.value !== '' && isValidEmail(emailInput.value)
    let creditCardValidation = creditcardValue !== '' && isValidCreditCard(creditcardValue)
    let zipcodeValidation = zipcodeValue !== '' && isValidZipcode(zipcodeValue)
    let cvvValidation = cvvValue !== '' && isValidCvv(cvvValue)

    if (userInputValidation && emailInputValidation && creditCardValidation && zipcodeValidation && cvvValidation && cost > 0) {
        document.getElementById('myForm').submit();
        return false;
    } else {
        if (! userInputValidation) {
            showFillupError('username')
        }
        if (! emailInputValidation) {
            showFillupError('email')
        }
        if (cost <= 0) {
            showWorkshopError()
        }
        if (paymentOption.value == 'credit card') {
            if (! creditCardValidation) {
                showFillupError('card')
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

// Event listeners
usernameInput.addEventListener('input', createListener(isValidUsername, 'username'));
emailInput.addEventListener('input', createListener(isValidEmail, 'email'))
jobRole.addEventListener('change', (e) => selectJobRole(e))
tShirtDesign.addEventListener('change', () => tShirtDesignListener());
paymentOption.addEventListener('change', (e) => handlePaymentOptions(e))
submitButton.addEventListener('click', (e) => checkAllValues(e))

paymentOption.value = 'credit card'
handlePaymentOptions()
