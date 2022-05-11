import { db } from "./database/userManager.js";
import { generateCalendar } from "./calendar.js";
import { handleExercisesList } from "./exercise.js";
import { editPlanner } from "./editPlanner.js";
var userData = null
var splitsCalendar = undefined
var daySplit = null
let maximumLength = 180 /* base of days to have a split registered */
function getData() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let uid = user.uid;
      let userDoc = db.collection('users').doc(uid)
      userDoc.get().then((doc) => {
        if (doc.exists) {
          userData = doc.data()
          populateDashboard(userData)
        } else {
          console.log('no such document.')
        }
      })
    } else {
      console.log('No user logged.')
    }
    return userData
  });
}
getData()
const planDisplay = document.getElementById('planners-display')
async function populateDashboard(doc) {
  let greetings = document.getElementById('greetings')
  const greet = `<a href="#">Helo again, <span>${doc.userName}</span>!</a>`
  greetings.innerHTML = greet;

  let plannersList = populatePlannersList(doc)
  var plannerSelected = undefined
  await plannerSelector(plannersList, plannerSelected)
  setTimeout(() => {
    let editPlannerIcons = Array.from(document.getElementsByClassName('floating-icon'))
    editPlannerIcons.forEach((element) => {
      let id = element.id
      element.addEventListener('click', () => {
        editPlanner(doc, id, splitsCalendar)
      })
    })
  }, 300);
}
function populatePlannersList(doc) {
  planDisplay.innerHTML = ''
  let plan1 = doc.planners.planner1
  let plan2 = doc.planners.planner2
  let plan3 = doc.planners.planner3
  let plannersList = [plan1, plan2, plan3]
  plannersList.forEach(element => {
    let i = plannersList.indexOf(element) + 1
    let name = plannersList[i - 1].name
    if (!name) {
      name = 'Add a new planner'
    }
    const code = `
    <button id="plan${i}" class="content-card">
      <strong>${i}</strong>
      <p>${name}</p>
      <svg id="edit${i}" class="floating-icon" width="30" height="30" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </button>
    `
    planDisplay.innerHTML += code
  });
  return plannersList
}
async function plannerSelector(i, planner) {
  let currentDate = document.getElementsByClassName('curr-date')[0]
  let plannersButtons = Array.from(planDisplay.children)
  plannersButtons.forEach(element => {
    element.onclick = () => {
      let content = element.children[1].innerText
      plannersButtons.forEach(element => {
        element.classList = 'content-card'
      })
      switch (content) {
        case i[0].name:
          element.classList.add('selected-item')
          planner = i[0]
          createSplitsCalendar(planner).then((object) => {
            splitsCalendar = object.splitsSchedule
            let curr_month = object.curr_month.value
            let curr_year = object.curr_year.value
            handleMonthsDaysEvent(splitsCalendar, curr_year, curr_month, planner)
          })
          setTimeout(() => {
            currentDate.click()
          }, 100);
          return splitsCalendar
        case i[1].name:
          element.classList.add('selected-item')
          planner = i[1]
          console.log(planner)
          createSplitsCalendar(planner).then((object) => {
            splitsCalendar = object.splitsSchedule
            let curr_month = object.curr_month.value
            let curr_year = object.curr_year.value
            handleMonthsDaysEvent(splitsCalendar, curr_year, curr_month, planner)
          })
          setTimeout(() => {
            currentDate.click()
          }, 100);
          return splitsCalendar
        case i[2].name:
          element.classList.add('selected-item')
          planner = i[2]
          console.log(planner)
          createSplitsCalendar(planner).then((object) => {
            splitsCalendar = object.splitsSchedule
            let curr_month = object.curr_month.value
            let curr_year = object.curr_year.value
            handleMonthsDaysEvent(splitsCalendar, curr_year, curr_month, planner)
          })
          setTimeout(() => {
            currentDate.click()
          }, 100);
          return splitsCalendar
        default:
          const addPlannerText = '<p style="font-size:2em; text-align:center;">Add a new Planner!!</p>'
          document.getElementById('exercises-list').innerHTML = addPlannerText
          element.classList.add('selected-planner')
          planner = null
          let setsCards = document.getElementsByClassName('sets')[0]
          setsCards.innerHTML = ''
          return splitsCalendar
      }
    }
  });
  let plan1 = document.getElementById('plan1')
  setTimeout(() => {
    plan1.click()
  }, 100);

  return splitsCalendar
}
async function createSplitsCalendar(planner) {
  const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  let splits = planner.split
  let tags = []
  for (let i = 0; i < Object.keys(splits).length; i++) {
    tags.push(abc[i])
  }
  let splitsList = getSplitsLists(planner, tags)
  let splitsSchedule = {}
  let firstDay = getFirstMonday(planner).startDay
  let curr_month = getFirstMonday(planner).curr_month
  let curr_year = getFirstMonday(planner).curr_year
  for (let day = 0; day < splitsList.length; day++) {
    let date = new Date()
    let dateAfter = new Date(date.setDate(firstDay.getDate() + day))
    let nextDate = new Date(dateAfter.getFullYear(), dateAfter.getMonth(), dateAfter.getDate())
    splitsSchedule[nextDate] = splitsList[day]
  }
  return { splitsSchedule, curr_month, curr_year }
}
function getSplitsLists(planner, tags) {
  let splitsListInput = document.getElementById('splitsSchedule')  /* scheduleInput */
  if (!splitsListInput) {
    tags.push('rest')
    splitsListInput = tags.join(',')
  }
  if (planner.name == 'PUSH PULL LEGS by Jeff') {
    splitsListInput = 'a,b,c,rest,d,c,rest'
    db
  }
  let treatData = splitsListInput.replace(/\s+/g, '')
  let splitsList = treatData.split(',')
  let trainingDays = []
  while (trainingDays.length < maximumLength) {
    splitsList.forEach((day) => {
      trainingDays.push(day)
    })
  }
  return trainingDays
}
function getFirstMonday(planner) {
  let startDate = new Date(Date(planner.startDate.seconds))
  let firstMonday = startDate.getDate() - startDate.getDay() + 1
  let curr_month = startDate.getMonth()
  let curr_year = startDate.getFullYear()
  let startDay = new Date(curr_year, curr_month, firstMonday)

  let currDate = new Date()
  curr_month = { value: currDate.getMonth() }
  curr_year = { value: currDate.getFullYear() }

  let dateSelected = addMonthDaysClickEvent(curr_year, curr_month)
  if (!dateSelected) {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    dateSelected = new Date(year, month, day)
  }
  return { startDay, curr_month, curr_year }
}
function addMonthDaysClickEvent(curr_year, curr_month) {
  let monthDays = Array.from(document.getElementsByClassName('calendar-day-hover'))
  monthDays.forEach(element => {
    element.addEventListener('click', (e) => {
      return getDateSelected(element, curr_year, curr_month)
    })
  });
}
function getDateSelected(e, curr_year, curr_month) {
  let day = Number(e.innerText)
  let selected = new Date(curr_year.value, curr_month.value, day)
  return selected
}
async function handleMonthsDaysEvent(splitsCalendar, curr_year, curr_month, planner) {
  document.querySelector('#prev-year').onclick = () => {
    --curr_month
    if (curr_month == -1) {
      curr_month = 11
      --curr_year
    }
    generateCalendar(curr_month, curr_year)
    return clickEvent(splitsCalendar, curr_year, curr_month, planner)
  }
  document.querySelector('#next-year').onclick = () => {
    ++curr_month
    if (curr_month == 12) {
      curr_month = 0
      ++curr_year
    }
    generateCalendar(curr_month, curr_year)
    return clickEvent(splitsCalendar, curr_year, curr_month, planner)
  }
  return clickEvent(splitsCalendar, curr_year, curr_month, planner)
}
async function clickEvent(splitsCalendar, curr_year, curr_month, planner) {
  let calendar = Array.from(document.getElementsByClassName('calendar-day-hover'))
  calendar.forEach(element => {
    element.addEventListener('click', () => {
      calendar.forEach(element => {
        if (element.classList.value != 'calendar-day-hover curr-date'
          && element.classList.value != 'calendar-day-hover curr-date selected-date') {
          element.classList = 'calendar-day-hover'
        }
      });
      element.classList.add('selected-date')
      let day = element.innerText
      let date = new Date(curr_year, curr_month, day)
      Object.keys(splitsCalendar).forEach((key) => {
        if (key == date) {
          daySplit = splitsCalendar[key]
          let daySplitDoc = null
          daySplit == 'rest' ? daySplitDoc = 'rest' : daySplitDoc = planner.split[daySplit]
          handleExercisesList(planner, splitsCalendar, daySplitDoc, date)
        }
      })
      if (!daySplit) {
        return console.log('no day split found')
      }
    })
  })
}

export { getData, populatePlannersList }