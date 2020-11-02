const chosePrinter = document.querySelector('select');
const printBtn = document.querySelector('button')

const inputArea = document.querySelector('.input-area')

let json = [
  {name: "description1"},
  {name: "description2"},
  {name: "description3"},
  {name: "description4"},
]

let inputs = json.map(obj => {
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
})


const getAllInputs = () => {
  const rez = inputs.map(container => {
    let name = container.firstChild.textContent
    let description = container.lastChild.value;
    return {
      name: description,
    }
  })
  console.log(rez)
}

inputs.forEach(inp => inputArea.append(inp))
printBtn.addEventListener('click', getAllInputs)
