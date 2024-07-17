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

  let weightTd = document.createElement('td');
  weightTd.innerText = value;
  weightTd.setAttribute('id', 'weightRow'+ingredientCount)
  
  let percentageTd = document.createElement('td');
  let calculateResult = calculatePercentage(rowId, item, value, CALCULATOR_UNIT)
  percentageTd.innerText = calculateResult + CALCULATOR_PERCENT;

  const saveButton = createSaveButton();
  const editButton = createEditButton();
  const deleteButton = createDeleteButton();

  let ingredientTr = document.createElement('tr');

  ingredientTr.setAttribute('id', rowId);
  ingredientTr.append(nameTd, weightTd, percentageTd, saveButton, editButton, deleteButton);

  tbody.appendChild(ingredientTr);

  

}
function createSaveButton() {

  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.classList.add('btn','btn-primary','save');

  saveButton.setAttribute('id', 'saveButtonRow'+ingredientCount);
  saveButton.setAttribute('onclick', "return ValidateTextBox()");

  saveButton.innerText = 'save';
  saveButton.addEventListener('click', () => {
    saveIngredient(saveButton);
  });

  return saveButton;
}

function ValidateTextBox(textId) {
  if (document.getElementById("txtName").value.trim() == "") {
      alert("Please enter Name!");
      return false;
  }
};

function createEditButton() {

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.classList.add('btn','btn-info', 'edit');

  editButton.setAttribute('id', 'editButtonRow'+ingredientCount);
  editButton.innerText = 'edit';
  
  editButton.addEventListener('click', () => {
     editIngredient(editButton);
  });  
  return editButton;
}

function saveIngredient(button){
  let rowNumber = (button.id).slice(13);
  console.log(rowNumber);
  let editable_weightId = 'editable_weightRow' + rowNumber;
  let weightId = 'weightRow' + rowNumber;
  let weight_Data = document.getElementById(editable_weightId).value
  document.getElementById(weightId).innerHTML = weight_Data;
}

function editIngredient(button){
  let rowNumber = (button.id).slice(13);
  console.log(rowNumber);
  let weightId = 'weightRow' + rowNumber;
  let weight_Cell = document.getElementById(weightId)
  var weight_Data  = weight_Cell.innerHTML;

  let editable_Cell = document.createElement('input');
  editable_Cell.setAttribute('type', 'number');
  editable_Cell.setAttribute('min', 0);
  editable_Cell.setAttribute('id', 'editable_'+weightId);
  editable_Cell.setAttribute('value', weight_Data);
  editable_Cell.required = true;

  weight_Cell.innerHTML = "";
  weight_Cell.append(editable_Cell);
}

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('btn','btn-danger');

  deleteButton.setAttribute('id', 'deleteButtonRow'+ingredientCount);
  deleteButton.innerText = 'x';
  
  deleteButton.addEventListener('click', () => {
    removeIngredient(deleteButton);
  });

  return deleteButton;
}

function removeIngredient(button){
  let rowId = (button.id).slice(12).toLowerCase() ;
  console.log(rowId);
  let row = document.getElementById(rowId);
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


