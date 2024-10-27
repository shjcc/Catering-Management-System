import React, { useState } from 'react';
import dayjs from 'dayjs';
import "../styles/Order.css";

// Sample recipes for selection
const availableRecipes = ["cake", "sandwich", "pancake", "cookie", "salad", "pizza", "pasta", "burger", "soup", "omelette"];

const OrderForm = ({ onAddOrder }) => {
    const [customerName, setCustomerName] = useState('');
    const [status, setStatus] = useState('');
    const [orderType, setOrderType] = useState('Pickup');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [selectedItems, setSelectedItems] = useState([]); // Ensure selectedItems is an array

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = dayjs(scheduledDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const newOrder = { customerName, status, orderType, scheduledDate: formattedDate, scheduledTime, items: selectedItems };

        await onAddOrder(newOrder); // Send as array to backend

        setCustomerName('');
        setStatus('');
        setOrderType('Pickup');
        setScheduledDate('');
        setScheduledTime('');
        setSelectedItems([]);
    };

    const handleItemChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) selected.push(options[i].value);
        }
        setSelectedItems(selected); // Store selected items as array
    };

    return (
        <form onSubmit={handleSubmit} className="order-form">
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="order-input"
            />
            <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="order-select"
            >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
            <select 
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                required
                className="order-select"
            >
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
            </select>
            <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
                className="order-date"
            />
            <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
                className="order-time"
            />
            <select 
                multiple
                value={selectedItems}
                onChange={handleItemChange}
                className="order-select"
            >
                {availableRecipes.map((recipe) => (
                    <option key={recipe} value={recipe}>{recipe}</option>
                ))}
            </select>
            <button type="submit" className="order-button">Add Order</button>
        </form>
    );
};

export default OrderForm;
