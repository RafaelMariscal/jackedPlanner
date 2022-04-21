import { createNewAccount, login } from "./database/userManager.js";

const loginForm = document.getElementById('loginForm')
const userInput = document.getElementById('user')
const passwordInput = document.getElementById('password')
var user = ''
userInput.oninput = () => user = userInput.value
var password = ''
passwordInput.oninput = () => password = passwordInput.value

loginForm.onsubmit = (event) => {
  event.preventDefault()
  login(user, password)
}

const newUserBox = document.getElementById('create-box')
const createForm = document.getElementById('create-form')
const create = document.getElementById(`create`)
const createMsg = document.getElementById('create-msg')

create.onclick = () => newUserBox.classList.toggle('hide')
const newUserNameInput = document.getElementById('userName')
var userName = ''
newUserNameInput.oninput = () => {
  userName = newUserNameInput.value
}
const newUserEmailInput = document.getElementById('userEmail')
var userEmail = ''
newUserEmailInput.oninput = () => {
  userEmail = newUserEmailInput.value
}
const newUserPasswordInput = document.getElementById('userPassword')
var userPassword = ''
newUserPasswordInput.oninput = () => {
  userPassword = newUserPasswordInput.value
}
createForm.onsubmit = (event) => {
  event.preventDefault()
  createMsg.classList.toggle('hide')
  setTimeout(() => {
    createMsg.classList.toggle('hide')
    newUserBox.classList.toggle('hide')
    createNewAccount(userEmail, userPassword, userName)  /* using firebase auth */
  }, 1500);
}

const forgotBox = document.getElementById('forgot-box')
const forgotForm = document.getElementById('forgot-form')
const forgot = document.getElementById(`forgot`)
const forgotMsg = document.getElementById('forgot-msg')

forgot.onclick = () => forgotBox.classList.toggle('hide')

/* read the forgot inputs */

forgotForm.onsubmit = (event) => {
  event.preventDefault()
  forgotMsg.classList.toggle('hide')
  setTimeout(() => {
    forgotMsg.classList.toggle('hide')
    forgotBox.classList.toggle('hide')
    console.log('email enviado')
  }, 1500);
}

const close = document.getElementsByClassName('close')
close[0].onclick = () => forgotBox.classList.toggle('hide')
close[1].onclick = () => newUserBox.classList.toggle('hide')