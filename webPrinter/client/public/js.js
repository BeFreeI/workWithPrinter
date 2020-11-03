const chosePrinter = document.querySelector('#printers');
const choseSample = document.querySelector('#samples');
const printBtn = document.querySelector('button');
const inputArea = document.querySelector('.input-area');

const URL = 'http://localhost:8000/';

const addInfoIntoSelect = (select, strings) => {
    strings.forEach(str => {
        const option = document.createElement('option');
        option.textContent = str;
        select.append(option);
    })
}

fetch(URL + 'printers')
  .then((res) => {
    res.json().then((printers) => {
      addInfoIntoSelect(chosePrinter, printers);
    })
  });

fetch(URL +  'samples')
  .then((res) => {
    res.json().then((samples) => {
      addInfoIntoSelect(choseSample, samples);
    })
  });

choseSample.addEventListener('change', (event) => {
	fetch(URL + 'sample/show', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: event.target.value
    }).then((res) => {
			res.json().then((atributes) => {
				renderInputs(inputArea, createInputs(atributes));
			})
		})
});

const createInpContainer = (obj) => {
	const inpContainer = document.createElement('div');
	const inp = document.createElement('input');
	inpContainer.classList.add('inp-container');
	const name = document.createElement('span');
	for (let val in obj) {
		inp.placeholder = obj[val];
		name.textContent = val;
	}
	inpContainer.append(name, inp);
	return inpContainer;
}

const clearInputArea = (inputArea) => {
	while (inputArea.hasChildNodes()) {
			inputArea.firstChild.remove();
	};
}

const createInputs = (atributes) => {
	const rez = [];
	for (let atribut in atributes) {
		rez.push(createInpContainer({ [atribut]: atributes[atribut] }));
	}
	return rez;
}

const renderInputs = (inputArea, inputs) => {
	clearInputArea(inputArea);
	inputs.forEach(inp => inputArea.append(inp));
}

const getInfo = (inputArea, choseSample, chosePrinter) => {

    const getSelectedOption = (select) => {
        const option = Array.from(select.childNodes).find(option => {
            return option.selected;
        })
        return option.textContent;
    }

		const inputs = Array.from(inputArea.childNodes);
		const rez = {};
		inputs.forEach((input) => {
			let name = input.firstChild.textContent;
			let description = input.lastChild.value;
			rez[name] = description;
		})
		rez["sample"] = getSelectedOption(choseSample);
		rez["printer"] = getSelectedOption(chosePrinter);
		return rez;
}



printBtn.addEventListener('click', () => {
	fetch(URL + 'printers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
		},
		body: JSON.stringify(getInfo(inputArea, choseSample, chosePrinter))
	});
});
