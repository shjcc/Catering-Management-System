import React, { useState } from 'react';
import dayjs from 'dayjs';
import "../styles/Order.css";

const OrderForm = ({ onAddOrder }) => {
    const [customerName, setCustomerName] = useState('');
    const [status, setStatus] = useState('');
    const [orderType, setOrderType] = useState('Pickup');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [items, setItems] = useState([]);  // Adjusting to an array for multiple items

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = dayjs(scheduledDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

        const newOrder = { customerName, status, orderType, scheduledDate: formattedDate, scheduledTime, items };

        await onAddOrder(newOrder);

        setCustomerName('');
        setStatus('');
        setOrderType('Pickup');
        setScheduledDate('');
        setScheduledTime('');
        setItems([]);  // Reset items
    };

    const handleItemChange = (e) => {
        const selectedItems = Array.from(e.target.selectedOptions, option => option.value);
        setItems(selectedItems);
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

            {/* Multi-select input for items */}
            <select 
                multiple
                value={items}
                onChange={handleItemChange}
                required
                className="order-select"
            >
                <option value="Cake">Cake</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Pancake">Pancake</option>
                <option value="Cookie">Cookie</option>
                <option value="Salad">Salad</option>
                <option value="Pizza">Pizza</option>
                <option value="Pasta">Pasta</option>
                <option value="Burger">Burger</option>
                <option value="Soup">Soup</option>
                <option value="Omelette">Omelette</option>
            </select>

            <button type="submit" className="order-button">Add Order</button>
        </form>
    );
};

export default OrderForm;
