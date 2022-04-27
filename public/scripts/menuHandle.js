import { logout, ifUserLogged } from "./database/userManager.js"

const menuElements = Array.from(document.getElementById('menu-icons').children)
var selector = document.querySelector('#nav-selector')
menuElements.forEach((element) => {
  element.addEventListener('click', () => {
    switch (element.id) {
      case 'home':
        selector.style.top = `calc(${position('home')}px - 78px)`
        break;
      case 'notes':
        position('notes')
        selector.style.top = `calc(${position('notes')}px - 78px)`
        break;
      case 'pro':
        selector.style.top = `calc(${position('pro')}px - 78px)`
        break;
      case 'shop':
        selector.style.top = `calc(${position('shop')}px - 78px)`
        break;
      case 'config':
        selector.style.top = `calc(${position('config')}px - 78px)`
        break;
      default:
        break;
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  selector.style.top = `calc(${position('home')}px - 78px)`
})

function position(id) {
  let metrics = document.getElementById(id).getBoundingClientRect()
  let top = metrics.y
  selector.style.height = metrics.height
  console.log(metrics.height)
  return top
}

const logoutIcon = document.getElementById('exit')

logoutIcon.onclick = logout