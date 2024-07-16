const CALCULATOR_UNIT = 'g';
const CALCULATOR_PERCENT ='%';
const CALCULATOR_FLOUR = 'Flour';
var ingredientCount = 0;
var flourBasePercentage = 1;
var flourBaseWeight = 0;

function submitFlourWeight(event) {
  event.preventDefault();

  const flourValue = document.getElementById('flourWeight');

  if (flourValue.value === '') {
    return;
  } else {
    addIngredientToTable(CALCULATOR_FLOUR, flourValue.value);

    document.getElementById('addIngredient').addEventListener('click', addIngredient);
  }  
}

function addIngredientToTable(item, value){
  ingredientCount +=1;
  let rowId = 'row'+ingredientCount;
  let tbody = document.getElementById('calculator-ingredients');
  let nameTd = document.createElement('td');
  nameTd.innerText = item;

  let metricTd = document.createElement('td');
  metricTd.innerText = value + CALCULATOR_UNIT;
  
  let percentageTd = document.createElement('td');
  let calculateResult = calculatePercentage(rowId, item, value, CALCULATOR_UNIT)
  percentageTd.innerText = calculateResult + CALCULATOR_PERCENT;

  const deleteButton = createDeleteButton();

  let ingredientTr = document.createElement('tr');

  ingredientTr.setAttribute('id', rowId);
  ingredientTr.append(nameTd, metricTd, percentageTd, deleteButton);

  tbody.appendChild(ingredientTr);

  

}

function createDeleteButton() {

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

function calculatePercentage(id, name, weight, unit){
  if (name === CALCULATOR_FLOUR){
      let flour = new Flour(id, name, weight, unit);
      flourBasePercentage = flour.getPercetage();
      flourBaseWeight = weight;
      return flourBasePercentage;
  } else {
      let nonFlour = new NonFlour(id, name, weight, unit);
      let nonFlourPercentage = nonFlour.getPercetage();
      return nonFlourPercentage;
  }
}


