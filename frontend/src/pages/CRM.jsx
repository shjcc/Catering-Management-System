import React, { useState, useEffect } from 'react';
import "../styles/CRM.css";

// Determine the API base URL based on the environment
const isProduction = import.meta.env.MODE === 'production';
const API_URL = isProduction ? 'https://cms-backend-ewuo.onrender.com/api/customers' : 'http://localhost:5001/api/customers';

const CRM = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState({ name: '', contact: '', orderHistory: '', preferences: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Add or Update customer
  const handleSave = async () => {
    const url = isEditing ? `${API_URL}/${currentCustomer.id}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCustomer),
      });
      
      const result = await response.json();

      if (isEditing) {
        // Update the customer list locally
        const updatedCustomers = [...customers];
        updatedCustomers[editingIndex] = currentCustomer;
        setCustomers(updatedCustomers);
        setIsEditing(false);
      } else {
        // Add new customer to the list
        setCustomers([...customers, { ...currentCustomer, id: result.id }]);
      }

      // Reset the form
      setCurrentCustomer({ name: '', contact: '', orderHistory: '', preferences: '' });
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} customer:`, error);
    }
  };

  // Edit customer
  const handleEdit = (index) => {
    setCurrentCustomer(customers[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Delete customer
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/customers/${id}`, { method: 'DELETE' });
      const updatedCustomers = customers.filter(customer => customer.id !== id);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="crm-container">
      <div className="form-section">
        <h2 className="form-title">{isEditing ? 'Edit Customer' : 'Add Customer'}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}>
          <input
            type="text"
            placeholder="Name"
            value={currentCustomer.name}
            onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Contact Details"
            value={currentCustomer.contact}
            onChange={(e) => setCurrentCustomer({ ...currentCustomer, contact: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Order History"
            value={currentCustomer.orderHistory}
            onChange={(e) => setCurrentCustomer({ ...currentCustomer, orderHistory: e.target.value })}
          />
          <select
            className="drop-down"
            value={currentCustomer.preferences}
            onChange={(e) => setCurrentCustomer({ ...currentCustomer, preferences: e.target.value })}
          >
            <option value="">Select Dietary Restrictions</option>
            <option value="Halal">Halal</option>
            <option value="Kosher">Kosher</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Gluten">Gluten</option>
            <option value="Lactose Intolerance">Lactose Intolerance</option>
            <option value="Alergies">Alergies</option>
            <option value="None">None</option>
          </select>
          <button type="submit">{isEditing ? 'Update Customer' : 'Add Customer'}</button>
        </form>
      </div>

      <div className="customer-list-section">
        <h2 className="list-title">Customer List</h2>
        <ul className="customer-list">
          {customers.map((customer, index) => (
            <li key={customer.id} className="customer-item">
              <strong>{customer.name}</strong> - {customer.contact}
              <br />
              Order History: {customer.orderHistory || 'None'}
              <br />
              Preferences: {customer.preferences || 'None'}
              <br />
              <div className="button-container">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(customer.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CRM;
