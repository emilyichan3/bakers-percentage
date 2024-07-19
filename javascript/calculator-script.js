const CALCULATOR_UNIT = 'g';
const CALCULATOR_PERCENT ='%';
const CALCULATOR_FLOUR = 'Flour';
const ROW_ID_SAVE_BUTTON_START_WITH = 'saveButtonRow';
const ROW_ID_EDIT_BUTTON_START_WITH = 'editButtonRow';
const ROW_ID_DELETE_BUTTON_START_WITH = 'deleteButtonRow';
var ingredientCount = 0;
var flourBasePercentage = 1;
var flourBaseWeight = 0;
var current_weight_data  = 0;
var customizedRecipe;

function submitFlourWeight(event) {
  event.preventDefault();

  const flourValue = document.getElementById('flourWeight');
  customizedRecipe = new Recipe();

  if (flourValue.value === '') {
    return;
  } else {
    addIngredientToTable(CALCULATOR_FLOUR, flourValue.value);
    document.getElementById('flour-input').classList.toggle('hidden');
    document.getElementById('addIngredientButton').addEventListener('click', addIngredient);
    document.getElementById('ingredient-input').classList.toggle('hidden');
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
  saveButton.innerText = 'save';

  saveButton.addEventListener('click', () => {
    saveIngredient(saveButton);
    toggleButton(saveButton);
  });

  return saveButton;
}

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
  let weight_Data = document.getElementById(editable_weightId).value;

  if (isNumber(weight_Data)) {
    if (parseFloat(weight_Data) >=0) {
      document.getElementById(weightId).innerHTML = weight_Data;
    } else {
      alert("Value must be greater than or equal to 0.");
    document.getElementById(weightId).innerHTML = current_weight_data;
    }
  } else {
    alert("Please enter a number of the weight");
    document.getElementById(weightId).innerHTML = current_weight_data;
  } 
}

function editIngredient(button){
  let rowNumber = (button.id).slice(13);
  console.log(rowNumber);
  let weightId = 'weightRow' + rowNumber;
  let weight_Cell = document.getElementById(weightId)
  current_weight_data  = weight_Cell.innerHTML;

  let editable_Cell = document.createElement('input');
  editable_Cell.setAttribute('type', 'number');
  editable_Cell.setAttribute('min', 0);
  editable_Cell.setAttribute('id', 'editable_'+weightId);
  editable_Cell.setAttribute('value', current_weight_data);
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
  // when click the edit button, to hide the save & delete button
  // when click the save button, to hide the save button and show the edit and delete button
  let rowId = (button.id).slice(13);
  let editButtonId = ROW_ID_EDIT_BUTTON_START_WITH + rowId;
  let saveButtonId = ROW_ID_SAVE_BUTTON_START_WITH + rowId;
  let deleteButtonId = ROW_ID_DELETE_BUTTON_START_WITH + rowId;

  document.getElementById(editButtonId).classList.toggle('hidden');
  document.getElementById(saveButtonId).classList.toggle('hidden');
  document.getElementById(deleteButtonId).classList.toggle('hidden');
}

function removeIngredient(button){
  let rowId = (button.id).slice(12).toLowerCase() ;
  console.log(rowId);
  let row = document.getElementById(rowId);
  row.remove();
  customizedRecipe.removeIngredient(rowId);
}

function addIngredient(){
  let ingredientName = document.getElementById('ingredientName');
  let ingredientWeight = document.getElementById('ingredientWeight');
  if (ValidateIngredientName(ingredientName.value) === true){
    if (isNumber(ingredientWeight.value)){
      addIngredientToTable(ingredientName.value, ingredientWeight.value);
      ingredientName.value = "";
      ingredientWeight.value = "";
    } else {
      alert("Please enter the current the weight of "+ingredientName.value);
    }
  } else {
    alert("Please enter the ingredient name");
  }
}

function isNumber(inputWeightValue) {
    let numbers = /^[-+]?[0-9]+$/;
    return (inputWeightValue.match(numbers));
};

function ValidateIngredientName(inputValue) {
  return inputValue.trim() !== "";
};

addEventListener('load', () => {
  document.querySelector('form').addEventListener('submit', submitFlourWeight);
});

function calculatePercentage(rowId, name, weight, unit){
  if (name === CALCULATOR_FLOUR){
      let flour = new Flour(rowId, name, weight, unit);
      flour.percentage = flour.getPercetage();
      flourBasePercentage = flour.percentage;
      flourBaseWeight = weight;
      customizedRecipe.addIngredient(flour);
      return flourBasePercentage;
  } else {
      let nonFlour = new NonFlour(rowId, name, weight, unit);
      nonFlour.getPercetage = flourBaseWeight;
      let nonFlourPercentage = nonFlour.percentage;
      customizedRecipe.addIngredient(nonFlour);
      return nonFlourPercentage;
  }
}

function updatePercentage(rowId){

}


