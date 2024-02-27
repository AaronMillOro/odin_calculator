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
    let storedValues = getStoredValues()
    operate(+storedValues.var1, storedValues.operator, +storedValues.var2)
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
    if (screen.innerText === 'Infinity'){ 
        screen.innerText = 'infinite value 😱' 
        sessionStorage.setItem('previous_result', '')
    } 
    if (screen.innerText === 'NaN'){ 
        screen.innerText = 'invalid operation 🤓' 
        sessionStorage.setItem('previous_result', '')
    }
}

function getNumber(){
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            eraseMessage(screen)
            const storedValues = getStoredValues()
            if ((storedValues.previous_result !== '') && (storedValues.operator === '')){
                sessionStorage.setItem('previous_result', storedValues.previous_result + number.innerText)
            } else if (storedValues.previous_result !== ''){
                sessionStorage.setItem('var1', storedValues.previous_result)
                sessionStorage.setItem('var2', storedValues.var2 + number.innerText)
            } else if (storedValues.operator === ''){
                sessionStorage.setItem('var1', storedValues.var1 + number.innerText)
            } else {
                sessionStorage.setItem('var2', storedValues.var2 + number.innerText)
            }
            screen.innerText += number.innerText
        })
    })
}

function getOperator(){
    operations.forEach(operator => {
        operator.addEventListener('click', () => {
            eraseMessage(screen)
            const storedValues = getStoredValues()
            if (storedValues.operator === ''){
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

function getStoredValues(){
    const var1 = sessionStorage.getItem('var1')
    const var2 = sessionStorage.getItem('var2')
    const operator = sessionStorage.getItem('operator')
    const previous_result = sessionStorage.getItem('previous_result')
    return  {
        'var1': var1,
        'var2': var2,
        'operator': operator,
        'previous_result': previous_result
    }
}

function eraseMessage(screen){
    if (screen.innerText === 'infinite value 😱'){
        screen.innerText = ''
    }
    if (screen.innerText === 'invalid operation 🤓' ){
        screen.innerText = ''
    }
}