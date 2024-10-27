import React, { useState } from 'react';
import "../styles/Order.css";

const EditOrderForm = ({ order, onUpdateOrder, onCancel, availableRecipes = [] }) => {
    const [customerName, setCustomerName] = useState(order.customerName || '');
    const [status, setStatus] = useState(order.status || 'pending');
    const [orderType, setOrderType] = useState(order.orderType || 'Pickup');
    const [scheduledDate, setScheduledDate] = useState(order.scheduledDate || '');
    const [scheduledTime, setScheduledTime] = useState(order.scheduledTime || '');
    const [selectedItems, setSelectedItems] = useState(order.items || []);

    const handleItemChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) selected.push(options[i].value);
        }
        setSelectedItems(selected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedOrder = {
            ...order,
            customerName,
            status,
            orderType,
            scheduledDate,
            scheduledTime,
            items: selectedItems,
        };
        await onUpdateOrder(order.id, updatedOrder);
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

            {/* Dropdown for status */}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="order-select"
            >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="delivered">Delivered</option>
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
            <button type="submit" className="order-button">Update Order</button>
            <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        </form>
    );
};

export default EditOrderForm;
