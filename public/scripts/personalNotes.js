import { updateSplitCardios } from "./database/dbManager.js"

let radioList = Array.from(document.getElementById('radio-list').children)

function handlePersonalNotes(planner, splitsCalendar, daySplitDoc) {
  PersonalNotesForm.reset()
  let splitTitle = document.getElementById('w-day')
  const cardioCards = document.getElementById('cardios')
  cardioCards.innerHTML = ''
  if (!planner) {
    splitTitle.textContent = ''
    if (!editCardio.classList.contains('hide')) editCardio.classList.add('hide')
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
    if (!editCardio.classList.contains('hide')) editCardio.classList.add('hide')
    return console.log('Rest Day. Do your fucking Cardios!!')
  }

  let personalNotes = daySplitDoc.notes
  let cardios = personalNotes.cardio
  printCardiosCards(cardioCards, cardios)
}


function printCardiosCards(cardioCards, cardios) {
  if (editCardio.classList.contains('hide')) editCardio.classList.remove('hide')
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
  if (editCardio.classList.contains('hide')) editCardio.classList.remove('hide')
  editCardio.onclick = () => {
    personalNotesEditForm.classList.toggle('hide')
    closePersonalNotesEditForm.onclick = () => personalNotesEditForm.classList.toggle('hide')
    generatePlannerNotesForm(cardios)
    deleteCardioFeature()
    addNewCardioBtn.onclick = () => {
      addNewCardio()
      populatePlannerNotesForm(cardios)
      deleteCardioFeature()
    }
    confirmEditCardioBtn.onclick = () => {
      if (confirm('Confirm cardio section edit?')) {
        const cardiosElements = Array.from(document.getElementById('personalNotesEditFormCardios').children)
        const newCardios = getCardiosInputsValues(cardiosElements)
        const element = document.getElementsByClassName('selected-item')[0].id
        let plannerIndex = element.charAt(element.length - 1)
        const splitTitle = document.getElementById('w-day').textContent
        updateSplitCardios(plannerIndex, splitTitle, newCardios).then((docData) => {
          alert('Cardios Updated!')
          personalNotesEditForm.classList.toggle('hide')
        })
      }
    }
  }
  rateWorkout(radioList)
}

