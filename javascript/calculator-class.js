class AbstractIngredient {
    constructor(id, name, weight, unit){
        if (new.target === AbstractIngredient) {
            throw new Error('Cannot create an instance of an abstract Ingredient, choose a specific ingredient instead.');
        }
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.unit = unit;
    }
  
    toString() {
        return `${this.name}: ${this.weight}${this.unit}`;
    }
  }
  
  class Flour extends AbstractIngredient{
    constructor(id, name, weight, unit){
        super(id, name, weight, unit);
        this.isFlour = true;
        this.percentage = 0;
    }

    setWeight(weight){
        this.weight = weight;
        this.percentage = this.calculatePercentage();
    }

    calculatePercentage() {
        return (this.weight / this.weight) * 100;
    }
  }
  
  class NonFlour extends AbstractIngredient{
    constructor(id, name, weight, unit){
        super(id, name, weight, unit);
        this.isFlour = false;
        this.percentage = 0;
        this.flourBaseWeight = 0;
    }

    setWeight(weight){
        this.weight = weight;
        this.percentage = this.calculatePercentage();
    }

    setFlourWeight(weight){
        this.flourBaseWeight = weight;
        this.percentage = this.calculatePercentage();
    }

    calculatePercentage() {
        return (this.weight / this.flourBaseWeight) * 100;
    }    
  }
  
  class Recipe {
    constructor() {
        this.recipe = [];
    }
  
    addIngredient(ingredient) {
        this.recipe.push(ingredient);
    }
  
    deleteIngredient(ingredientId) {
        this.recipe = this.recipe.filter(element => element.id !== ingredientId);
    }
  
    updateIngredientWight(ingredientId, weight) {
        let getFlourRecord = this.recipe.filter(element => element.isFlour === true);
        console.log(getFlourRecord[0].weight);
        let getCurrentRecord = this.recipe.filter(element => element.id === ingredientId);
        
        if (getCurrentRecord[0].isFlour === false){
            getCurrentRecord[0].setWeight(weight);
            return getCurrentRecord[0].percentage;
        } else {
            //once the weight of flour been updated, need to update all percentage of items.
            let nonFlourArr = this.recipe.filter(x => x.isFlour === false);
            getCurrentRecord[0].setWeight(weight);
            this.updateAllIngredientsPercentage(nonFlourArr, weight);
            return getCurrentRecord[0].percentage;
        }  
    }

    updateAllIngredientsPercentage(nonFlourIngredientsArr, flourWeight){
        nonFlourIngredientsArr.forEach(x => {
            x.setFlourWeight(flourWeight);
            console.log(`${x.id} ${x.flourBaseWeight} ${x.name}`)});
    }
  }