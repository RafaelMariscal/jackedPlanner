let buttons = Array.from(document.getElementsByClassName('done-btn'))

buttons.forEach((element) => {
  element.addEventListener('click', (event) => {
    element.parentElement.classList.toggle('done')
    if (event.target.innerText == 'DONE') {
      event.target.innerText = 'GREAT!'
    } else {
      event.target.innerText = 'DONE'
    }
  })
})