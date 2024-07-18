const CALCULATOR_UNIT = 'g';
const CALCULATOR_PERCENT ='%';
const CALCULATOR_FLOUR = 'Flour';
const ROW_ID_SAVE_BUTTON_START_WITH = 'saveButtonRow';
const ROW_ID_EDIT_BUTTON_START_WITH = 'editButtonRow';
const ROW_ID_DELETE_BUTTON_START_WITH = 'deleteButtonRow';
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

  let buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-group');
  const saveButton = createSaveButton();
  const editButton = createEditButton();
  const deleteButton = createDeleteButton();

  buttonDiv.append(saveButton, editButton, deleteButton); 
  let ingredientTr = document.createElement('tr');

  ingredientTr.setAttribute('id', rowId);
  ingredientTr.append(nameTd, weightTd, percentageTd, buttonDiv);
  tbody.appendChild(ingredientTr);

  

}
function createSaveButton() {

  const saveButton = document.createElement('button');

  saveButton.type = 'button';
  saveButton.classList.add('save-button', 'hidden');
  saveButton.setAttribute('id', ROW_ID_SAVE_BUTTON_START_WITH+ingredientCount);
  saveButton.setAttribute('onclick', "return ValidateTextBox()");

  saveButton.innerText = 'save';

  saveButton.addEventListener('click', () => {
    toggleButton(saveButton);
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
  editButton.classList.add('edit-button');

  editButton.setAttribute('id', ROW_ID_EDIT_BUTTON_START_WITH+ingredientCount);
  editButton.innerText = 'edit';
  
  editButton.addEventListener('click', () => {
    toggleButton(editButton);
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
  deleteButton.classList.add('delete-button');

  deleteButton.setAttribute('id', ROW_ID_DELETE_BUTTON_START_WITH+ingredientCount);
  deleteButton.innerText = 'x';
  
  deleteButton.addEventListener('click', () => {
    removeIngredient(deleteButton);
  });

  return deleteButton;
}
function toggleButton(button){
  // user clicks the edit button, to hide the save button
  // user clicks the save button, to hide the edit button
  let editButtonId = ROW_ID_EDIT_BUTTON_START_WITH + (button.id).slice(13);
  let saveButtonId = ROW_ID_SAVE_BUTTON_START_WITH + (button.id).slice(13);
  document.getElementById(editButtonId).classList.toggle('hidden');
  document.getElementById(saveButtonId).classList.toggle('hidden');
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


