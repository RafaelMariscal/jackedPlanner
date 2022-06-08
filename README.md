

<p align="center">
  <a href="#About">About this Project</a> |
  <a href="#Why">Why this Project</a> |
  <a href="#Functionalities">Functionalities</a> |
  <a href="#GettingStarted">GettingStarted</a> |
  <a href="#Contributing">Contributing</a> |
  <a href="#License">License</a>
</p>

<h1 align="center">Jacked Planner</h1> 

<h3 align="center">if you want to take a look, just follow the link: </br></br> 
>> <a href="https://jackedplanner.web.app">https://jackedplanner.web.app</a> << </h3>

![Preview-Screens](https://github.com/RafaelMariscal/jackedPlanner/blob/master/public/assets/screenShots/ScreenShots1.png.png)


<h2 id="About">About this Project</h2>

The idea of the Project is:

_"Organize all training data into a simple dashboard, focusing on maximizing fitness results"._'

**PS:** All the code insede this app can be reused for any application. So you can reuse everything at this repo!


<h2 id="Why">Why this Project?</h2>

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: <a href="mailto: rafael_mariscal_@outlook.com">rafael_mariscal_@outlook.com</a>

Connect with me at [LinkedIn](https://www.linkedin.com/in/rafael-mariscal/).

Also, you can use this Project as you wish! It's free!


<h2 id="Observations">Some Observations About This Project</h2>

1 - The app design was created by me =D So let me know if you liked it, and also feel free to send me your feedback or even to contribute with this project. 

2 - The Login/Register works only for Email/Password, using Firebase Auth methods. The buttons for login with Apple, Google and Facebook accounts are only for UI matters.

3 - At the dashboard page, the only menu area that is working is the dashboard/home option, all the others are just for UI matters too.

4 - This is a personal project for portfolio reasons. Thus, the main focus is to put into practice some Javascript, HTML, CSS and Firebase skills to reproduce a random idea for a web application and understand the main difficulties and challenges to make it work properly.

<h3>Follow the link bellow to access the application: >> <a href="https://jackedplanner.web.app">https://jackedplanner.web.app</a> << </h3>
</br>

<h2 id="Functionalities">Functionalities</h2>

- The web aplication consists in 2 pages: Login and Dashboard.
- Login Page:
  - Login Form
  - Create Account form
  - Forgot Password form
  - Aplication Description (CSS + JS Animations)
  - Pro user call (For Sales) ** Only for UI matters. 
  - 'Scroll to Top' button
 
- Dashboard Page:
  - Greeting user with the custom User Name.
  - Planner Controller
    - The standard version comes with the possibitie to create at maximum 3 different planners.
    - Every user recieve a demonstration planner called "PUSH PULL LEGS by JEFF" (Ref. to Jeff Nippard).
    - Planners CRUD > There is a custom form for both situations, create and edit Planner.
    - It can be diffined the Planner Name, at max 10 splits and rest days, a split schedule and the start date.
  - Calendar
    - Not just to show the current date, but also a controller for the splits exercises.
    - By clicking into a date, the exercise list for the split scheduled for this date will be printed.
    - it has a month controler at the arrows, increasing or deacreasign the months.
    - Also, a quick month menu by clicking at the calendar date title. 
  - Workout Section
    - The split name for the date selected will be printed aside the workout section title.
    - The exercises with the same index, means a superset of theses two exercises.
    - By selecting an exercise, all it sets will be printed at the Sets Wheight section.
    - If an exercise is selected, its description can be shown by clicking at descip. card, and also by clicking at exercise name card.
    - A 'To do' tag for the exercises not fully finished. If all the exercise's sets are done, the tag will recive a Done value.
    - Exercise CRUD > a form to add an exercise to the list and an edit exercise form shown when the edit icon is clicked.
    - It can be deffined the Exercise Index, Name, Sets, Reps and Description.
  - Sets Weight
    - For each set, a form its shown with the set index, set weight + unit, two inputs (Weight used and Reps lifted) and a set's done button.
    - Each set has a "done state", marking with a blueish collor. With all the sets done, the exercise recieve the same "done state".
    - Sets CRUD > a form to set the weight unit, and also add, remove and update sets.
  - Personal Notes
    - A form with Cardios section, Workout Rate, and the split day Notes
    - The split day cardio section will show the distance and time deffined for each cadio.
    - Also, each cardio section has a "done state", just like the exercises and sets.
    - Cardios CRUD > A form to add, remove and update cardios, setting the time(min) and distance(km) for each section.
  - Menu
    - A menu with 5 sections.
    - Home, Notes, PRO, Shop, Configs and logout.
    - At the momment, these sections are only for UI matters. The only section active is "Home"
  - Jacked Planner PRO call
    - Section to call a fictitious sale **IT'S NOT A REAL SALE SECTION!**
  - Weight History 
    - Only for UI matters, but it is an idea for PRO users to track their training progress.


<h2 id="GettingStarted">Getting Started</h2>

<h3>Prerequisites</h3>

- To run this project in the development mode, you'll need to have a basic environment to run a Firebase 8 App, that can be found [here](https://firebase.google.com/docs/web/setup?authuser=0&%3Bhl=pt&hl=pt)

- Also, you'll need to install:
    - Firebase Authentication, that can be found [here](https://firebase.google.com/docs/auth?authuser=0&hl=pt)
    - Firebase Hosting, that can be found [here](https://firebase.google.com/docs/hosting?authuser=0&hl=pt)
    - Cloud Firestore, that can be found [here](https://firebase.google.com/docs/firestore?authuser=0&hl=pt)

**PS:** By these links, you can access all the docmunentation necessary to make any changes that you want. Fell free to it!

<h3>Installing</h3>

**Cloning the Repository**

```
$ git clone https://github.com/RafaelMariscal/jackedPlanner
$ cd jackedPlanner
```

**Installing dependencies**

```
$ npm install
```

<h3>Conecting with a Firebase Project</h3>

- After create a Firebase Project, set up the Firebase Hosting feature <a href="https://console.firebase.google.com/u/0/project/jackedplanner/hosting/">here</a>

- At <a href="https://console.firebase.google.com/u/0/?hl=pt">Firebase Console</a>, access the project configuration hub and look for SDK configuration. There you will find a code painel with an object 'firebaseConfig'. That object contains the all the information necessary to link an application  to your project.

- To connect this application to your Firebase Project, just replace the firebaseConfig object in _public/scripts/database/**userManager.js**_ with the one found at the SDK configuration.

**PS:** Access the Terminal and use the command _firebase serve_ to serve at localHost 5000. Make the changes that you need and test what you want, then, if you want to daploy all the changes made, use the command _firebase deploy_.


<h2 id="Contributing">Contributing</h2>

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: <a href="mailto: rafael_mariscal_@outlook.com">rafael_mariscal_@outlook.com</a>

Connect with me at [LinkedIn](https://www.linkedin.com/in/rafael-mariscal/).

Thank you!

<h2 id="License">License</h2>

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/RafaelMariscal/jackedPlanner/blob/master/LICENSE)
