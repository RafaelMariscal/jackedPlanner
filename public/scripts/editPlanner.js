import { db } from "./database/userManager.js";

function editPlanner(doc, element, splitsCalendar) {

  togglePlannersForm()

  console.log(splitsCalendar)
  console.log(doc)
  let position = element.substr(element.length - 1);
  let plannerSelected = doc.planners[`planner${position}`]
  buildPlannerForm(plannerSelected)

}

function togglePlannersForm() {
  const formContainer = document.getElementById('planners-form-container')
  const form = document.getElementById('planners-form')
  const closeForm = document.getElementById('close-planners-form')
  formContainer.classList.toggle('hide')
  formContainer.addEventListener('click', (event) => {
    let clickOutside = form.contains(event.target)
    if (!clickOutside) {
      formContainer.classList.toggle('hide')
    }
  })
  closeForm.onclick = () => {
    formContainer.classList.toggle('hide')
  }
}

function buildPlannerForm(planner) {
  let formLegend = document.getElementById('planners-form-title')
  let plannerName = document.getElementById('plannerName')
  let splitsContainer = document.getElementById('planners-form-splits')
  let newSplitsNames = document.getElementById('new-planner-splits')
  let manySplits = document.getElementById('manySplits')
  let startDate = document.getElementById('planner-start-date')
  if (planner.name) {
    formLegend.innerText = 'Edit Planner'
    plannerName.value = planner.name
    let splits = Object.keys(planner.split).sort()
    splitsContainer.innerHTML = ''
    newSplitsNames.innerHTML = ''
    splits.forEach(split => {
      splitsContainer.innerHTML += `
      <label for="split-${split}" style="font-size:1.25em">Split  <span>${split}</span> :</label>
      <input style="font-size:1.5em" type="text" name="split-${split}" id="split-${split}" class="content-card"
          value="${planner.split[split].title}" required>
      `
    });

    /* Finish Edit Form itens */


  } else {
    formLegend.innerText = 'Create Planner'
    splitsContainer.innerHTML = `
      <label for="manySplits">How many splits:</label>
      <div id="add-splits">
        <input type="number" name="manySplits" id="manySplits" class="content-card"
          placeholder="(Max 10 planners)" required>
        <button type="button" id="add-splits-btn" class="content-card">add</button>
      </div>
      <p>Info: Click on "add" button to generate splits inputs</p>
    `
    newSplitsNames.innerHTML = `
      <label for="split-a-name">Name for split <span id="split-label">"a"</span> :
        <input type="text" name="split-a-name" id="split-a-name" class="content-card" style="font-size: 1em"
          placeholder="Chest and Shoulderss" required>
      </label>
    `

    /* ações de criação */
  }

  /* -------------------------------------------------------------------------
      Fazer o formulário aparecer

      formulário deve conter os seguintes inputs:
         
          name: "string";
          schedule: "aray";
          split: "obj";    ---- colocar um input number com a qtd de splits, printando a qtd certa de inputs  ----
                a: "obj",
                b: "obj",
                c: "obj",
                d: "obj",
                          title: "string",
                          exercises: "array",
                                          0: "obj":
                                                    index: "number",
                                                    name: "string",
                                                    sets: "number",
                                                    reps: "number",
                                                    disc: "string,"
                                                    setsWeight: "array",
                                                    weightUnd: "string",
                                                    liftedWeight: "array",
                                                    liftedReps: "array"
                                          1: "obj":
                                                    index: "number",
                                                    ...
                          date: "date"
                          notes: "obj"
                                          cardio: "obj",
                                                    dist: "number",
                                                    time: "number" 
                                          notesTake: "string",
                                          rate: "string"

          startDate: fórmula Firebase para impor data(current date).        
*/
}

export { editPlanner }