import { firebaseConfig, db, auth } from "./database/userManager.js";

const form = Array.from(document.getElementById('add-exercise').children)
const formValues = { index: '', name: '', sets: '', reps: '', discription: '' }
form.forEach((element) => {
  element.onchange = () => {
    formValues[element.name] = element.value
  }
})




const addBtn = document.getElementById('exerc-add')
addBtn.onclick = () => { }