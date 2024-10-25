import '../styles/Inventory.css';
import React, { useEffect, useState } from 'react';

// Sample data to simulate the backend response
let sampleIngredients = [
  { id: 1, name: 'Milk', quantity: 5, expiry: '2024-10-14' },
  { id: 2, name: 'Cheese', quantity: 3, expiry: '2024-10-18' },
  { id: 3, name: 'Eggs', quantity: 12, expiry: '2024-10-20' },
];

// Mocked functions to simulate API calls
const fetchIngredients = async () => {
  return sampleIngredients; // Return the sample data as a mock response
};

const addIngredient = async (ingredient) => {
  const newId = sampleIngredients.length + 1;
  const newIngredient = { ...ingredient, id: newId };
  sampleIngredients.push(newIngredient); // Add to sample data
  return newIngredient;
};

const updateIngredient = async (id, updatedIngredient) => {
  sampleIngredients = sampleIngredients.map((ingredient) =>
    ingredient.id === id ? { ...updatedIngredient, id } : ingredient
  );
  return updatedIngredient;
};

const deleteIngredient = async (id) => {
  sampleIngredients = sampleIngredients.filter((ingredient) => ingredient.id !== id);
};

const InventoryManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [expiredItems, setExpiredItems] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: 0,
    expiry: '',
  });
  const [editingIngredient, setEditingIngredient] = useState(null);

  const loadIngredients = async () => {
    try {
      const data = await fetchIngredients();
      setIngredients(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingIngredient) {
        await updateIngredient(editingIngredient.id, newIngredient);
        setEditingIngredient(null); // Reset editing state
      } else {
        await addIngredient(newIngredient);
      }
      setNewIngredient({ name: '', quantity: 0, expiry: '' });
      loadIngredients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditIngredient = (item) => {
    setEditingIngredient(item);
    setNewIngredient({
      name: item.name,
      quantity: item.quantity,
      expiry: item.expiry,
    });
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await deleteIngredient(id);
      loadIngredients();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  useEffect(() => {
    const today = new Date();
    const upcomingAlerts = [];
    const expired = [];

    ingredients.forEach((item) => {
      const expiryDate = new Date(item.expiry);
      const timeDiff = expiryDate - today;
      const daysLeft = timeDiff / (1000 * 3600 * 24);

      if (daysLeft < 0) {
        expired.push(item);
      } else if (daysLeft <= 3) {
        upcomingAlerts.push(item);
      }
    });

    setAlerts(upcomingAlerts);
    setExpiredItems(expired);
  }, [ingredients]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="inventory-management">

      <div className="container">
        <div className="add-ingredient">
          <h2>Add Ingredient</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              value={newIngredient.name}
              placeholder="Ingredient Name"
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="quantity"
              value={newIngredient.quantity}
              placeholder="Quantity"
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="expiry"
              value={newIngredient.expiry}
              onChange={handleInputChange}
              required
            />
            <button type="submit">
              {editingIngredient ? 'Update Ingredient' : 'Add Ingredient'}
            </button>
          </form>
        </div>

        <div className="alerts">
          {expiredItems.length > 0 && (
            <div className="alert-box expired-alerts">
              <h2>Alert: Expired Items</h2>
              <ul>
                {expiredItems.map((expiredItem, index) => (
                  <li key={index} className="alert-item expired-item">
                    {expiredItem.name} has expired! (Expiry: {formatDate(expiredItem.expiry)})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {alerts.length > 0 && (
            <div className="alert-box">
              <h2>Alert: Items Close to Expiry</h2>
              <ul>
                {alerts.map((alertItem, index) => (
                  <li key={index} className="alert-item">
                    {alertItem.name} is expiring soon! (Expiry: {formatDate(alertItem.expiry)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item, index) => (
            <tr
              key={index}
              className={
                new Date(item.expiry) - new Date() <= 3 * 24 * 3600 * 1000
                  ? 'expiring-soon'
                  : ''
              }
            >
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{formatDate(item.expiry)}</td>
              <td>
                <button onClick={() => handleEditIngredient(item)}>Edit</button>
                <button onClick={() => handleDeleteIngredient(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;
