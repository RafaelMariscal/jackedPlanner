

<p align="center">
  <a href="#About">About this Project</a> |
  <a href="#Why">Why this Project</a> |
  <a href="#Functionalities">Functionalities</a> |
  <a href="#GettingStarted">GettingStarted</a> |
  <a href="#Contributing">Contributing</a> |
  <a href="#License">License</a>
</p>

<h1 align="center">Jacked Planner</h1> 

<h3 align="center">if you want to take a look, just follow the link: </br> 
>> <a href="https://jackedplanner.web.app">https://jackedplanner.web.app</a> << </h3>

![Preview-Screens](https://github.com/RafaelMariscal/jackedPlanner/blob/master/public/assets/screenShots/ScreenShots1.png.png)


<h2 id="About">About this Project</h2>

The idea of the Project is:

_"Organize all training data into a simple dashboard, focusing on maximizing fitness results"._'

**PS:** All the code insede this app can be reused for any application. So you can reuse everything at this repo!


<h2 id="Why">Why this project?</h2>

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: <a href="mailto: rafael_mariscal_@outlook.com">rafael_mariscal_@outlook.com</a>

Connect with me at [LinkedIn](https://www.linkedin.com/in/rafael-mariscal/).

Also, you can use this Project as you wish! It's free!


<h2 id="Observations">Some Observations about this application</h2>

1 - The app design was created by me =D So let me know if you liked it, and also feel free to send me your feedback or even to contribute with this project. 

2 - The Login/Register works only for Email/Password, using Firebase Auth methods. The buttons for login with Apple, Google and Facebook accounts are only for UI matters.

3 - At the dashboard page, the only menu area that is working is the dashboard/home option, all the others are just for UI matters too.

4 - This is a personal project for portfolio reasons. Thus, the main focus is to put into practice some Javascript, HTML, CSS and Firebase skills to reproduce a random idea for a web application and understand the main difficulties and challenges to make it work properly.

<h3>if you want to take a look, just follow the link: >> <a href="https://jackedplanner.web.app">https://jackedplanner.web.app</a> << </h3>
</br>

<h2 id="Functionalities">Functionalities</h2>

- The web aplication consists in 2 pages: Login and Dashboard.
- Login Page:
  - Login Form
  - Create Account form
  - Forgot Password form
  - Aplication Description (CSS Animations)
  - Pro user call (For Sales) ** Only for UI matters. 
  - 'Scroll to Top' button
 
- Dashboard Page:
  - Greeting user with the custom User Name.
  - Planner Controller
    - The standard version comes with the possibitie to create at maximum 3 different planners
    - Every user recieve a demonstration planner called "PUSH PULL LEGS by JEFF" (Ref. to Jeff Nippard)
  - Calendar
  - Workout Section
  - Sets Weight
  - Personal Notes
  - Menu
  - Jacked Planner PRO call
  - Weight History 


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

<h3>Conecting with a firebase</h3>

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
