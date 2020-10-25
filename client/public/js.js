const chosePrinter = document.querySelector('select');
fetch('http://localhost:8000/printer')
  .then((res) => {
    res.json().then((printers) => {
      for(let i = 0; i < printers.length; i++) {
        let el = document.createElement("option");
        el.innerHTML = printers[i];
        chosePrinter.append(el);
      }
    })
  });

document.querySelector('button').addEventListener('click', () => {
  // console.log(document.querySelector('textarea').value);
  fetch('http://localhost:8000/printer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      printer: chosePrinter.value,
      string: document.querySelector('textarea').value.trim()
    })
  }).then((res) => {
    console.log(res);
  })
});

function changeButtonState() {
  if(chosePrinter.value !== "Выберите принтер" && document.querySelector('textarea').value !== "") {
    document.querySelector('button').removeAttribute('disabled');
  } else {
    document.querySelector('button').setAttribute('disabled', 'disabled');
  }
}

chosePrinter.addEventListener('change', changeButtonState);

document.querySelector('textarea').addEventListener('blur', changeButtonState);
