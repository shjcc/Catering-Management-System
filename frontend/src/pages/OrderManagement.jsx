import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm.jsx';
import OrderList from '../components/OrderList.jsx';
import EditOrderForm from '../components/EditOrderForm.jsx';
import "../styles/Order.css";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);

    const fetchOrders = async () => {
        const response = await fetch('http://localhost:5001/api/orders');
        const data = await response.json();
        setOrders(data);
    };

    const addOrder = async (newOrder) => {
        const response = await fetch('http://localhost:5001/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        });
        if (response.ok) {
            fetchOrders();
        }
    };

    const deleteOrder = async (id) => {
        const response = await fetch(`http://localhost:5001/api/orders/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchOrders();
        }
    };

    const updateOrder = async (id, updatedOrder) => {
        const response = await fetch(`http://localhost:5001/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedOrder),
        });
        if (response.ok) {
            fetchOrders();
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
