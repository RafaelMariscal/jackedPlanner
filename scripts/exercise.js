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

const form = Array.from(document.getElementById('add-exercise').children)
const formValues = { index: '', name: '', sets: '', reps: '', discription: '' }
form.forEach((element) => {
  element.onchange = () => {
    formValues[element.name] = element.value
  }
})

const addBtn = document.getElementById('exerc-add')
addBtn.onclick = () => {
  if (formValues.index >= 1 && formValues.name !== ''
    && formValues.sets >= 1 && formValues.reps >= 1) {
    localStorage.setItem(localStorage.length, JSON.stringify(formValues))
  }
}

var exercList = []
var atualList = []
for (let i = 0; i <= localStorage.length - 1; i++) {
  exercList.push(JSON.parse(localStorage.getItem(i)))
}
console.log(exercList)
let exercises = document.getElementById('exercises-card')
let exerciseId = `exerc${exercises.children.length + 1}`
function populate() {
  for (let i = 0; i <= exercList.length - 1; i++) {
    let obj = exercList[i]
    exercises.innerHTML += `
    <div id="exerc${i}" class="exercises">
    <button id="exerc${i}-index" class="exercise-card">${obj.index}</button>
    <button id="exerc${i}-name" class="exercise-card">${obj.name}</button>
    <button id="exerc${i}-sets" class="exercise-card">${obj.sets}</button>
    <strong>X</strong>
    <button id="exerc${i}-reps" class="exercise-card">${obj.reps}</button>
    <button id="exerc${i}-disc" class="exercise-card">Discrip.</button>
    <button id="exerc${i}-done" class="exercise-card done-btn">DONE</button>
    <svg id="edit" class="edit" width="30" height="30" viewBox="0 0 800 800" fill="none"
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
  
    <div class="remove-btn">
    <svg id="remove" class="edit" width="25" height="30" viewBox="0 0 207 242" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.01928 51.3278H201.066C201.066 51.3278 203.567 51.1478 204.639 50.1407C205.781 49.067 206.021 46.3724 206.021 46.3724V24.6157C206.021 23.4292 205.311 21.2587 203.855 19.7965C202.391 18.3258 200.436 17.6073 199.013 17.6073H134.154V10.2029C134.154 8.5026 132.968 5.1025 131.218 3.31854C129.414 1.47896 125.699 0.299053 123.428 0.299082C114.983 0.29919 109.211 0.282821 103.508 0.266648C97.9304 0.250832 92.4187 0.235202 84.5377 0.235353C82.9606 0.235385 78.66 1.37498 76.8683 3.13737C75.0305 4.94515 73.843 6.88149 73.843 9.00451V17.6073H7.47263C6.11925 17.6073 4.12165 18.7415 2.62848 20.2951C1.23252 21.7475 0.206093 23.2155 0.205457 24.8491C0.203449 30.0067 0.204081 33.783 0.204764 37.8621C0.205201 40.4745 0.205659 43.211 0.205457 46.514C0.205366 48.0038 0.653652 49.7014 1.3468 50.3544C2.38506 51.3326 3.99439 51.3297 4.91223 51.328L5.01928 51.3278Z"
        fill="white" />
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M33.6154 241.702H173.793C176.622 241.702 179.027 240.542 181.265 238.23C183.41 236.015 184.477 231.018 184.477 231.018C184.477 231.018 193.914 133.691 199.013 84.0026C199.338 80.832 198.275 78.5999 195.924 76.4481C193.795 74.4997 191.43 73.9569 188.967 73.9569C156.422 73.9569 131.218 73.8884 105.931 73.8197C80.4758 73.7505 54.9365 73.681 21.739 73.681C18.0718 73.681 14.1603 75.063 11.7292 77.3082C9.0262 79.8045 8.50124 83.9913 8.67161 85.5604C14.4598 138.871 22.9311 231.018 22.9311 231.018C22.9311 231.018 24.1434 235.985 26.318 238.192C28.5378 240.444 31.7285 241.702 33.6154 241.702ZM92.9048 119.853C92.9066 140.596 92.9062 165.055 92.9048 194.019C92.9046 197.937 97.4764 202.692 102.515 202.629C107.485 202.567 111.886 197.567 111.886 194.019V119.853C111.886 116.935 107.14 112.669 102.515 112.613C97.8164 112.556 92.9045 116.565 92.9048 119.853ZM52.3855 194.466C50.8711 165.542 49.5914 141.116 48.504 120.402C48.3316 117.118 53.0269 112.857 57.7221 112.668C62.3432 112.482 67.3069 116.494 67.4597 119.408L71.3412 193.472C71.5269 197.016 67.3927 202.239 62.4332 202.561C57.4048 202.888 52.5904 198.378 52.3855 194.466ZM139.935 119.408C138.851 140.123 137.571 164.549 136.053 193.472C135.848 197.385 140.165 202.373 145.2 202.574C150.166 202.772 154.823 198.009 155.009 194.466L158.891 120.402C159.043 117.487 154.526 112.979 149.911 112.681C145.222 112.378 140.107 116.124 139.935 119.408Z"
        fill="white" />
    </svg>
    </div>
    
  </div>
    `
  }
}
populate()
console.log(localStorage)

const remove = Array.from(document.getElementsByClassName('remove-btn'))
remove.forEach(element => {
  element.onclick = () => {
    atualList = []
    let position = Number(String(element.parentElement.id).charAt(5))
    for (let i = 0; i < localStorage.length; i++) {
      if (i != position) {
        atualList.push(exercList[i])
      }
    }
    let i = 0
    localStorage.clear()
    while (i < atualList.length) {
      console.log(atualList[i])
      localStorage.setItem(i, JSON.stringify(atualList[i]))
      i++
    }
    window.location.reload()
  }
});