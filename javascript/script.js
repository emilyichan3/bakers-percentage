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
    }

}

class NonFlour extends AbstractIngredient{
    constructor(id, name, weight, unit){
        super(id, name, weight, unit);
        this.isFlour = false;
    }

}

class Recipe {
    constructor() {
        this.recipe = [];
    }

    addIngredient(ingredient) {
        this.recipe.push(ingredient);
    }

    removeIngredient(ingredient){
        this.recipe = this.recipe.filter(item => item !== ingredient);
    }

    toString(){
        return this.recipe.map(x => x.toString()).join("</br>");
    }
}