import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm.jsx';
import OrderList from '../components/OrderList.jsx';
import EditOrderForm from '../components/EditOrderForm.jsx';
import "../styles/Order.css";

const isProduction = import.meta.env.MODE === 'production';
const API_URL = isProduction ? 'https://cms-backend-ewuo.onrender.com/api/orders' : 'http://localhost:5001/api/orders';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
    };

    const addOrder = async (newOrder) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder),
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
            fetchOrders();
        } catch (error) {
            console.error("Error adding order:", error.message);
        }
    };

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
            fetchOrders();
        } catch (error) {
            console.error("Error deleting order:", error.message);
        }
    };

    const updateOrder = async (id, updatedOrder) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOrder),
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
            fetchOrders();
        } catch (error) {
            console.error("Error updating order:", error.message);
        }
    };

    const editOrder = (order) => {
        setEditingOrder(order);
    };

    const cancelEdit = () => {
        setEditingOrder(null);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="order-management-container">
            {editingOrder ? (
                <EditOrderForm
                    order={editingOrder}
                    onUpdateOrder={updateOrder}
                    onCancel={cancelEdit}
                />
            ) : (
                <>
                    <OrderForm onAddOrder={addOrder} />
                    <div className="order-list">
                        <OrderList
                            orders={orders}
                            onDeleteOrder={deleteOrder}
                            onEditOrder={editOrder}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderManagement;
