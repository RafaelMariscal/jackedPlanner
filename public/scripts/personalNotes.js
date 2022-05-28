let radioList = Array.from(document.getElementById('radio-list').children)
const addCardio = document.getElementById('add-cardio')

function handlePersonalNotes(planner, splitsCalendar, daySplitDoc, date) {
  let splitTitle = document.getElementById('w-day')
  const cardioCards = document.getElementById('cardios')
  cardioCards.innerHTML = ''
  if (!planner) {
    splitTitle.textContent = ''
    return console.log('no planner')
  }
  if (daySplitDoc == 'rest') {
    splitTitle.textContent = 'REST DAY'
    const CardioCardForRestDay = `
      <div>
          <div class="content-card cardio">REST DAY</div>
      </div>
    `
    cardioCards.innerHTML = CardioCardForRestDay
    return console.log('Rest Day. Do your fucking Cardios!!')
  }
  console.log(daySplitDoc)
  console.log(date)

  let personalNotes = daySplitDoc.notes
  let cardios = personalNotes.cardio
  printCardiosCards(cardioCards, cardios)
}


function printCardiosCards(cardioCards, cardios) {
  console.log(cardios)
  if (cardios[0].dist == undefined) {
    const addNewCardioCard = `
      <div>
          <div class="content-card cardio">Add a new Cardio</div>
      </div>
    `
    return cardioCards.innerHTML = addNewCardioCard
  }

  cardios.forEach((cardio, index) => {
    const cardioCard = `
        <div id="cadio${index + 1}">
          <label for="cardio${index + 1}">
            <input type="radio" id="DoneCardio${index + 1}" name="cardios" value="DoneCardio${index + 1}" style="position: absolute; opacity: 0;">
            <div class="content-card cardio" id="cadio${index + 1}-content">${cardio.dist} km / ${cardio.time} min</div>
          </label>
          <button id="doneBtnForCadio${index + 1}" class="exercise-card cardioDoneBtn" type="button">DONE</button>
        </div>
      `
    cardioCards.innerHTML += cardioCard
  })

}

rateWorkout(radioList)
function rateWorkout(radioList) {
  radioList.forEach(ratioCard => {
    ratioCard.addEventListener('click', () => {
      removeRadioSelected(radioList)
      let box = Array.from(ratioCard.children)[0].checked
      if (box) {
        ratioCard.classList.add('radio-selected')
      }
    })
  });
}
function removeRadioSelected(radioList) {
  radioList.forEach((element) => {
    element.classList = ['content-card']
  })
}

export { handlePersonalNotes }