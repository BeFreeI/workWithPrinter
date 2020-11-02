const chosePrinter = document.querySelector('select');
const printBtn = document.querySelector('button')
const inputArea = document.querySelector('.input-area')

let json = [
  {name: "description1"},
  {name: "description2"},
  {name: "description3"},
  {name: "description4"},
]

const createInpContainer = (obj) => {
  const inpContainer = document.createElement('div');
  const inp = document.createElement('input');
  inpContainer.classList.add('inp-container')
  const name = document.createElement('span')
  for(let val in obj){
    inp.placeholder = obj[val];
    name.textContent = val;
  }
  inpContainer.append(name, inp)
  return inpContainer;
}

const createInputs = (json) => {
  return json.map(obj => {
    return createInpContainer(obj)
  })
}

const getInfoInInputs = (inputs) => {
  const rez = inputs.map(container => {
    let name = container.firstChild.textContent
    let description = container.lastChild.value;
    return {
      name: description,
    }
  })
//==============//
  console.log(rez) //нужно будет его достать
//==============//
}

const clearInputArea = (inputArea) => {
  while(inputArea.hasChildNodes()){
    console.log(inputArea.firstChild)
    inputArea.firstChild.remove();
  }
}

const renderInputs = (inputArea, inputs) => {
  clearInputArea(inputArea)
  inputs.forEach(inp => inputArea.append(inp))
}

renderInputs(inputArea, createInputs(json))

printBtn.addEventListener('click', (inputs) => { getInfoInInputs(inputs)})
