import { logout } from "./database/userManager.js"

const menuElements = Array.from(document.getElementById('menu-icons').children)
var selector = document.querySelector('#nav-selector')
menuElements.forEach((element) => {
  element.addEventListener('click', () => {
    switch (element.id) {
      case 'home':
        selector.style.top = `calc(${position('home')}px - 78px)`
        showSection('home')
        break;
      case 'notes':
        position('notes')
        selector.style.top = `calc(${position('notes')}px - 78px)`
        showSection('notes')
        break;
      case 'pro':
        selector.style.top = `calc(${position('pro')}px - 78px)`
        showSection('pro')
        break;
      case 'shop':
        selector.style.top = `calc(${position('shop')}px - 78px)`
        showSection('shop')
        break;
      case 'config':
        selector.style.top = `calc(${position('config')}px - 78px)`
        showSection('config')
        break;
      default:
        break;
    }
  })
})

function showSection(i) {
  let notDone = document.getElementById('building')
  let secTop = document.getElementById('sec-top')
  let secMid = document.getElementById('sec-mid')
  let secBot = document.getElementById('sec-bottom')
  let array = [secTop, secMid, secBot]
  if (i === 'home') {
    notDone.classList = 'hide'
    array.forEach(element => {
      element.classList.remove('hide')
    });
    return
  } else {
    notDone.classList.remove('hide')
    array.forEach(element => {
      element.classList = 'cards-area hide'
    });
  }
}

const loadinghtml = `
<div id="building">
  <p>503</p>
  <p>Out of Reach...</p>
  <p>This section will be</p>
  <p>fully functional ASAP!!</p>
</div>
`

const logoutIcon = document.getElementById('exit')
logoutIcon.onclick = logout
const menuToggle = document.getElementById('toggle-menu')
const aside = document.getElementById('menu-area')
const dashArea = document.getElementById('dashboard-content')
menuToggle.addEventListener('click', () => {
  aside.classList.toggle('show')

  console.log(aside.classList)
  if (aside.classList == '') {
    const menuIcon = `     
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="#084236" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 6H21" stroke="#084236" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 18H21" stroke="#084236" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`
    menuToggle.innerHTML = menuIcon
    dashArea.style.padding = '1em 0 1em 1em'

  } else {
    const close = `     
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.4963 16.0872L1.93994 0.530884L0.525729 1.9451L16.0821 17.5014L17.4963 16.0872Z" fill="#8257E5"/>
          <path d="M16.0822 0.530809L0.525879 16.0872L1.94009 17.5014L17.4964 1.94502L16.0822 0.530809Z" fill="#8257E5"/>
        </svg>`
    menuToggle.innerHTML = close
    dashArea.style.padding = '1em 0 1em 12em'
  }
})

document.addEventListener('DOMContentLoaded', () => {
  selector.style.top = `calc(${position('home')}px - 78px)`
})

function position(id) {
  let metrics = document.getElementById(id).getBoundingClientRect()
  let top = metrics.y
  selector.style.height = metrics.height
  return top
}