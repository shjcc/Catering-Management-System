import React from 'react';
import dayjs from 'dayjs'; 
import "../styles/Order.css";

const OrderList = ({ orders, onDeleteOrder, onEditOrder }) => {
    return (
        <ul className="order-list">
            {orders.map((order) => (
                <li key={order.id} className="order-item">
                    <div className="order-details">
                        <div><strong>Customer:</strong> {order.customerName}</div>
                        <div><strong>Status:</strong> {order.status}</div>
                        <div><strong>Type:</strong> {order.orderType}</div>
                        <div><strong>Scheduled:</strong> {dayjs(order.scheduledDate).format('YYYY-MM-DD')} {order.scheduledTime}</div>
                        <div><strong>Items:</strong> {order.items ? order.items.join(", ") : 'None'}</div> {/* Display selected items */}
                    </div>
                    <div className="order-actions">
                        <button className="edit-button" onClick={() => onEditOrder(order)}>Edit</button>
                        <button className="delete-button" onClick={() => onDeleteOrder(order.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
