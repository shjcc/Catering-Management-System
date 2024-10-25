import React, { useState } from 'react';
import "../styles/Production.css";

const recipes = {
    cake: { flour: 500, eggs: 2, sugar: 200, butter: 100 }, // 1 cake = 500g flour, 2 eggs, 200g sugar, 100g butter
    sandwich: { bread: 2, ham: 50, cheese: 20, lettuce: 10, tomato: 15 }, // 1 sandwich = 2 slices bread, 50g ham, 20g cheese, 10g lettuce, 15g tomato
    pancake: { flour: 100, milk: 150, eggs: 1, butter: 20 }, // 1 pancake = 100g flour, 150ml milk, 1 egg, 20g butter
    cookie: { flour: 250, sugar: 100, butter: 100, chocolate: 50 }, // 1 cookie = 250g flour, 100g sugar, 100g butter, 50g chocolate
    salad: { lettuce: 50, tomato: 30, cucumber: 20, oliveOil: 10, vinegar: 5 }, // 1 salad = 50g lettuce, 30g tomato, 20g cucumber, 10ml olive oil, 5ml vinegar
    pizza: { flour: 300, water: 200, yeast: 5, cheese: 100, tomatoSauce: 50 }, // 1 pizza = 300g flour, 200ml water, 5g yeast, 100g cheese, 50g tomato sauce
    pasta: { pasta: 200, water: 1000, salt: 10, oliveOil: 5, garlic: 10 }, // 1 serving pasta = 200g pasta, 1000ml water, 10g salt, 5ml olive oil, 10g garlic
    burger: { bun: 1, beefPatty: 150, cheese: 30, lettuce: 10, tomato: 20, onion: 15 }, // 1 burger = 1 bun, 150g beef patty, 30g cheese, 10g lettuce, 20g tomato, 15g onion
    soup: { water: 500, chicken: 100, carrot: 50, potato: 100, onion: 20 }, // 1 serving soup = 500ml water, 100g chicken, 50g carrot, 100g potato, 20g onion
    omelette: { eggs: 3, milk: 50, cheese: 30, ham: 50, pepper: 2 }, // 1 omelette = 3 eggs, 50ml milk, 30g cheese, 50g ham, 2g pepper
};

const ProductionManagement = () => {
    const [task, setTask] = useState({ product: 'cake', quantity: 1, date: '', time: '' });
    const [ingredients, setIngredients] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const calculateIngredients = () => {
        const selectedRecipe = recipes[task.product];
        const quantity = parseInt(task.quantity, 10);
        const calculatedIngredients = {};

        for (let ingredient in selectedRecipe) {
            calculatedIngredients[ingredient] = selectedRecipe[ingredient] * quantity;
        }

        setIngredients(calculatedIngredients);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateIngredients();
        // Additional logic for submitting the task can be added here.
    };

    return (
        <div className="production-container">
            <div className="production-content">
                <form className="production-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Product:</label>
                        <select name="product" value={task.product} onChange={handleInputChange}>
                            <option value="cake">Cake</option>
                            <option value="sandwich">Sandwich</option>
                        </select>
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={task.quantity}
                            onChange={handleInputChange}
                            min="1"
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input type="date" name="date" value={task.date} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Time:</label>
                        <input type="time" name="time" value={task.time} onChange={handleInputChange} />
                    </div>
                    <button type="submit">Schedule Production</button>
                </form>

                {Object.keys(ingredients).length > 0 && (
                    <div className="ingredients-list">
                        <h3>Required Ingredients for {task.quantity} {task.product}(s):</h3>
                        <ul>
                            {Object.entries(ingredients).map(([ingredient, amount]) => (
                                <li key={ingredient}>
                                    {ingredient}: {amount}g
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductionManagement;
