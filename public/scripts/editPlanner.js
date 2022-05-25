import { createSplitStructure, updatePlannerDb } from "./database/dbManager.js";

const formContainer = document.getElementById('planners-form-container')
const form = document.getElementById('planners-form')
const closeForm = document.getElementById('close-planners-form')

const splitsContainer = document.getElementById('planners-form-splits')
const formLegend = document.getElementById('planners-form-title')
const formButtom = document.getElementById('submit-planner')
const plannerName = document.getElementById('plannerName')
const plannerRestDays = document.getElementById('plannerRestDays')
const plannerSchedule = document.getElementById('planner-split-schedule')
const startDate = document.getElementById('planner-start-date')
const newSplitsNames = document.getElementById('new-planner-splits')
const submitPlannerBtn = document.getElementById('submit-planner')

async function editPlanner(doc, element, splitsCalendar) {
  togglePlannersForm()
  let position = element.substr(element.length - 1);
  let plannerSelected = doc.planners[`planner${position}`]
  buildPlannerForm(plannerSelected, doc, position)
}
function togglePlannersForm() {
  formContainer.classList.toggle('hide')
  closeForm.onclick = () => {
    if (confirm('Leave without saving changes?')) {
      formContainer.classList.toggle('hide')
    }
  }
}
async function buildPlannerForm(planner, doc, position) {
  if (planner.name) {
    formLegend.innerText = 'Edit Planner'
    formButtom.innerText = 'Confirm Changes'
    splitsContainer.innerHTML = ''
    newSplitsNames.innerHTML = ''
    plannerName.value = planner.name
    await generateEditInputs(splitsContainer, plannerSchedule, planner, newSplitsNames, doc).then(() => {
      generateSplitsInputList(planner)
      inputValuesRegister(planner, doc, position)
      removeSplitFeature(planner, doc, position)
      let addButton = document.getElementById('addFormSplitsButtom')
      addButton.onclick = () => {
        addANewSplitOnForm(splitsContainer, plannerSchedule, planner, newSplitsNames).then(() => {
          inputValuesRegister(planner, doc, position)
          removeSplitFeature(planner, doc, position)
        })
      }
    })
    hendleStartDate(planner, startDate)
  } else {
    formLegend.innerText = 'Create Planner'
    formButtom.innerText = 'Generate Planner'
    splitsContainer.innerHTML = ''
    newSplitsNames.innerHTML = ''
    plannerSchedule.innerHTML = ''
    plannerName.value = ''
    await generateCreateInputs(planner, doc).then(() => {
      manySplits.value = 0
      plannerRestDays.value = 0
      startDate.value = 0
      plannerRestDays.onchange = updateScheduleInputs
      getCrateInputsValues(planner, doc, position)
    })
  }
}

