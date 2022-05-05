import { db } from "./database/userManager.js";

function editPlanner(doc, element, splitsCalendar) {
  console.log(splitsCalendar)
  console.log(doc)
  let position = element.substr(element.length - 1);
  let plannerSelected = doc.planners[`planner${position}`]
  console.log(plannerSelected.name)

  if (plannerSelected.name) {
    /* ações de edição */
    /* pegar cada item do plenner: Name, splitsList... */
  } else {
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