// TODO: Allow for multiple recipes
const cakeRecipes = [
    {
        name: 'Souffle Cheesecake',
        ingredients: [
            { 'name': 'Cake flour', 'weight': 16, 'unit': 'g', 'percentage': 62 },
            { 'name': 'Corn flour', 'weight': 10, 'unit': 'g', 'percentage': 38 },
            { 'name': 'Cream cheese', 'weight': 120, 'unit': 'g', 'percentage': 462 },
            { 'name': 'Butter', 'weight': 25, 'unit': 'g', 'percentage': 96 },
            { 'name': 'Milk', 'weight': 100, 'unit': 'g', 'percentage': 385 },
            { 'name': 'Egg yolk', 'weight': 44.4, 'unit': 'g', 'percentage': 171 },
            { 'name': 'Egg white', 'weight': 105.9, 'unit': 'g', 'percentage': 407 },
            { 'name': 'Sugar', 'weight': 50, 'unit': 'g', 'percentage': 192 }
        ]
    },
    {
        name: 'Castle Chocolate Cake',
        ingredients: [
            { 'name': 'Cake flour', 'weight': 50, 'unit': 'g', 'percentage': 83 },
            { 'name': 'Corn flour', 'weight': 10, 'unit': 'g', 'percentage': 17 },
            { 'name': 'Cocoa powder', 'weight': 10, 'unit': 'g', 'percentage': 17 },
            { 'name': 'Sugar', 'weight': 55, 'unit': 'g', 'percentage': 92 },
            { 'name': 'Milk', 'weight': 50, 'unit': 'g', 'percentage': 83 },
            { 'name': 'Oil', 'weight': 45, 'unit': 'g', 'percentage': 75 },
            { 'name': 'Egg yolk', 'weight': 59.2, 'unit': 'g', 'percentage': 99 },
            { 'name': 'Egg white', 'weight': 141.2, 'unit': 'g', 'percentage': 407 },
            { 'name': 'Salt', 'weight': 2, 'unit': 'g', 'percentage': 3 }
        ]
    },
    {
        name: 'Cinnamon Buns',
        ingredients: [
            { 'name': 'All purpose flour', 'weight': 330, 'unit': 'g', 'percentage': 100 },
            { 'name': 'Sugar', 'weight': 58, 'unit': 'g', 'percentage': 17.58 },
            { 'name': 'Salt', 'weight': 4, 'unit': 'g', 'percentage': 1.21 },
            { 'name': 'Instant yeast', 'weight': 4, 'unit': 'g', 'percentage': 1.21 },
            { 'name': 'Milk', 'weight': 195, 'unit': 'g', 'percentage': 59.09 },
            { 'name': 'Whole egg', 'weight': 55, 'unit': 'g', 'percentage': 16.67 },
            { 'name': 'Egg yolk', 'weight': 20, 'unit': 'g', 'percentage': 6.06 },
            { 'name': 'Unsalted butter', 'weight': 46, 'unit': 'g', 'percentage': 13.94 },
            { 'name': 'Cardamom powder', 'weight': 15, 'unit': 'g', 'percentage': 4.55 }
        ]
    },
    {
        name: 'Taiwanese Style Macaron',
        ingredients: [
            { 'name': 'Cake flour', 'weight': 170, 'unit': 'g', 'percentage': 100 },
            { 'name': 'Whole egg', 'weight': 165, 'unit': 'g', 'percentage': 97.06 },
            { 'name': 'Egg yolk', 'weight': 40, 'unit': 'g', 'percentage': 23.53 },
            { 'name': 'Sugar', 'weight': 150, 'unit': 'g', 'percentage': 88.24 }
        ]
    },
    {
        name: 'Chocolate Roll Cake',
        ingredients: [
            { 'name': 'Cake flour', 'weight': 38, 'unit': 'g', 'percentage': 100 },
            { 'name': 'Whole egg', 'weight': 100, 'unit': 'g', 'percentage': 236.16 },
            { 'name': 'Egg yolk', 'weight': 60, 'unit': 'g', 'percentage': 157.89 },
            { 'name': 'Sugar', 'weight': 50, 'unit': 'g', 'percentage': 131.58 },
            { 'name': 'Baking powder', 'weight': 1, 'unit': 'g', 'percentage': 2.63 },
            { 'name': 'Unsalted butter', 'weight': 20, 'unit': 'g', 'percentage': 52.63 }
        ]
    },
    {
        name: 'Irish Bailey Cheesecake',
        ingredients: [
            { 'name': 'Flour', 'weight': 15, 'unit': 'g', 'percentage': 100 },
            { 'name': 'Cream cheese', 'weight': 340, 'unit': 'g', 'percentage': 2266.67},
            { 'name': 'Sugar', 'weight': 70, 'unit': 'g', 'percentage': 466.67},
            { 'name': 'Sour cream', 'weight': 85, 'unit': 'g', 'percentage': 566.67},
            { 'name': 'Heavy cream', 'weight': 110, 'unit': 'g', 'percentage': 733.33},
            { 'name': 'Whole egg', 'weight': 165, 'unit': 'g', 'percentage': 1100},
            { 'name': 'Irish cream liqueur', 'weight': 50, 'unit': 'g', 'percentage': 333.33}
        ]
    },
    {
        name: 'Apple Tart',
        ingredients: [
            { 'name': 'Flour', 'weight': 80, 'unit': 'g', 'percentage': 100 },
            { 'name': 'Whole egg', 'weight': 110, 'unit': 'g', 'percentage': 137.50},
            { 'name': 'Sugar', 'weight': 50, 'unit': 'g', 'percentage': 62.50},
            { 'name': 'Baking powder', 'weight': 5, 'unit': 'g', 'percentage': 6.25},
            { 'name': 'Milk', 'weight': 100, 'unit': 'g', 'percentage': 125},
            { 'name': 'Melted butter', 'weight': 25, 'unit': 'g', 'percentage': 31.25}
        ]
    },
    {
        name: 'Honey Cake',
        ingredients: [
            { 'name': 'Flour', 'weight': 200, 'unit': 'g', 'percentage': 100 },
            { 'name': 'Egg yolk', 'weight': 148, 'unit': 'g', 'percentage': 74},
            { 'name': 'Egg white', 'weight': 283, 'unit': 'g', 'percentage': 141.50},
            { 'name': 'Sugar', 'weight': 200, 'unit': 'g', 'percentage': 100},
            { 'name': 'Honey', 'weight': 100, 'unit': 'g', 'percentage': 50},
            { 'name': 'Warm water', 'weight': 15, 'unit': 'g', 'percentage': 7.50}
        ]
    }
]