/* -----------------  FOR CRATE FORM  ------------------- */
async function generateCreateInputs() {
  splitsContainer.innerHTML = `
  <label for="manySplits">How many splits:</label>
  <div id="add-splits">
    <input type="number" name="manySplits" id="manySplits" class="content-card"
      placeholder="(Max 10 planners)" value="0" required>
    <button type="button" id="add-splits-btn" class="content-card" style="align-self: start">Set Up</button>
  </div>
  <p>Click on "add" button to generate splits inputs</p>
  `
  let splitsToCreate = []
  const manySplits = document.getElementById('manySplits')
  manySplits.value = 0
  const addSplitsBtn = document.getElementById('add-splits-btn')
  addSplitsBtn.onclick = () => {
    if (manySplits.value == 0 || manySplits.value == '') {
      alert('Many splits needs to be defined.')
    }
    if (manySplits.value > 10) {
      manySplits.value = 10
    }
    splitsToCreate = []
    newSplitsNames.innerHTML = ''
    let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    for (let i = 0; i < manySplits.value; i++) {
      newSplitsNames.innerHTML += `
         <label for="split-${abc[i]}-name">Name for split <span id="split${abc[i]}-label">"${abc[i]}"</span> :
           <input type="text" name="split-${abc[i]}-name" id="split-${abc[i]}-name" class="content-card" style="font-size: 1em"
             placeholder="New split name" required>
         </label>
       `
      splitsToCreate.push(abc[i])
    }
    for (let i = 0; i < plannerRestDays.value; i++) {
      splitsToCreate.push('rest')
    }
    generateCreateSplitsInputs(splitsToCreate)
  }
}
function generateCreateSplitsInputs(splits) {
  plannerSchedule.innerHTML = ''
  splits.forEach((splitTag, index) => {
    plannerSchedule.innerHTML += `
      <div style="display: grid;place-items: center;">
        <label for="planner-split-schedule${index + 1}">Day <span>${index + 1}</span></label>
        <select id="splits${index + 1}" class="exercise-card">
        </select>
      </div>
    `
  });
  populateOptions(splits)
}
function updateScheduleInputs() {
  plannerSchedule.innerHTML = ''
  let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  let splitsCounter = manySplits.value
  let list = []
  for (let i = 0; i < splitsCounter; i++) {
    list.push(abc[i])
  }
  let restDaysCounter = plannerRestDays.value
  if (restDaysCounter > 10) {
    restDaysCounter = 10
    plannerRestDays.value = 10
  }
  for (let i = 0; i < restDaysCounter; i++) {
    list.push('rest')
  }
  generateCreateSplitsInputs(list)
}
function getCrateInputsValues(planner, doc, position) {
  let allInputs = []
  submitPlannerBtn.onclick = (event) => {
    if (confirm('Confirm changes?')) {
      let name = plannerName.value
      let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
      let splitNames = []
      let splitsTagsElements = newSplitsNames.children.length
      for (let i = 0; i < splitsTagsElements; i++) {
        let name = document.getElementById(`split-${abc[i]}-name`).value
        splitNames.push(name)
      }
      let splitSchedule = []
      let scheduleTagsElements = plannerSchedule.children.length
      for (let i = 0; i < scheduleTagsElements; i++) {
        let split = document.getElementById(`splits${i + 1}`).value
        splitSchedule.push(split)
      }
      let passTest = testInputs(name, splitNames, startDate)
      if (!passTest.result) {
        alert(passTest)
      } else {
        allInputs.push(name, splitNames, splitSchedule, startDate.value)
        console.log(allInputs)
        console.log(planner)
        console.log(doc)
        formContainer.classList.toggle('hide')
        setTimeout(() => {
          updatePlannerDb(planner, allInputs, doc, position)
        }, 200);
        alert('Planner Created!!')
        /* udpate planner and submit */
      }
    }
  }
}
function testInputs(name, splitsNames, startDate) {
  let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
  let result = false
  let alert = ''
  if (name == '') {
    return alert = 'Planner needs to be named!'
  }
  if (manySplits.value == 0) {
    return alert = "There is no splits added. "
  }
  let splitsTagsElements = newSplitsNames.children.length
  for (let i = 0; i < splitsTagsElements; i++) {
    let name = document.getElementById(`split-${abc[i]}-name`).value
    if (name == '') {
      return alert = 'All the splits needs to be named'
    }
  }
  if (startDate.value == '') {
    return alert = 'Start Date needs to be defined!'
  }
  result = true
  let obj = { result, alert }
  return obj
}

