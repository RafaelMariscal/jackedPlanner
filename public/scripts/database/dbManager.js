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
    liftedWeight: [],
    liftedReps: [],
  }
}
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
                name: '(DB) Bench Press',
                sets: 3,
                reps: 12,
                disc: 'The dumbbells goes down slightly below the sternum, with the arms angled like 120° to the body. Then, explosively, push the dumbells right up to the start position. obs: The arms do not lockup!',
                weightUnd: 'kg',
                setsWeight: [26, 30, 30],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 2,
                name: '(Sm) Incline Bench Press',
                sets: 4,
                reps: 10,
                disc: 'Put the bench(20°) right down the smith machine. The barbell goes down slightly below the sternum. the moviment is simple: go down ultil the arms make 90°, then go up. obs: The arms do not lockup.',
                weightUnd: 'kg',
                setsWeight: [40, 60, 60, 50],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 3,
                name: '(Cb) Chest Fly - Bench 90°',
                sets: 3,
                reps: 10,
                disc: 'Put the bench(90°) slightly in front of the crossover machine. The cabes position needs to be right at the sternum. Start with the arms semi-flexed(150°) and finish the movement with te arms completely straight.',
                weightUnd: 'plt',
                setsWeight: [3, 3, 3],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 3,
                name: 'Crossover',
                sets: 3,
                reps: 10,
                disc: "Just like the Cables Chest Fly, but you'll be standed and the arms goes down like 30° to your body.",
                weightUnd: 'plt',
                setsWeight: [3, 3, 3],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 4,
                name: '(DB) Lateral Raises',
                sets: 3,
                reps: 12,
                disc: 'With the arms semi-flexed(150°), raise the arms slightly in front of your body and goes up right to the level of your shoulders.',
                weightUnd: 'kg',
                setsWeight: [10, 12, 12],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 5,
                name: 'Military Overhead Press',
                sets: 4,
                reps: 8,
                disc: 'Start with the barbell right at the clavicle, tight up the gluts and core and press up the barbell like 90° to the floor, then go down to the start position',
                weightUnd: 'kg',
                setsWeight: [20, 24, 26, 28],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 6,
                name: '(Cb) Triceps Extension',
                sets: 3,
                reps: 12,
                disc: 'with 2 steps back to the cable machine, incline your body like 20°. Go down until the arms straight up, then return to a 70° arm anglo.',
                weightUnd: 'plt',
                setsWeight: [6, 8, 8],
                liftedWeight: [],
                liftedReps: []
              }
            ],
            notes: {
              cardio: {
                dist: 4,
                time: 45,
              },
              rate: '',
              notesTake: ''
            },
            date: ''
          },
          b: {
            title: 'Back',
            exercises: [
              {
                index: 1,
                name: 'Pull-ups',
                sets: 3,
                reps: 10,
                disc: 'Tight up the hams, gluts, and lowerback. When pull-up, the arms needs to be 90° with your body and reach the sternum.',
                weightUnd: 'kg',
                setsWeight: [0, 0, 0],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 2,
                name: 'Pull-down machine',
                sets: 4,
                reps: 12,
                disc: 'With the body a little bit inclined backwards, pulldown the barbell right to the sternum height and slightly in front of your body. The arms never goes completely straight.',
                weightUnd: 'plt',
                setsWeight: [8, 12, 12, 10],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 3,
                name: 'Incline Barbell Rows',
                sets: 4,
                reps: 10,
                disc: 'With the body inclined 120°, the latts needs to be fully extended. Befor row, lock your shoulders and make shure that the barbell goes right to your belly button, then return with a controlled moviment.',
                weightUnd: 'plt',
                setsWeight: [8, 12, 12, 10],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 4,
                name: 'Incline Bench Cable Row',
                sets: 3,
                reps: 10,
                disc: 'Put the bench(120°) 4 steps way of the pulldown machine. With the body leaning the bench and the kneed on the sit, start the pull down. The bar goes in the bench direction and as far as it goes, straight up your body.',
                weightUnd: 'plt',
                setsWeight: [6, 8, 8],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 5,
                name: '(w) Barbell Arms Curl',
                sets: 4,
                reps: 12,
                disc: 'With the arms right aside your body, curl the W barbell to 70°, then return to 160°.',
                weightUnd: 'kg',
                setsWeight: [18, 24, 24, 20],
                liftedWeight: [],
                liftedReps: []
              },
            ],
            notes: {
              cardio: {
                dist: 4,
                time: 45,
              },
              rate: '',
              notesTake: ''
            },
            date: ''
          },
          c: {
            title: 'Legs',
            exercises: [
              {
                index: 1,
                name: 'Squats',
                sets: 8,
                reps: 6,
                disc: 'With the feet shoulders-with apart, toes pointed slightly out and tight the core muscles. Send hips back and bend at knees at least to more then 90°. Press trough heels back up to straight up.',
                weightUnd: 'kg',
                setsWeight: [50, 70, 90, 100, 110, 110, 90, 90],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 2,
                name: 'Leg Extrension Machine',
                sets: 4,
                reps: 15,
                disc: 'With a dorsiflexion foot, the legs needs to be fully extended, then bend the knees almost to the machines full course',
                weightUnd: 'plt',
                setsWeight: [8, 10, 10, 10],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 4,
                name: 'Leg Press 45°',
                sets: 4,
                reps: 12,
                disc: 'With the feet slightly more then shouders-with and toes pointed a bit outwards, place it right at the middle of the machines support. Bend the knees as far as you can, then push it up',
                weightUnd: 'kg',
                setsWeight: [80, 100, 120, 120],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 4,
                name: 'Leg Curl Machine',
                sets: 4,
                reps: 15,
                disc: 'With a dorsiflexion foot and tight glutes, bend the knees as far as possible withou shrink the lowerback. then return it until the machines full course',
                weightUnd: 'kg',
                setsWeight: [6, 8, 8, 8],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 5,
                name: 'Barbell Stiff',
                sets: 4,
                reps: 12,
                disc: 'Take the barbell with the arms shouders-with apart. With the core muscles tight up and legs semi-flexed durring all the moviment, send hips back and bring the barbell right to your shins, then stiff it straight up.',
                weightUnd: 'kg',
                setsWeight: [30, 40, 50, 50],
                liftedWeight: [],
                liftedReps: []
              },
            ],
            notes: {
              cardio: {
                dist: 4,
                time: 45,
              },
              rate: '',
              notesTake: ''
            },
            date: ''
          },
          d: {
            title: 'Arms / Shoulders',
            exercises: [
              {
                index: 1,
                name: 'Rope Triceps Extension',
                sets: 3,
                reps: 12,
                disc: 'with 2 steps back to the cable machine, incline your body like 20°. Go down until the arms straight up, then return to a 70° arm anglo.',
                weightUnd: 'plt',
                setsWeight: [4, 6, 6],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 2,
                name: 'Close Grip Bench Press',
                sets: 3,
                reps: 15,
                disc: 'With the hands positioned slightly more then shoulders-width, the barbell goes down until the arms reach 90°, then explode straight up to almost lock up position.',
                weightUnd: 'kg',
                setsWeight: [40, 50, 50],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 2,
                name: 'Single-Arm Overhead Triceps Ext.',
                sets: 3,
                reps: 10,
                disc: '',
                weightUnd: 'plt',
                setsWeight: [2, 3, 3],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 3,
                name: '(Cb) Latteral Raise',
                sets: 4,
                reps: 12,
                disc: 'Using a wrist suppot, position yourself aside the machine with the cable passing between your legs and, with a semi-flexed arm, raise the arm to shouders height then return.',
                weightUnd: 'plt',
                setsWeight: [2, 3, 3, 3],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 4,
                name: 'Scott Curl Machine',
                sets: 3,
                reps: 10,
                disc: 'The arms goes down until reach 160° and then, explosively, curl it till the arms reach slughtly less then 90°.',
                weightUnd: 'plt',
                setsWeight: [6, 8, 10],
                liftedWeight: [],
                liftedReps: []
              },
              {
                index: 5,
                name: 'Incline Dumbell Curl',
                sets: 4,
                reps: 12,
                disc: 'With the bench at 110°, simultaneously and with supination, curl it till the arms reach slughtly less then 90°.',
                weightUnd: 'plt',
                setsWeight: [6, 8, 8],
                liftedWeight: [],
                liftedReps: []
              }
            ],
            notes: {
              cardio: {
                dist: 4,
                time: 45,
              },
              rate: '',
              notesTake: ''
            },
            date: ''
          },

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