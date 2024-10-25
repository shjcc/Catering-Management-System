const API_URL = 'http://localhost:5001/api/inventory';

export const fetchIngredients = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  return await response.json();
};

export const addIngredient = async (ingredient) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  });
  if (!response.ok) {
    throw new Error('Failed to add ingredient');
  }
  return await response.json();
};

export const updateIngredient = async (id, ingredient) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  });
  if (!response.ok) {
    throw new Error('Failed to update ingredient');
  }
  return await response.json();
};

export const deleteIngredient = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete ingredient');
  }
};