import React from 'react';

const LibrarianOrders = () => {
    return (
        <div className="w-11/12 mx-auto py-6">
            <h1 className="text-3xl font-semibold">Orders</h1>
            <p className="text-base-content/70">
                Review and update the status of orders for your books.
            </p>
            <div className="mt-6 rounded-xl border border-base-200 bg-base-100 p-6">
                <p className="text-sm text-base-content/60">
                    Hook this page to your orders API to list pending, shipped, and delivered orders.
                </p>
            </div>
        </div>
    );
};

export default LibrarianOrders;
