import React, { useState, useEffect } from 'react';
import "../styles/CRM.css";

const CRM = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState({ name: '', contact: '', orderHistory: '', preferences: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/customers');
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
    if (isEditing) {
      // Update existing customer
      try {
        await fetch(`http://localhost:5001/api/customers/${currentCustomer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentCustomer),
        });

        const updatedCustomers = [...customers];
        updatedCustomers[editingIndex] = currentCustomer;
        setCustomers(updatedCustomers);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    } else {
      // Add new customer
      try {
        const response = await fetch('http://localhost:5001/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentCustomer),
        });
        const newCustomer = await response.json();
        setCustomers([...customers, { ...currentCustomer, id: newCustomer.id }]);
        setCurrentCustomer({ name: '', contact: '', orderHistory: '', preferences: '' }); // Reset form
      } catch (error) {
        console.error('Error adding customer:', error);
      }
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
