import { logout, ifUserLogged } from "./database/userManager.js"

const menuElements = Array.from(document.getElementById('menu-icons').children)

menuElements.forEach((element) => {
  let selector = document.querySelector('#nav-selector')

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
        selector.style.top = `calc(${position('pro')}px - 85px)`
        break;
      case 'shop':
        selector.style.top = `calc(${position('shop')}px - 82px)`
        break;
      case 'config':
        selector.style.top = `calc(${position('config')}px - 80px)`
        break;
      default:
        break;
    }
  })
})

function position(id) {
  let metrics = document.getElementById(id).getBoundingClientRect()
  let top = metrics.y
  return top
}

const logoutIcon = document.getElementById('exit')

logoutIcon.onclick = logout