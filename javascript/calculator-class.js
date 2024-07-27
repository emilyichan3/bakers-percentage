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
        return 100;
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
        if (this.flourBaseWeight !== 0){
            let oriPercertage = (this.weight / this.flourBaseWeight) * 100;
            if ( oriPercertage !== Math.floor(oriPercertage)) {
                // display 2 decimals if the percentage is not an integer.
                return Number.parseFloat(oriPercertage).toFixed(2);
            }
            else
            {
                return oriPercertage;
            }
        } else {
            return 0; 
        }        
    }    
  }
  
  class Recipe {
    constructor() {
        this.ingredients = [];
    }
  
    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }
  
    deleteIngredient(ingredientId) {
        this.ingredients = this.ingredients.filter(element => element.id !== ingredientId);
    }
  
    updateIngredientWeight(ingredientId, weight) {
        const flour = this.ingredients.find(element => element.isFlour);
        const ingredient = this.ingredients.find(element => element.id === ingredientId);
        
        if (!ingredient) return;

        if (!ingredient.isFlour && flour) {
            ingredient.setWeight(weight);
            ingredient.setFlourWeight(flour.weight);
        } else if (ingredient.isFlour) {
            ingredient.setWeight(weight);
            this.updateAllNonFlourPercentages(weight);
        }
    }

    updateAllNonFlourPercentages(flourWeight){
        this.ingredients.forEach(ingredient => {
            if (!ingredient.isFlour) {
                ingredient.setFlourWeight(flourWeight);
            }
        });
    }

    getIngredientPercent(ingredientId) {
        return this.ingredients.find(ingredient => ingredient.id === ingredientId).percentage;
    }

    getNonFlourIngredients() {
        return this.ingredients.filter(ingredient => !ingredient.isFlour);
    }

    getFlourWeight() {
        return this.ingredients.find(ingredient => ingredient.isFlour).weight;
    }
    
}