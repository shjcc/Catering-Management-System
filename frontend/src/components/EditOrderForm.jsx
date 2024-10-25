import React, { useState } from 'react';
import "../styles/Order.css";

const EditOrderForm = ({ order, onUpdateOrder, onCancel }) => {
    const [customerName, setCustomerName] = useState(order.customerName);
    const [status, setStatus] = useState(order.status); // Use state for the dropdown
    const [orderType, setOrderType] = useState(order.orderType);
    const [scheduledDate, setScheduledDate] = useState(order.scheduledDate);
    const [scheduledTime, setScheduledTime] = useState(order.scheduledTime);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedOrder = { customerName, status, orderType, scheduledDate, scheduledTime };
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
            
            <button type="submit" className="order-button">Update Order</button>
            <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        </form>
    );
};

export default EditOrderForm;
