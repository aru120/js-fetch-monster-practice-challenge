const monsterContainer = document.querySelector("#monster-container")
const backBtn = document.querySelector("#back")
const forwardBtn = document.querySelector("#forward")
const createMonster = document.querySelector("#create-monster")
const form = document.createElement("form")
form.className = "Monster-Form"
const monsterForm = document.querySelector(".Monster-Form")


let flag = 1
//create function to render all monsters (up to 50)

createForm()


function initialzer(){
fetch(`http://localhost:3000/monsters/?_limit=50_page=1`)
.then(resp => resp.json())
.then(data => {
    data.forEach(monster =>{
          renderMonster(monster)
    }) 
})
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

backBtn.addEventListener("click",backward)
forwardBtn.addEventListener("click", forward)
createMonster.childNodes[0].addEventListener("submit",postMonster)

function forward(){
    flag++
    
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${flag}`)
    .then(resp => resp.json())
    .then(data => {
        monsterContainer.innerHTML = ""
    data.forEach(monster =>{
        renderMonster(monster)
    }) 
})
}

function backward(){
    if(flag < 2){
        alert("Can't go back")
        flag = 1
    }else{
    flag--
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${flag}`)
    .then(resp => resp.json())
    .then(data => {
        monsterContainer.innerHTML = ""
    data.forEach(monster =>{
        renderMonster(monster)
    }) 
})
    }
}

function createForm(){
    form.innerHTML = `
        <h3>Add a Monster</h3>
        <input type="text" name="name" value="" placeholder="Enter a name" class="input-text" />
        <input type="text" name="age" value="" placeholder="Enter an age" class="input-text" />
        <input type="text" name="description" value="" placeholder="Enter a description" class="input-text" />
        <input type="submit" value="Add Monster" class="submit"/>
    `
    createMonster.append(form)
}



function postMonster(e){
     e.preventDefault()
    const monObj = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }

    fetch("http://localhost:3000/monsters",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(monObj),
      })
      .then(function(resp){
        return resp.json()
      }).then(function(obj){
        createMonster.childNodes[0].reset()  
        renderMonster(obj)
      })

}


initialzer()
createForm()
