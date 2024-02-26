// ---- DOM variables ----
const screen = document.querySelector('#screen')
const reset = document.getElementById('reset')
const changeSign = document.getElementById('sign')
const percentage = document.getElementById('percentage')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const result = document.getElementById('result')

// session storage
sessionStorage.setItem('var1', '')
sessionStorage.setItem('var2', '')
sessionStorage.setItem('operator', '')
sessionStorage.setItem('previous_result', '')

// reset btn
reset.addEventListener('click', () => {
    resetCalc() 
    screen.innerText = ''
    sessionStorage.setItem('previous_result', '')
})

// equal btn 
result.addEventListener('click', () => {
    let var1 = sessionStorage.getItem('var1')
    let var2 = sessionStorage.getItem('var2')
    let operator = sessionStorage.getItem('operator')
    operate(+var1, operator, +var2)
    resetCalc() 
})

getNumber()
getOperator() 

function operate(var1, operator, var2){
    let resOperation = ''
    if (operator == '+'){ resOperation = (var1 + var2)}
    if (operator == '-'){ resOperation = (var1 - var2)}
    if (operator == 'x'){ resOperation = (var1 * var2)}
    if (operator == '/'){ resOperation = (var1 / var2)}
    screen.innerText = resOperation
    sessionStorage.setItem('previous_result', resOperation)
    // check aberrant operations
    if (screen.innerText === 'Infinity'){ screen.innerText = 'infinite value 😱' } 
    if (screen.innerText === 'NaN'){ screen.innerText = 'invalid operation 🤓' }
}

function getNumber(){
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            if (sessionStorage.getItem('operator') === ''){
                sessionStorage.setItem('var1', sessionStorage.getItem('var1') + number.innerText)
            } else {
                sessionStorage.setItem('var2', sessionStorage.getItem('var2') + number.innerText)
            }
            screen.innerText += number.innerText
        })
    })
}

function getOperator(){
    operations.forEach(operator => {
        operator.addEventListener('click', () => {
            if (sessionStorage.getItem('operator') === ''){
                sessionStorage.setItem('operator', operator.innerText)
                screen.innerText += operator.innerText
            } 
        })
    })
}

function resetCalc(){
    sessionStorage.setItem('var1', '')
    sessionStorage.setItem('var2', '')
    sessionStorage.setItem('operator', '')
}