function generatePlannerNotesForm(cardios) {
  personalNotesEditFormCardios.innerHTML = ''
  cardios.forEach((cardio, index) => {
    const cardioCardsHtml = `
    <div id="cardio${index + 1}">
      <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 0.5em">
        <p style="font-size:1.25em;" class="cardios">Cardio <span>${index + 1}</span> :</p>      
        <div id="delete-cardio${index + 1}" class="deleteCardio" style="padding-right: 0.5em">
          <svg class="edit" width="20" height="30" viewBox="0 0 207 242" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-height:2em">
            <path d="M5.01928 51.3278H201.066C201.066 51.3278 203.567 51.1478 204.639 50.1407C205.781 49.067 206.021 46.3724 206.021 46.3724V24.6157C206.021 23.4292 205.311 21.2587 203.855 19.7965C202.391 18.3258 200.436 17.6073 199.013 17.6073H134.154V10.2029C134.154 8.5026 132.968 5.1025 131.218 3.31854C129.414 1.47896 125.699 0.299053 123.428 0.299082C114.983 0.29919 109.211 0.282821 103.508 0.266648C97.9304 0.250832 92.4187 0.235202 84.5377 0.235353C82.9606 0.235385 78.66 1.37498 76.8683 3.13737C75.0305 4.94515 73.843 6.88149 73.843 9.00451V17.6073H7.47263C6.11925 17.6073 4.12165 18.7415 2.62848 20.2951C1.23252 21.7475 0.206093 23.2155 0.205457 24.8491C0.203449 30.0067 0.204081 33.783 0.204764 37.8621C0.205201 40.4745 0.205659 43.211 0.205457 46.514C0.205366 48.0038 0.653652 49.7014 1.3468 50.3544C2.38506 51.3326 3.99439 51.3297 4.91223 51.328L5.01928 51.3278Z" fill="white"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6154 241.702H173.793C176.622 241.702 179.027 240.542 181.265 238.23C183.41 236.015 184.477 231.018 184.477 231.018C184.477 231.018 193.914 133.691 199.013 84.0026C199.338 80.832 198.275 78.5999 195.924 76.4481C193.795 74.4997 191.43 73.9569 188.967 73.9569C156.422 73.9569 131.218 73.8884 105.931 73.8197C80.4758 73.7505 54.9365 73.681 21.739 73.681C18.0718 73.681 14.1603 75.063 11.7292 77.3082C9.0262 79.8045 8.50124 83.9913 8.67161 85.5604C14.4598 138.871 22.9311 231.018 22.9311 231.018C22.9311 231.018 24.1434 235.985 26.318 238.192C28.5378 240.444 31.7285 241.702 33.6154 241.702ZM92.9048 119.853C92.9066 140.596 92.9062 165.055 92.9048 194.019C92.9046 197.937 97.4764 202.692 102.515 202.629C107.485 202.567 111.886 197.567 111.886 194.019V119.853C111.886 116.935 107.14 112.669 102.515 112.613C97.8164 112.556 92.9045 116.565 92.9048 119.853ZM52.3855 194.466C50.8711 165.542 49.5914 141.116 48.504 120.402C48.3316 117.118 53.0269 112.857 57.7221 112.668C62.3432 112.482 67.3069 116.494 67.4597 119.408L71.3412 193.472C71.5269 197.016 67.3927 202.239 62.4332 202.561C57.4048 202.888 52.5904 198.378 52.3855 194.466ZM139.935 119.408C138.851 140.123 137.571 164.549 136.053 193.472C135.848 197.385 140.165 202.373 145.2 202.574C150.166 202.772 154.823 198.009 155.009 194.466L158.891 120.402C159.043 117.487 154.526 112.979 149.911 112.681C145.222 112.378 140.107 116.124 139.935 119.408Z" fill="white"></path>
          </svg>
        </div>
      </div>

      <div style="display:flex; gap: 1em; margin-bottom: 1em;">        
        <label for="distCardio${index + 1}" style="display:flex; justify-content: center">
          <div style="margin-right: .5em">
            Distance (<span>km</span>)
          </div>
          <input type="number" name="distCardio${index + 1}" id="distCardio${index + 1}" max="42" placeholder="0" required></br>
        </label>
        <label for="timeCardio${index + 1}" style="display:flex; justify-content: center">
          <div style="margin-right: .5em">
            Time (<span>min</span>)          
          </div>
          <input type="number" name="timeCardio${index + 1}" id="timeCardio${index + 1}" max="600" placeholder="0" required></br>        
        </label>
      </div>
    </div>
    `
    personalNotesEditFormCardios.innerHTML += cardioCardsHtml
  })
  populatePlannerNotesForm(cardios)
}
function deleteCardioFeature() {
  let deleteCardioBtns = Array.from(document.getElementsByClassName('deleteCardio'))
  deleteCardioBtns.forEach(deleteBtn => {
    deleteBtn.onclick = () => {
      const cardioIndex = deleteBtn.id.charAt(deleteBtn.id.length - 1)
      const distance = document.getElementById(`distCardio${cardioIndex}`)
      const time = document.getElementById(`timeCardio${cardioIndex}`)
      if (deleteCardioBtns.length == 1) {
        distance.value = ''
        time.value = ''
        return
      }
      let newCardios = []
      for (let i = 0; i < deleteCardioBtns.length; i++) {
        let dist = document.getElementById(`distCardio${i + 1}`).value
        let time = document.getElementById(`timeCardio${i + 1}`).value
        let obj = { dist, time }
        newCardios[i] = obj
      }
      newCardios.splice(cardioIndex - 1, 1)
      generatePlannerNotesForm(newCardios)
      deleteCardioFeature(newCardios)
    }
  })
}
function populatePlannerNotesForm(cardios) {
  cardios.forEach((cardio, index) => {
    const distInput = document.getElementById(`distCardio${index + 1}`)
    const timeInput = document.getElementById(`timeCardio${index + 1}`)
    distInput.value = cardio.dist
    timeInput.value = cardio.time
  })
}
function addNewCardio() {
  let newCardioIndex = Array.from(document.getElementsByClassName('cardios')).length + 1
  const newCardioCards = `
  <div id="cardio${newCardioIndex}">
    <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 0.5em">
      <p style="font-size:1.25em;" class="cardios">Cardio <span>${newCardioIndex}</span> :</p>      
      <div id="delete-cardio${newCardioIndex}" class="deleteCardio" style="padding-right: 0.5em">
        <svg class="edit" width="20" height="30" viewBox="0 0 207 242" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-height:2em">
          <path d="M5.01928 51.3278H201.066C201.066 51.3278 203.567 51.1478 204.639 50.1407C205.781 49.067 206.021 46.3724 206.021 46.3724V24.6157C206.021 23.4292 205.311 21.2587 203.855 19.7965C202.391 18.3258 200.436 17.6073 199.013 17.6073H134.154V10.2029C134.154 8.5026 132.968 5.1025 131.218 3.31854C129.414 1.47896 125.699 0.299053 123.428 0.299082C114.983 0.29919 109.211 0.282821 103.508 0.266648C97.9304 0.250832 92.4187 0.235202 84.5377 0.235353C82.9606 0.235385 78.66 1.37498 76.8683 3.13737C75.0305 4.94515 73.843 6.88149 73.843 9.00451V17.6073H7.47263C6.11925 17.6073 4.12165 18.7415 2.62848 20.2951C1.23252 21.7475 0.206093 23.2155 0.205457 24.8491C0.203449 30.0067 0.204081 33.783 0.204764 37.8621C0.205201 40.4745 0.205659 43.211 0.205457 46.514C0.205366 48.0038 0.653652 49.7014 1.3468 50.3544C2.38506 51.3326 3.99439 51.3297 4.91223 51.328L5.01928 51.3278Z" fill="white"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6154 241.702H173.793C176.622 241.702 179.027 240.542 181.265 238.23C183.41 236.015 184.477 231.018 184.477 231.018C184.477 231.018 193.914 133.691 199.013 84.0026C199.338 80.832 198.275 78.5999 195.924 76.4481C193.795 74.4997 191.43 73.9569 188.967 73.9569C156.422 73.9569 131.218 73.8884 105.931 73.8197C80.4758 73.7505 54.9365 73.681 21.739 73.681C18.0718 73.681 14.1603 75.063 11.7292 77.3082C9.0262 79.8045 8.50124 83.9913 8.67161 85.5604C14.4598 138.871 22.9311 231.018 22.9311 231.018C22.9311 231.018 24.1434 235.985 26.318 238.192C28.5378 240.444 31.7285 241.702 33.6154 241.702ZM92.9048 119.853C92.9066 140.596 92.9062 165.055 92.9048 194.019C92.9046 197.937 97.4764 202.692 102.515 202.629C107.485 202.567 111.886 197.567 111.886 194.019V119.853C111.886 116.935 107.14 112.669 102.515 112.613C97.8164 112.556 92.9045 116.565 92.9048 119.853ZM52.3855 194.466C50.8711 165.542 49.5914 141.116 48.504 120.402C48.3316 117.118 53.0269 112.857 57.7221 112.668C62.3432 112.482 67.3069 116.494 67.4597 119.408L71.3412 193.472C71.5269 197.016 67.3927 202.239 62.4332 202.561C57.4048 202.888 52.5904 198.378 52.3855 194.466ZM139.935 119.408C138.851 140.123 137.571 164.549 136.053 193.472C135.848 197.385 140.165 202.373 145.2 202.574C150.166 202.772 154.823 198.009 155.009 194.466L158.891 120.402C159.043 117.487 154.526 112.979 149.911 112.681C145.222 112.378 140.107 116.124 139.935 119.408Z" fill="white"></path>
        </svg>
      </div>
    </div>

    <div style="display:flex; gap: 1em; margin-bottom: 1em;">        
      <label for="distCardio${newCardioIndex}" style="display:flex; justify-content: center">
        <div style="margin-right: .5em">
          Distance (<span>km</span>)
        </div>
        <input type="number" name="distCardio${newCardioIndex}" id="distCardio${newCardioIndex}" max="42" placeholder="0" required></br>
      </label>
      <label for="timeCardio${newCardioIndex}" style="display:flex; justify-content: center">
        <div style="margin-right: .5em">
          Time (<span>min</span>)          
        </div>
        <input type="number" name="timeCardio${newCardioIndex}" id="timeCardio${newCardioIndex}" max="600" placeholder="0" required></br>        
      </label>
    </div>
  </div>
  `
  personalNotesEditFormCardios.innerHTML += newCardioCards
}
function getCardiosInputsValues(cardiosElements) {
  let cardiosList = []
  cardiosElements.forEach((element, index) => {
    const dist = Number(document.getElementById(`distCardio${index + 1}`).value)
    const time = Number(document.getElementById(`timeCardio${index + 1}`).value)
    if (dist == '' || dist == 0 || time == '' || time == 0) {
      return
    }
    let obj = { dist, time }
    cardiosList[index] = obj
  })
  return cardiosList.filter(n => n)
}



function rateWorkout(radioList) {
  removeRadioSelected(radioList)
  radioList.forEach(ratioCard => {
    ratioCard.addEventListener('click', () => {
      removeRadioSelected(radioList)
      let box = Array.from(ratioCard.children)[0].checked
      if (box) {
        ratioCard.classList.toggle('radio-selected')
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