import { createNewAccount, login, ifUserLogged } from "./database/userManager.js";

const loginForm = document.getElementById('loginForm')
loginForm.addEventListener('submit', (event) => {
  event.preventDefault()
  login(user.value, password.value, loginForm)
}, true)

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
const newUserPasswordConfirmInput = document.getElementById('userPasswordConfirm')
var userPasswordConfirm = ''
newUserPasswordConfirmInput.oninput = () => {
  userPasswordConfirm = newUserPasswordConfirmInput.value
}

createForm.onsubmit = (event) => {
  event.preventDefault()
  if (userPassword != userPasswordConfirm) {
    return alert('Password confirmation has no match!')
  }
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

document.addEventListener('DOMContentLoaded', ifUserLogged)