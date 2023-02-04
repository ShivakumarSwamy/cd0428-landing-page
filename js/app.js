/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Menu Start Helper Functions
*/

function createNavMenuItem(section) {
  const menu_item = document.createElement("li")
  menu_item.setAttribute("id", `nav-${section.id}`)
  menu_item.innerHTML = `<a class="menu__link" href="#${section.id}">${section.dataset.nav}</a>`
  return menu_item
}

function createNavMenuItemsFragmentFromSections() {
  const sections = document.querySelector('main').querySelectorAll('section');
  const fragment = document.createDocumentFragment();

  sections.forEach(section => fragment.append(createNavMenuItem(section)))

  return fragment
}

function getSectionIdFromNavMenuItemId(nav_menu_item_id) {
  return nav_menu_item_id.split("-")[1]
}

function getSectionToNavigateFromMenuItem(menu_item) {
  return document.querySelector('main')
          .querySelector(`#${getSectionIdFromNavMenuItemId(menu_item.id)}`)
}

function makeNavMenuItemActive(section) {
  document.querySelector('nav')
          .querySelector('#navbar__list')
          .querySelector(`#nav-${section.id}`)
          .firstElementChild.classList.add("menu__link_active")
}

function makeNavMenuItemInActive(section) {
    document.querySelector('nav')
            .querySelector('#navbar__list')
            .querySelector(`#nav-${section.id}`)
            .firstElementChild.classList.remove("menu__link_active")
}

/**
 * Menu End Helper Functions
 * Section Start Helper Functions
*/

function isSectionNearTopOfViewport(section) {
  const sectionRectangle = section.getBoundingClientRect();
  return (Math.abs(sectionRectangle.y) <= sectionRectangle.bottom)
         && (sectionRectangle.y <= sectionRectangle.height / 2)
}

function makeSectionActive(section) {
  section.classList.add("landing__section_active")
}

function makeSectionInActive(section) {
  section.classList.remove("landing__section_active")
}

function internalMakeSectionActiveWhenNearTopOfSectionViewport(section) {
    if (isSectionNearTopOfViewport(section)) {
      makeSectionActive(section)
      makeNavMenuItemActive(section)
    } else {
      makeSectionInActive(section)
      makeNavMenuItemInActive(section)
    }
}

/**
 * Section End Helper Functions
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function populateNavMenuItems() {
    const menu = document.querySelector('nav').querySelector('#navbar__list');
    menu.appendChild(createNavMenuItemsFragmentFromSections())
}


// Add class 'active' to section when near top of viewport
function makeSectionActiveWhenNearTopOfSectionViewport() {
  document.querySelector('main')
          .querySelectorAll('section')
          .forEach(internalMakeSectionActiveWhenNearTopOfSectionViewport)
}

// Scroll to anchor ID using scrollTO event
function scrollToViewOnNavClick(event) {
    if (event.target.nodeName === "A") {
      event.preventDefault();
      getSectionToNavigateFromMenuItem(event.target.parentElement)
              .scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" })
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', populateNavMenuItems);

// Scroll to section on link click
document.querySelector('nav').querySelector('#navbar__list').addEventListener("click", scrollToViewOnNavClick)

// Set sections as active
document.addEventListener("scroll", makeSectionActiveWhenNearTopOfSectionViewport)

/**
 * End Events
*/