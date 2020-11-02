const chosePrinter = document.querySelector('#printers');
const choseShablon = document.querySelector('#shablons');
const printBtn = document.querySelector('button')
const inputArea = document.querySelector('.input-area')

let json = [
    {a: "b"},
    {name: "bdskfl"},
    {a: "b"},
    {a: "b"},
]

let shablonStings = ["s1", "s2", "s3"]

let printerStrings = ["p1", "p2", "p3"]

const addInfoIntoSelect = (select, strings) => {
    strings.forEach(str => {
        const option = document.createElement('option')
        option.textContent = str;
        select.append(option);
    })
}

const renderAlert = (text) => {
    const alert = document.createElement('div');
    alert.classList.add('alert')
    alert.textContent = text;
    return alert;
}

const createInpContainer = (obj) => {
    const inpContainer = document.createElement('div');
    const inp = document.createElement('input');
    inpContainer.classList.add('inp-container')
    const name = document.createElement('span')
    for (let val in obj) {
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

const getInfo = (inputArea, choseShablon, chosePrinter) => {
    const getSelectedOption = (select) => {
        const option = Array.from(select.childNodes).find(option => {
            return option.selected;
        })
        return option.textContent;
    }

    const inputs = Array.from(inputArea.childNodes)
    const rez = inputs[0].classList.contains('alert') ? [] :
        inputs.map(container => {
            let name = container.firstChild.textContent
            let description = container.lastChild.value;
            return {
                name: description,
            }
        })
    rez.push({
        "sample": `${getSelectedOption(choseShablon)}`
    })
    rez.push({
        "printer": `${getSelectedOption(chosePrinter)}`
    })
//==============//
    console.log(rez) //нужно будет его достать
//==============//
}

const clearInputArea = (inputArea) => {
    while (inputArea.hasChildNodes()) {
        console.log(inputArea.firstChild)
        inputArea.firstChild.remove();
    }
}

const renderInputs = (inputArea, inputs) => {
    clearInputArea(inputArea)
    !inputs.length ?
        inputArea.append(renderAlert('вы не выбрали шаблон')) :
        inputs.forEach(inp => inputArea.append(inp))

}


addInfoIntoSelect(choseShablon, shablonStings)
addInfoIntoSelect(chosePrinter, printerStrings)

renderInputs(inputArea, createInputs(json))

printBtn.addEventListener('click', (inputs) => {
    getInfo(inputArea, choseShablon, chosePrinter)
})
