function init(){
    let recipeName = window.location.hash.slice(1).replaceAll('_', ' ');
    let img_recipeName = window.location.hash.slice(1);
    let targetRecipe = cakeRecipes.filter( rec => rec.name === recipeName);
    let title = document.getElementById('recipe-title');

    title.innerText = recipeName;

    let allIngredients = targetRecipe.map( x => x.ingredients)[0];
    for (let ingredientDetail in allIngredients) {
        addIngredient(allIngredients[ingredientDetail]);
      }

    //add image
    let recipeImgParent = document.getElementById('recipe-img');
    let recipeImage = document.createElement('img');
    recipeImage.setAttribute('src', `images/small/${img_recipeName}.jpg`);
    recipeImage.setAttribute('alt', recipeName);
    recipeImage.classList.add('cropped-center-img');
    recipeImgParent.appendChild(recipeImage);
}

function addIngredient(ingredientDetail){
    let tbody = document.getElementById('recipe-ingredients');

    let nameTd = document.createElement('td');
    nameTd.innerText = ingredientDetail.name;

    let weightTd = document.createElement('td');
    weightTd.innerText = ingredientDetail.weight;
    
    let percentageTd = document.createElement('td');
    percentageTd.innerText = ingredientDetail.percentage + '%';

    let ingredientTr = document.createElement('tr');
    ingredientTr.append(nameTd, weightTd, percentageTd);

    tbody.appendChild(ingredientTr);
}


addEventListener('load', init);
