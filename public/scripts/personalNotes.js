let radioList = Array.from(document.getElementById('radio-list').children)

radioList.forEach(element => {
  element.addEventListener('click', (event) => {
    wipeBoxes(radioList)
    let box = Array.from(element.children)[0].checked
    if (box) {
      element.classList.add('radio-selected')
    }
  })
});

function wipeBoxes(i) {
  i.forEach((element) => {
    element.classList = ['content-card']
  })
}