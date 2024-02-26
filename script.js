// ---- DOM variables ----
const resultScreen = document.querySelector('#screen span:nth-child(1)')
const screen = document.querySelector('#screen span:nth-child(2)')
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

// reset btn
reset.addEventListener('click', () => {
    resetCalc() 
    screen.innerText = ''
    resultScreen.innerText = ''
})

// equal btn 
result.addEventListener('click', () => {
    let var1 = sessionStorage.getItem('var1')
    let var2 = sessionStorage.getItem('var2')
    let operator = sessionStorage.getItem('operator')
    operate(var1, operator, var2)
    resetCalc() 
    screen.innerText = ''
})

getNumber()
getOperator() 

function operate(var1, operator, var2){
    if (operator == '+'){ resultScreen.innerText = (+var1 + +var2)}
    if (operator == '-'){ resultScreen.innerText = (+var1 - +var2)}
    if (operator == 'x'){ resultScreen.innerText = (+var1 * +var2)}
    if (operator == '/'){ resultScreen.innerText = (+var1 / +var2)}
    if (resultScreen.innerText === 'Infinity'){
        resultScreen.innerText = 'infinite value 😱'
    } 
    if (resultScreen.innerText === 'NaN'){
        resultScreen.innerHTML = 'invalid operation 🤓'
    }
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
    sessionStorage.clear()
    sessionStorage.setItem('var1', '')
    sessionStorage.setItem('var2', '')
    sessionStorage.setItem('operator', '')
}
