const addSetBtn = document.getElementById('add-set-btn')
const addSetForm = document.getElementById('add-set')

addSetBtn.onclick = (e) => {
  if (addSetBtn.innerText == '+') {
    addSetBtn.innerText = 'x'
    addSetBtn.style.boxShadow = 'inset 0 0 0 .2em #d52f2f, 0 0 .2em #d52f2f'

  } else {
    addSetBtn.innerText = '+'
    addSetBtn.style.boxShadow = 'inset 0 0 0 .2em var(--blue), 0 0 .2em var(--blue)'

  }
  addSetForm.classList.toggle('hide')
}
