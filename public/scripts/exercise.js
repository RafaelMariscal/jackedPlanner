import { addNewExercise, deleteExerciseDb, updateExerciseDb } from "./database/dbManager.js";
import { generateExercisePlanSets, populateExercisePlanFormValues } from "./exercisePlan.js";

async function handleExercisesList(planner, splitsCalendar, daySplitDoc, date) {
  let splitTitle = document.getElementById('w-day')
  const exercisesCards = document.getElementById('exercises-list')
  exercisesCards.innerHTML = ''
  if (!planner) {
    splitTitle.textContent = ''
    return console.log('no planner')
  }
  if (daySplitDoc == 'rest') {
    splitTitle.textContent = 'REST DAY'
    return printRestDay(exercisesCards)
  }
  splitTitle.textContent = daySplitDoc.title
  daySplitDoc.date = date
  daySplitDoc.schedule = splitsCalendar
  const exercisesList = daySplitDoc.exercises
  exercisesList.forEach((exercise, index) => {
    printExercisesList(exercise, index, exercisesCards)
  })
  let firstElement = document.getElementById('exerc0-name')
  if (firstElement.innerText == '') {
    document.getElementById('exerc0').style.display = 'none'
  }
  let firstExercise = document.getElementById('exerc0')
  firstExercise.click()
  if (exercisesList[0].name == '') {
    document.getElementsByClassName('sets')[0].innerHTML = ''
  }
  let form = document.getElementById('add-exercise')
  form.style.display = 'flex'
  hendleExerciseDescription(daySplitDoc)
  exerciseSelectorFeature(exercisesList, planner, daySplitDoc)
  exercisesCRUDFeature(planner, daySplitDoc, exercisesList, date, splitsCalendar)
}
function printExercisesList(exercise, i, exercisesCards) {
  let exerciseIndex = exercise.index
  let name = exercise.name
  let sets = exercise.sets
  let reps = exercise.reps
  const exerciseHtmlCode = `
    <div id="exerc${i}" class="exercises">
      <button id="exerc${i}-index" class="exercise-card">${exerciseIndex}</button>
      <button id="exerc${i}-name" class="exercise-card">${name}</button>
      <button id="exerc${i}-sets" class="exercise-card">${sets}</button>
      <strong>X</strong>
      <button id="exerc${i}-reps" class="exercise-card">${reps}</button>
      <button id="exerc${i}-disc" class="exercise-card">Discrip.</button>
      <button id="exerc${i}-done" class="exercise-card">To Do</button>
      <div id="edit${i}" class="edit-exercise">
        <svg class="edit" width="30" height="30" viewBox="0 0 800 800" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M52.9742 59.7678H456.991V115.352H53.9031V745.203H686.399V345.759H743.983V745.203C743.983 757.966 739.724 774.071 727.598 786.46C715.162 799.165 703.047 803.716 685.47 803.716H53.9031C40.8826 803.716 27.4521 798.082 16.1522 786.46C5.26196 775.259 0.0341072 759.4 0.0341797 749.847C0.0360599 502.061 0.0356056 363.138 0.0341797 115.352C0.034092 100.105 3.66029 89.73 13.9856 78.1462C25.1861 65.5806 38.1945 59.7678 52.9742 59.7678Z"
            fill="black" />
          <path
            d="M196.964 602.284L240.434 468.011C239.79 458.673 241.014 437.583 251.06 427.923C253.428 425.646 253.428 423.112 253.428 422.041C275.614 441.24 305.459 472.807 315.326 483.922C326.439 493.788 358.008 523.634 377.208 545.82C376.137 545.82 373.603 545.82 371.326 548.189C361.666 558.235 340.575 559.459 331.237 558.814L196.964 602.284Z"
            fill="black" />
          <path d="M418.925 500.84L298.297 380.212L579.762 102.836L699.027 222.101L418.925 500.84Z"
            fill="black" />
          <path
            d="M743.326 177.803L622.125 56.6016C622.125 56.6016 646.589 32.2608 662.225 16.6246C670.273 8.57729 682.793 1.42598 698.085 0.814765C714.915 0.142077 729.285 7.69499 738.214 16.6246L789.669 68.0789C796.676 75.0865 799.131 86.3669 799.298 99.021C799.471 112.234 796.923 124.205 789.669 131.46L743.326 177.803Z"
            fill="black" />
        </svg>
      </div>
    </div>
    `
  exercisesCards.innerHTML += exerciseHtmlCode
}
function printRestDay(exercisesCards) {
  const code = `
  <h2 style="font-size: 2.5em; font-weight: 400; text-align: center">REST DAY!!!</h2>
  `
  exercisesCards.innerHTML = code
  let form = document.getElementById('add-exercise')
  form.style.display = 'none'
  document.getElementsByClassName('sets')[0].innerHTML = ''
}
function hendleExerciseDescription(daySplitDoc) {
  let exercisesList = daySplitDoc.exercises
  exercisesList.forEach((exercise, index) => {
    let exerciseDescription = `
      <div id="exerc${index}-descriptionCard" class="exercise-card description-card hide">
          <p id="dic${index}">${exercise.disc}</p>
      </div>
    `
    let descriptionBtn = document.getElementById(`exerc${index}-disc`)
    let exerciseNameCard = document.getElementById(`exerc${index}-name`)
    exerciseNameCard.innerHTML += exerciseDescription
    setTimeout(() => {
      descriptionBtn.onclick = (event) => {
        let descriptionCards = Array.from(document.getElementsByClassName('description-card'))
        descriptionCards.forEach(descriptionCard => {
          let index = event.target.id.charAt(5)
          let element = document.getElementById(`exerc${index}-descriptionCard`)
          if (!descriptionCard.classList.contains('hide')
            && element.id !== descriptionCard.id) {
            descriptionCard.classList.toggle('hide')
          } else {
            if (element.id == descriptionCard.id) descriptionCard.classList.toggle('hide')
          }
        });
      }
    }, 200);
  });
}
function exerciseSelectorFeature(exercisesList, planner, daySplitDoc) {
  const exercisesPrinted = Array.from(document.getElementById('exercises-list').children)
  const exercisesDescription = Array.from(document.getElementsByClassName('description-card'))
  exercisesPrinted.forEach(exerciseCard => {
    exerciseCard.addEventListener('click', () => {
      if (!exerciseCard.classList.contains('selected-exercise')) {
        clearExerciseSelector(exercisesPrinted)
        clearExerciseDescription(exercisesDescription)
        exerciseCard.classList.add('selected-exercise')
        editSets.classList.remove('hide')

        let elementId = exerciseCard.id
        let positionInArray = elementId.substring(elementId.length - 1)
        let exercise = exercisesList[positionInArray]

        generateExercisePlanSets(exercise, planner, daySplitDoc)
        populateExercisePlanFormValues(exercise)
      }
      let index = exerciseCard.id.charAt(exerciseCard.id.length - 1)
      let descriptionCard = document.getElementById(`exerc${index}-descriptionCard`)
      let exerciseNameCard = document.getElementById(`exerc${index}-name`)
      exerciseNameCard.onclick = () => descriptionCard.classList.toggle('hide')
    })
  });
}
function clearExerciseSelector(exercisesPrinted) {
  exercisesPrinted.forEach(exerciseCard => {
    if (exerciseCard.classList.contains('selected-exercise')) {
      exerciseCard.classList.remove('selected-exercise')
    }
  })
}
function clearExerciseDescription(exercisesDescription) {
  exercisesDescription.forEach(desc => {
    desc.classList = 'exercise-card description-card hide'
  })
}