/* -----------------  FOR EDIT FORM  ------------------- */
async function generateEditInputs(splitsContainer, plannerSchedule, planner, newSplitsNames, doc) {
  let splits = Object.keys(planner.split).sort()
  splitsContainer.innerHTML = ''
  splits.forEach((split, index) => {
    if (index == splits.length - 1) {
      splitsContainer.innerHTML += `
      <div name="split${index}">
        <label for="split-${split}" style="font-size:1.25em">Split  <span>${split}</span> :</label>
        <div style="display:flex;">
          <input style="font-size:1.5em" type="text" name="split-${split}" id="split-${split}" class="content-card"
              value="${planner.split[split].title}" placeholder="New split name" required>
          <div class="remove-btn">
            <svg id="remove-split" class="edit" width="20" height="25" viewBox="0 0 207 242" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.01928 51.3278H201.066C201.066 51.3278 203.567 51.1478 204.639 50.1407C205.781 49.067 206.021 46.3724 206.021 46.3724V24.6157C206.021 23.4292 205.311 21.2587 203.855 19.7965C202.391 18.3258 200.436 17.6073 199.013 17.6073H134.154V10.2029C134.154 8.5026 132.968 5.1025 131.218 3.31854C129.414 1.47896 125.699 0.299053 123.428 0.299082C114.983 0.29919 109.211 0.282821 103.508 0.266648C97.9304 0.250832 92.4187 0.235202 84.5377 0.235353C82.9606 0.235385 78.66 1.37498 76.8683 3.13737C75.0305 4.94515 73.843 6.88149 73.843 9.00451V17.6073H7.47263C6.11925 17.6073 4.12165 18.7415 2.62848 20.2951C1.23252 21.7475 0.206093 23.2155 0.205457 24.8491C0.203449 30.0067 0.204081 33.783 0.204764 37.8621C0.205201 40.4745 0.205659 43.211 0.205457 46.514C0.205366 48.0038 0.653652 49.7014 1.3468 50.3544C2.38506 51.3326 3.99439 51.3297 4.91223 51.328L5.01928 51.3278Z" fill="white"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6154 241.702H173.793C176.622 241.702 179.027 240.542 181.265 238.23C183.41 236.015 184.477 231.018 184.477 231.018C184.477 231.018 193.914 133.691 199.013 84.0026C199.338 80.832 198.275 78.5999 195.924 76.4481C193.795 74.4997 191.43 73.9569 188.967 73.9569C156.422 73.9569 131.218 73.8884 105.931 73.8197C80.4758 73.7505 54.9365 73.681 21.739 73.681C18.0718 73.681 14.1603 75.063 11.7292 77.3082C9.0262 79.8045 8.50124 83.9913 8.67161 85.5604C14.4598 138.871 22.9311 231.018 22.9311 231.018C22.9311 231.018 24.1434 235.985 26.318 238.192C28.5378 240.444 31.7285 241.702 33.6154 241.702ZM92.9048 119.853C92.9066 140.596 92.9062 165.055 92.9048 194.019C92.9046 197.937 97.4764 202.692 102.515 202.629C107.485 202.567 111.886 197.567 111.886 194.019V119.853C111.886 116.935 107.14 112.669 102.515 112.613C97.8164 112.556 92.9045 116.565 92.9048 119.853ZM52.3855 194.466C50.8711 165.542 49.5914 141.116 48.504 120.402C48.3316 117.118 53.0269 112.857 57.7221 112.668C62.3432 112.482 67.3069 116.494 67.4597 119.408L71.3412 193.472C71.5269 197.016 67.3927 202.239 62.4332 202.561C57.4048 202.888 52.5904 198.378 52.3855 194.466ZM139.935 119.408C138.851 140.123 137.571 164.549 136.053 193.472C135.848 197.385 140.165 202.373 145.2 202.574C150.166 202.772 154.823 198.009 155.009 194.466L158.891 120.402C159.043 117.487 154.526 112.979 149.911 112.681C145.222 112.378 140.107 116.124 139.935 119.408Z" fill="white"></path>
            </svg>
          </div>
        </div>
      </div>
      `
      return
    }
    splitsContainer.innerHTML += `
    <div name="split${index}">
      <label for="split-${split}" style="font-size:1.25em">Split  <span>${split}</span> :</label>
      <input style="font-size:1.5em" type="text" name="split-${split}" id="split-${split}" class="content-card"
          value="${planner.split[split].title}" required>
    </div>
    `
  });
  newSplitsNames.innerHTML = ''
  newSplitsNames.innerHTML += `
  <button type="button" id="addFormSplitsButtom" class="pro-btn" style="border: 0.2em solid var(--blue); box-shadow: 0 0 6px var(--blue); margin-bottom: 1em">+ Add new split</button>
  `
}
function generateSplitsInputList(planner) {
  let scheduleList = planner.schedule.split(/\s*,\s*/)
  let restDays = scheduleList.filter(rest => rest == 'rest').length
  plannerRestDays.value = restDays
  plannerSchedule.innerHTML = ''
  scheduleList.forEach((split, index) => {
    plannerSchedule.innerHTML += `
      <div style="display: grid;place-items: center;">
        <label for="planner-split-schedule${index + 1}">Day <span>${index + 1}</span></label>
        <select id="splits${index + 1}" class="exercise-card">
        </select>
      </div>
    `
  });
  populateOptions(scheduleList)

  plannerRestDays.onchange = () => {
    scheduleList = scheduleList.filter(rest => rest !== 'rest')
    let loop = plannerRestDays.value
    for (let i = 0; i < loop; i++) {
      scheduleList.push('rest')
    }
    plannerSchedule.innerHTML = ''
    scheduleList.forEach((split, index) => {
      plannerSchedule.innerHTML += `
      <div style="display: grid;place-items: center;">
        <label for="planner-split-schedule${index + 1}">Day <span>${index + 1}</span></label>
        <select id="splits${index + 1}" class="exercise-card">
        </select>
      </div>
    `
    });
    populateOptions(scheduleList)
  }
}
function populateOptions(schedule) {
  schedule.forEach((split, index) => {
    let id = 'splits' + `${index + 1}`
    let element = document.getElementById(id)
    element.innerHTML = ''
    schedule.forEach(split => {
      element.innerHTML += `
      <option name="${split}">${split}</option>
      `
    });
    let options = Array.from(element.children)
    options.forEach(option => {
      let tag = option.attributes.name.value
      if (tag == split) {
        return option.setAttribute('selected', true)
      }
    });
  });
}
function hendleStartDate(planner, startDate) {
  let fullStartDate = new Date(Date(planner.startDate.seconds))
  let day = null
  planner.name == "PUSH PULL LEGS by Jeff" ? day = fullStartDate.getDate() - fullStartDate.getDay() + 1 : day = fullStartDate.getDate()
  let month = fullStartDate.getMonth() + 1
  let year = fullStartDate.getFullYear()
  let dateValue = []
  let array = [year, month, day]
  array.forEach(element => {
    element < 10 ? element = '0' + element : element = element.toString()
    dateValue.push(element)
  })
  startDate.value = dateValue.join('-')
}
async function addANewSplitOnForm(splitsContainer, plannerSchedule, planner, newSplitsNames) {
  let length = Object.keys(planner.split).length
  let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  let nextTag = abc[length]
  planner.split[nextTag] = createSplitStructure()
  let newSchedule = planner.schedule.split(',')
  newSchedule.push(nextTag)
  planner.schedule = newSchedule.join(',')
  await generateEditInputs(splitsContainer, plannerSchedule, planner, newSplitsNames).then(() => {
    generateSplitsInputList(planner)
    let addButton = document.getElementById('addFormSplitsButtom')
    addButton.onclick = () => {
      addANewSplitOnForm(splitsContainer, plannerSchedule, planner, newSplitsNames)
    }
  })
}
function removeSplitFeature(planner, doc, position) {
  let removeBtn = document.getElementById('remove-split')
  removeBtn.onclick = () => {
    if (confirm('Are you sure you want to delete this split?')) {
      let elementId = removeBtn.parentElement.parentElement.firstElementChild.id
      let splitTag = elementId.slice(-1)
      delete planner.split[splitTag]
      let newSchedule = planner.schedule.split(',').filter(i => i !== splitTag)
      planner.schedule = newSchedule.join(',')
      buildPlannerForm(planner, doc, position)
    }
  }
}
function inputValuesRegister(planner, doc, position) {
  let allInputs = []
  submitPlannerBtn.onclick = (event) => {
    if (confirm('Confirm changes?')) {
      let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
      let splitNames = []
      Array.from(splitsContainer.children).forEach(element => {
        if (element.lastElementChild.value !== undefined) {
          return splitNames.push(element.lastElementChild.value)
        }
        let child = element.children.item(element.children.length - 1)
        return splitNames.push(child.firstElementChild.value)
      })
      let splitScheduleInput = []
      Array.from(plannerSchedule.children).forEach(element => splitScheduleInput.push(element.lastElementChild.value))
      allInputs.push(plannerName.value, splitNames, splitScheduleInput, startDate.value)
      if (splitNames.filter(element => element == '').length > 0) {
        return alert('All the splits need to be named!')
      }
      formContainer.classList.toggle('hide')
      setTimeout(() => {
        updatePlannerDb(planner, allInputs, doc, position)
      }, 200);
      alert('Planner Updated!!')
    }
  }
}


export { editPlanner }