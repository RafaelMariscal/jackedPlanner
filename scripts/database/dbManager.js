import { db } from "./userManager.js";

function createPlannerStructure() {
  return {
    name: '',
    schedule: {
      daysOn1: 0,
      daysOn2: 0,
      daysOff1: 0,
      daysOff2: 0,
    },
    split: {
      a: createSplitStructure(),
    }
  }
}

function createSplitStructure() {
  return {
    title: '',
    exercises: [
      createExerciseStructure()
    ],
    notes: {
      cardio: {
        dist: 0,
        time: 0,
      },
      rate: '',
      notesTake: ''
    },
    date: ''
  }
}

function createExerciseStructure() {
  return {
    index: 0,
    name: '',
    sets: 0,
    reps: 0,
    disc: '',
    weightUnd: '',
    setsWeight: [],
    liftedWeight: []
  }
}

console.log(createPlannerStructure())

function dbStructure(uid) {
  return db.collection('users').doc(uid).update({
    planners: {
      planner1: {
        name: 'PUSH PULL LEGS by Jeff',
        schedule: {
          daysOn1: 3,
          daysOn2: 2,
          daysOff1: 1,
          daysOff2: 1,
        },
        split: {
          a: {
            title: 'Chest / Shoulders',
            exercises: [
              {
                index: 1,
                name: '',
                sets: 3,
                reps: 12,
                disc: '',
                weightUnd: '',
                setsWeight: [],
                liftedWeight: []
              },
            ],
            notes: {
              cardio: {
                dist: 0,
                time: 0,
              },
              rate: '',
              notesTake: ''
            },
            date: ''
          }
        }
      },
      planner2: {},
      planner3: {}
    }
  }).then(() => {
    console.log('New users database structure created')
  }).catch((err) => {
    console.log(err)
  })
}

export { dbStructure, createPlannerStructure, createSplitStructure, createExerciseStructure }


/* OBSERVAR CAMINHO DO DB STRUCTURE, CONFERIR E INICIAR O ROUTES */