/* ----------- exercises CRUD ------------ */

async function exercisesCRUDFeature(planner, daySplitDoc, exercisesList, date, splitsCalendar) {
  const form = Array.from(document.getElementById('add-exercise').children)
  const formValues = { index: '', name: '', sets: '', reps: '', disc: '' }
  form.forEach((element) => {
    element.onchange = () => {
      formValues[element.name] = element.value
    }
  })
  const addBtn = document.getElementById('exerc-add')
  addBtn.onclick = () => {
    if (confirm('This action wiil add a new exercise to this split.')) {
      addNewExercise(planner, formValues, daySplitDoc)
    }
  }
  const editBtns = Array.from(document.getElementsByClassName('edit-exercise'))
  editBtns.forEach((editBtn) => {
    editBtn.onclick = () => {
      let number = editBtn.id.charAt(editBtn.id.length - 1)
      toggleExerciseEditForm().then(() => {
        populateExerciseEditForm(number, exercisesList)
        const confirmEditExerciseBtn = document.getElementById('confirm-edit-btn')
        confirmEditExerciseBtn.onclick = () => {
          if (confirm('Confirm exercise editing?')) {
            updateExerciseDb(planner, number, daySplitDoc)
          }
        }
        const deleteExerciseBtn = document.getElementById('delete-exercise')
        deleteExerciseBtn.onclick = () => {
          if (confirm('Do you want to delete this exercise?')) {
            deleteExerciseDb(planner, number, daySplitDoc)
          }
        }
      })
    }
  })

}
async function toggleExerciseEditForm() {
  const closeEditExerciseForm = document.getElementById('close-edit-exercise-form')
  const editExerciseForm = document.getElementById('exercise-form-container')
  editExerciseForm.classList.toggle('hide')
  closeEditExerciseForm.onclick = () => {
    if (confirm('Leave without saving changes?')) {
      editExerciseForm.classList.toggle('hide')
    }
  }
}
function populateExerciseEditForm(index, exercisesList) {
  let exercise = exercisesList[index]
  const formIndex = document.getElementById('edit-exercise-index')
  const formName = document.getElementById('edit-exercise-name')
  const formSets = document.getElementById('edit-exercise-sets')
  const formReps = document.getElementById('edit-exercise-reps')
  const formDesc = document.getElementById('edit-exercise-description')
  formIndex.value = exercise.index
  formName.value = exercise.name
  formSets.value = exercise.sets
  formReps.value = exercise.reps
  formDesc.value = exercise.disc
  console.log(exercise)
}

export { handleExercisesList }