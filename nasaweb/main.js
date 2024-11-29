const projectPro = await fetch("https://funenight.github.io/manwtf/script.json")
const proj = await projectPro.json()

const template= document.querySelector("#project-card")

const wrapper= document.createElement("div")

function decideAgeText(age) {
    if (!age){
        return "Web Development -"
    }

    return age > 1 ? `Programming -` : "Machine Learning/AI -"
}

proj.forEach( proj => {
    const clone = template.content.cloneNode(true)
    clone.querySelector("h3").textContent = proj.name

    const img = clone.querySelector("img")
    img.src= proj.photo
    img.alt = `A ${proj.species} named ${proj.name}`

    const age = new Date().getFullYear() - proj.birthYear
    const ageText = decideAgeText(age)
    clone.querySelector(".type").textContent = ageText

    clone.querySelector(".difficulty").textContent = proj.species
    clone.querySelector(".description").textContent = proj.description
    clone.querySelector(".primary-btn").href = "form.html"

    wrapper.appendChild(clone)

})

document.querySelector(".projects").appendChild(wrapper)

const filterButtons = document.querySelectorAll(".filter-nav a")
filterButtons.forEach(el => {
    el.addEventListener("click", e => handleFilterClick(e))
})

function handleFilterClick(e) {
    let target = e.target

    e.preventDefault()
    filterButtons.forEach(el => {
        el.classList.remove("active")
    })
    target.classList.add("active")

    filterProj(target.dataset.filter)
}

function filterProj(life) {
    const allProj = document.querySelectorAll(".project-card")
    if (life == "all") {
        allProj.forEach(el => {
            el.style.display = ""
        })
    } else {
        allProj.forEach(el => {
            if (el.querySelector(".difficulty").textContent == life) {
                el.style.display = ""
            } else {
                el.style.display = "none"
            }
        })
    }
}