let btnClick = document.getElementById('btn')
let inputKey = document.getElementById('inputBox')
let listHolder = document.querySelector('ul')
let headBox = document.querySelector('body')

btnClick.addEventListener('click', addItemsClick)
inputKey.addEventListener('keypress', addItemsEnter)


function checkLength() {
  return inputKey.value.length
}

function addItemsClick () {
  if ( checkLength() <= 2 ) {
    warn(short)
  } else if ( checkLength() > 40 ) {
    warn(long)
  } else {
    createNewItem()
  }
}

function addItemsEnter () {
  if ( checkLength() <= 2 && event.keyCode === 13 ) {
    warn(short)
  } else if ( checkLength() <= 40 && event.keyCode === 13 ) {
    createNewItem()
  } else if ( checkLength() >= 41 && event.keyCode === 13 ){
    warn(long)
  }
}

// add, mark done, del

function createNewItem() {
  let newItem = document.createElement('li')
  newItem.classList.add('newItem')
  newItem.addEventListener('click', isDone)
  newItem.appendChild(document.createTextNode(inputKey.value))
  listHolder.appendChild(newItem)
  inputKey.value = ""

  function isDone() {
    newItem.classList.toggle('done')
  }

  let delBtn = document.createElement('button')
  let trashImg = document.createElement('img')
  trashImg.setAttribute('src', 'images/dustbin.png')
  trashImg.classList.add('delIcon')
  delBtn.addEventListener('click', delItem)
  delBtn.classList.add('delBtn')
  delBtn.appendChild(trashImg)
  newItem.appendChild(delBtn)

  function delItem() {
    if(confirm('Are you sure you want to delete this task?')) {
      this.parentNode.remove()
      warn(deleted)
    } else {}
  }
}

// action notification

let short = "Text must be atleast 3 characters"
let long = "Text must not exceed 30 characters"
let deleted = "Task deleted"

function warn(x) {
  let errorMessage = document.createElement('p')
  errorMessage.classList.add('addWarning')
  errorMessage.appendChild(document.createTextNode(x))
  headBox.appendChild(errorMessage)
  inputBox.value = ""

  setTimeout( doHide, 2500 )
  function doHide() {
    errorMessage.classList.toggle('hideMessage')
  }
}
