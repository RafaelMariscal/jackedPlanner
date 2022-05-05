function populateExercisePlan(exercise) {
  let sets = exercise.sets
  let setsWeight = exercise.setsWeight      /* aray */
  let weightUnd = exercise.weightUnd        /* string */
  let liftedReps = exercise.liftedReps      /* input aray */
  let liftedWeight = exercise.LiftedWeight  /* input aray */
  const setsCards = document.getElementsByClassName('sets')[0]
  setsCards.innerHTML = ''
  for (let i = 0; i < sets; i++) {
    const exercisePlanHtml = `
      <form id="set${i + 1}" action="#" class="sets-area">
        <p class="set">SET ${i + 1}</p>
        <p class="weight">${setsWeight[i]} ${weightUnd}</p>
        <input required type="text" name="w8Lifted-set${i + 1}" id="wl-set${i + 1}" class="used" placeholder="${setsWeight[i]} ${weightUnd}">
        <input required type="text" name="repsDone-set${i + 1}" id="rd-set${i + 1}" class="used" placeholder="${setsWeight[i]} ${weightUnd}">
        <button class="exercise-card done-btn" type="submit">DONE</button>
       </form>
    `
    setsCards.innerHTML += exercisePlanHtml
  }
}


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

export { populateExercisePlan }