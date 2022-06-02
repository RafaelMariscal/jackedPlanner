import { updateExerciseSetsWeight } from "./database/dbManager.js"

function generateExercisePlanSets(exercise, planner, daySplitDoc) {
  console.log(exercise)
  let sets = exercise.sets
  let setsWeight = exercise.setsWeight
  let weightUnd = exercise.weightUnd
  const setsCards = document.getElementsByClassName('sets')[0]
  setsCards.innerHTML = ''
  for (let i = 0; i < sets; i++) {
    const exercisePlanHtml = `
      <form id="set${i + 1}" action="#" class="sets-area">
        <p class="set">SET ${i + 1}</p>       
        <p class="weight">${setsWeight[i]} ${weightUnd}</p>
        <input required type="number" name="w8Lifted-set${i + 1}" id="wl-set${i + 1}" class="used" placeholder="W8 ${weightUnd}">
        <input required type="number" name="repsDone-set${i + 1}" id="rd-set${i + 1}" class="used" placeholder="Reps">
        <button id="doneBtnForSet${i + 1}" class="exercise-card done-btn" type="button">DONE</button>
       </form>
    `
    setsCards.innerHTML += exercisePlanHtml
  }
  setsDoneState(daySplitDoc, exercise)

  editSetsBtn.onclick = () => {
    toggleEditSetsForm()
    populateExercisePlanEditForm(exercise)
    populateEditFormInputs(exercise)
    let removeSetWeightBtns = Array.from(document.getElementsByClassName('removeSetWeight'))
    removeSetWeightBtns.forEach(((removeBtn, index) => {
      removeBtn.onclick = () => {
        removeSetWeightFeature(exercise, index)
      }
    }))
  }

  addNewSetBtn.onclick = addNewSetBtnFeature
  editSetsConfirmBtn.onclick = () => {
    if (confirm('Confirm Sets Weight updates?')) {
      getEditSetsWeightInputsValues(exercise, planner, daySplitDoc)
    }
  }
}
function setsDoneState(daySplitDoc, exercise) {
  let doneBtns = Array.from(document.getElementsByClassName('done-btn'))
  doneBtns.forEach(btn => {
    btn.onclick = () => {
      let test = 0
      let index = btn.id.charAt(btn.id.length - 1)
      let set = document.getElementById(`set${index}`)
      let setChilds = Array.from(set.children)
      if (setChilds[2].value == '' || setChilds[3].value == '' || setChilds[3].value <= 0) {
        return alert("The Set's inputs needs to be filled and Reps greater then 0")
      }
      if (setChilds[4].classList.contains('done')) {
        setChilds[2].disabled = false
        setChilds[3].disabled = false
        testIfAllSetsAreDone(doneBtns, test, daySplitDoc, exercise)
      } else {
        setChilds[2].disabled = true
        setChilds[3].disabled = true
        testIfAllSetsAreDone(doneBtns, test, daySplitDoc, exercise)
      }
      setChilds.forEach(element => element.classList.toggle('done'))
    }
  })
}
function testIfAllSetsAreDone(doneBtns, test, daySplitDoc, exercise) {
  doneBtns.forEach(btn => {
    setTimeout(() => {
      if (btn.classList.contains('done')) ++test
      let currentExerciseId = document.getElementsByClassName('selected-exercise')[0].id
      let index = currentExerciseId.charAt(currentExerciseId.length - 1)
      let exercise = document.getElementById(`exerc${index}`)
      if (test == doneBtns.length) {
        if (!exercise.classList.contains('exerciseDone')) exercise.classList.add('exerciseDone')
        console.log('exercise Done!!')
      } else {
        if (exercise.classList.contains('exerciseDone')) exercise.classList.remove('exerciseDone')

        /* update DB for lifted weight and reps */

      }
    }, 100);
  })
}

