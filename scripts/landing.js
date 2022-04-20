const close = document.getElementsByClassName('close')

const newUserBox = document.getElementById('create-box')
const createForm = document.getElementById('create-form')
const create = document.getElementById(`create`)
const createBtn = document.getElementById('create-submit')
const createMsg = document.getElementById('create-msg')

const forgotBox = document.getElementById('forgot-box')
const forgotForm = document.getElementById('forgot-form')
const forgot = document.getElementById(`forgot`)
const forgotBtn = document.getElementById('forgot-btn')
const forgotMsg = document.getElementById('forgot-msg')


create.onclick = () => newUserBox.classList.toggle('hide')
forgot.onclick = () => forgotBox.classList.toggle('hide')

close[0].onclick = () => forgotBox.classList.toggle('hide')
close[1].onclick = () => newUserBox.classList.toggle('hide')

createForm.onsubmit = (event) => {
  event.preventDefault()
  createMsg.classList.toggle('hide')
  setTimeout(() => {
    createMsg.classList.toggle('hide')
    newUserBox.classList.toggle('hide')
    /* createForm.submit() */
  }, 1500);
}

forgotForm.onsubmit = (event) => {
  event.preventDefault()
  forgotMsg.classList.toggle('hide')
  setTimeout(() => {
    forgotMsg.classList.toggle('hide')
    forgotBox.classList.toggle('hide')
    /* createForm.submit() */
  }, 1500);
}