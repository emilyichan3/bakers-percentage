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
  
    getPercetage(){
        this.percentage = (this.weight / this.weight) * 100;
        return this.percentage;
    } 
  }
  
  class NonFlour extends AbstractIngredient{
    constructor(id, name, weight, unit){
        super(id, name, weight, unit);
        this.isFlour = false;
        this.percentage = 0;
        this.flourBaseWeight = 0;
    }
    // getPercetage(){
    //     return Math.round((this.weight / this.flourBaseWeight) * 100);
    // }
    get getPercetage() {
        return this.percentage;
    }

    set getPercetage(flourWeight) {
        this.flourBaseWeight = flourWeight;
        this.percentage = Math.round((this.weight / this.flourBaseWeight) * 100);
        
    }
  }
  
  class Recipe {
    constructor() {
        this.recipe = [];
    }
  
    addIngredient(ingredient) {
        this.recipe.push(ingredient);
    }
  
    deleteIngredient(ingredient){
        this.recipe = this.recipe.filter(ingredient => id !== ingredient.id);
    }
  
    toString(){
        return this.recipe.map(x => x.toString()).join("</br>");
    }
  }