const CALCULATOR_UNIT = 'g';
const CALCULATOR_PERCENT ='%';
var ingredientCount = 0;

function submitFlourWeight(event) {
  event.preventDefault();

  const flourValue = document.getElementById('flourWeight');

  if (flourValue.value === '') {
    return;
  } else {
    addIngredientToTable('Flour', flourValue.value);
    document.getElementById('addIngredient').addEventListener('click', addIngredient);
  }  
}

function addIngredientToTable(item, value){
  let tbody = document.getElementById('calculator-ingredients');
  let nameTd = document.createElement('td');
  nameTd.innerText = item;

  let metricTd = document.createElement('td');
  metricTd.innerText = value + CALCULATOR_UNIT;
  
  let percentageTd = document.createElement('td');
  percentageTd.innerText = value + CALCULATOR_PERCENT;

  const deleteButton = createDeleteButton();

  let ingredientTr = document.createElement('tr');
  ingredientTr.setAttribute('id', 'row'+ingredientCount);
  ingredientTr.append(nameTd, metricTd, percentageTd, deleteButton);


  tbody.appendChild(ingredientTr);
}

function createDeleteButton() {
  ingredientCount +=1;
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('btn','btn-danger');

  deleteButton.setAttribute('id', 'row'+ingredientCount);
  deleteButton.innerText = 'x';
  
  deleteButton.addEventListener('click', () => {
    removeIngredient(deleteButton);
  });

  return deleteButton;
}

function removeIngredient(button){
  let number = button.id;
  console.log(number);
  let row = document.getElementById(number);
  row.remove();
}

function addIngredient(){
  let ingredientName = document.getElementById('ingredientName');
  let ingredientWeight = document.getElementById('ingredientWeight');
  
  addIngredientToTable(ingredientName.value, ingredientWeight.value);
}

addEventListener('load', () => {
  document.querySelector('form').addEventListener('submit', submitFlourWeight);
});