function populateExercisePlanFormValues(exercise) {
  for (let i = 0; i < exercise.sets; i++) {
    const input1 = document.getElementById(`wl-set${i + 1}`)
    const input2 = document.getElementById(`rd-set${i + 1}`)
    if (exercise.liftedWeight[i] == undefined) exercise.liftedWeight[i] = ""
    if (exercise.liftedReps[i] == undefined) exercise.liftedReps[i] = ""
    input1.value = exercise.liftedWeight[i]
    input2.value = exercise.liftedReps[i]
    if (input2.value != 0) {
      setTimeout(() => {
        let btn = document.getElementById(`doneBtnForSet${i + 1}`)
        console.log(btn)
        btn.click()
      }, 200);
    }
  }

  /* CREATE LOGIC TO FILL UP */

}
function toggleEditSetsForm() {
  exercisePlanFormContainer.classList.toggle('hide')
  const closeBtn = document.getElementById('close-edit-exercisePlan-form')
  closeBtn.onclick = () => {
    if (confirm('Leave without implement the updates?')) {
      exercisePlanFormContainer.classList.toggle('hide')
    }
  }
}
async function populateExercisePlanEditForm(exercise) {
  console.log(exercise)
  exerciseSetsPlan.innerHTML = ''
  exerciseSetsPlan.innerHTML += `
    <label for="editSetWeightUnd">Set the weight <span>und</span> :
      <input type="text" name="editSetWeightUnd" id="editSetWeightUnd" class="content-card" style="font-size: 1.25em"
      placeholder="${exercise.weightUnd}" required>
    </label>
  `
  exercise.setsWeight.forEach((setWeigth, index) => {
    exerciseSetsPlan.innerHTML += `
    <div style="display: flex; gap: 1em;">
      <label for="editSet${index + 1}Weight">Weight for set <span>${index + 1}</span> :
        <input type="number" name="editSet${index + 1}Weight" id="editSet${index + 1}Weight" class="content-card editSetWeightInput" style="font-size: 1.25em"
        placeholder="${Number(setWeigth)}" required>
      </label>
      <div id="deleteSetWeightInputBtn" class="remove-btn removeSetWeight">
        <svg class="edit" width="25" height="30" viewBox="0 0 207 242" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.01928 51.3278H201.066C201.066 51.3278 203.567 51.1478 204.639 50.1407C205.781 49.067 206.021 46.3724 206.021 46.3724V24.6157C206.021 23.4292 205.311 21.2587 203.855 19.7965C202.391 18.3258 200.436 17.6073 199.013 17.6073H134.154V10.2029C134.154 8.5026 132.968 5.1025 131.218 3.31854C129.414 1.47896 125.699 0.299053 123.428 0.299082C114.983 0.29919 109.211 0.282821 103.508 0.266648C97.9304 0.250832 92.4187 0.235202 84.5377 0.235353C82.9606 0.235385 78.66 1.37498 76.8683 3.13737C75.0305 4.94515 73.843 6.88149 73.843 9.00451V17.6073H7.47263C6.11925 17.6073 4.12165 18.7415 2.62848 20.2951C1.23252 21.7475 0.206093 23.2155 0.205457 24.8491C0.203449 30.0067 0.204081 33.783 0.204764 37.8621C0.205201 40.4745 0.205659 43.211 0.205457 46.514C0.205366 48.0038 0.653652 49.7014 1.3468 50.3544C2.38506 51.3326 3.99439 51.3297 4.91223 51.328L5.01928 51.3278Z" fill="white"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6154 241.702H173.793C176.622 241.702 179.027 240.542 181.265 238.23C183.41 236.015 184.477 231.018 184.477 231.018C184.477 231.018 193.914 133.691 199.013 84.0026C199.338 80.832 198.275 78.5999 195.924 76.4481C193.795 74.4997 191.43 73.9569 188.967 73.9569C156.422 73.9569 131.218 73.8884 105.931 73.8197C80.4758 73.7505 54.9365 73.681 21.739 73.681C18.0718 73.681 14.1603 75.063 11.7292 77.3082C9.0262 79.8045 8.50124 83.9913 8.67161 85.5604C14.4598 138.871 22.9311 231.018 22.9311 231.018C22.9311 231.018 24.1434 235.985 26.318 238.192C28.5378 240.444 31.7285 241.702 33.6154 241.702ZM92.9048 119.853C92.9066 140.596 92.9062 165.055 92.9048 194.019C92.9046 197.937 97.4764 202.692 102.515 202.629C107.485 202.567 111.886 197.567 111.886 194.019V119.853C111.886 116.935 107.14 112.669 102.515 112.613C97.8164 112.556 92.9045 116.565 92.9048 119.853ZM52.3855 194.466C50.8711 165.542 49.5914 141.116 48.504 120.402C48.3316 117.118 53.0269 112.857 57.7221 112.668C62.3432 112.482 67.3069 116.494 67.4597 119.408L71.3412 193.472C71.5269 197.016 67.3927 202.239 62.4332 202.561C57.4048 202.888 52.5904 198.378 52.3855 194.466ZM139.935 119.408C138.851 140.123 137.571 164.549 136.053 193.472C135.848 197.385 140.165 202.373 145.2 202.574C150.166 202.772 154.823 198.009 155.009 194.466L158.891 120.402C159.043 117.487 154.526 112.979 149.911 112.681C145.222 112.378 140.107 116.124 139.935 119.408Z" fill="white"></path>
        </svg>
      </div>
    </div>
    `
  });
}
function populateEditFormInputs(exercise) {
  editSetWeightUnd.value = exercise.weightUnd
  let inputsList = Array.from(document.getElementsByClassName('editSetWeightInput'))
  inputsList.forEach((input, index) => {
    input.value = exercise.setsWeight[index]
  })
}
async function removeSetWeightFeature(exercise, setsWeightPosition) {
  console.log(setsWeightPosition)
  let newSetsWeight = exercise.setsWeight.filter((element, index) => index != setsWeightPosition)
  exercise.setsWeight = newSetsWeight
  populateExercisePlanEditForm(exercise).then(() => {
    let removeSetWeightBtns = Array.from(document.getElementsByClassName('removeSetWeight'))
    removeSetWeightBtns.forEach(((removeBtn, index) => {
      removeBtn.onclick = () => {
        removeSetWeightFeature(exercise, index)
      }
    }))
  })
}
function addNewSetBtnFeature() {
  let newSetIndex = Array.from(exerciseSetsPlan.children).length
  console.log(newSetIndex)
  exerciseSetsPlan.innerHTML += `
    <label for="editSet${newSetIndex}Weight">Weight for set <span>${newSetIndex}</span> :
      <input type="number" name="editSet${newSetIndex}Weight" id="editSet${newSetIndex}Weight" class="content-card editSetWeightInput" style="font-size: 1.25em" placeholder="0" required>
    </label>
  `
}
function getEditSetsWeightInputsValues(exercise, planner, daySplitDoc) {
  let newSetsWeightUnd = editSetWeightUnd.value
  let newSetsWeight = []
  let EditSetsWeightInputs = Array.from(document.getElementsByClassName('editSetWeightInput'))
  EditSetsWeightInputs.forEach(input => {
    newSetsWeight.push(input.value)
  });
  updateExerciseSetsWeight(newSetsWeight, newSetsWeightUnd, planner, daySplitDoc, exercise)
}

export { generateExercisePlanSets, populateExercisePlanFormValues }