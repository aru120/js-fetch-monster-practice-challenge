const monsterContainer = document.querySelector("#monster-container")
const backBtn = document.querySelector("#back")
const forwardBtn = document.querySelector("#forward")
let flag = 1
//create function to render all monsters (up to 50)
createForm()

fetch(`http://localhost:3000/monsters/?_limit=50`)
.then(resp => resp.json())
.then(data => {
    data.forEach(monster =>{
          renderMonster(monster)
    }) 
})

forwardBtn.addEventListener("click", forward)

function forward(){
    flag++
    
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${flag}`)
    .then(resp => resp.json())
    .then(data => {
    data.forEach(monster =>{
        renderNewMonster(monster)
    }) 
})


}

function renderNewMonster(monObj){
    
}



function renderMonster(monObj){
    const div = document.createElement("div")

    div.dataset.id = monObj.id
    div.innerHTML = `
        <h2>${monObj.name}</h2>
        <h4>${monObj.age}</h4>
        <p>${monObj.description}</p>
    `
   monsterContainer.append(div) 
}


function createForm(){
    const createMonster = document.querySelector("#create-monster")
    const form = document.createElement("form")
    form.innerHTML = `
        <h3>Add a Monster</h3>
        <input type="text" name="name" value="" placeholder="Enter a name" class="input-text" />
        <input type="text" name="age" value="" placeholder="Enter an age" class="input-text" />
        <input type="text" name="description" value="" placeholder="Enter a description" class="input-text" />
        <input type="submit" value="Add Monster" class="submit"/>
    `
    createMonster.append(form)
}

