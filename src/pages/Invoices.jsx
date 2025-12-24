import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Invoices = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: payments = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data.data || [];
        },
    });

    const formatDate = (value) => {
        if (!value) return 'Not available';
        const resolvedValue = typeof value === 'object' ? value?.$date : value;
        const date = new Date(resolvedValue);
        return Number.isNaN(date.getTime()) ? 'Not available' : date.toLocaleDateString();
    };

    const getPaymentId = (payment) =>
        payment?.session_id ||
        payment?.payment_intent ||
        payment?.paymentId ||
        payment?.payment_id ||
        payment?.transactionId ||
        payment?._id?.$oid ||
        payment?._id ||
        'N/A';

    const getAmount = (payment) => {
        const currency = payment?.currency?.toUpperCase() || 'USD';
        const rawAmount =
            payment?.amount_total ??
            payment?.amount ??
            payment?.price ??
            payment?.total ??
            payment?.payment_amount ??
            null;

        if (rawAmount === null || rawAmount === undefined) return 'N/A';

        const normalizedAmount =
            typeof rawAmount === 'number' ? rawAmount / 100 : Number(rawAmount) / 100;
        if (Number.isNaN(normalizedAmount)) return 'N/A';

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
        }).format(normalizedAmount);
    };

    if (isError) {
        return <div className="text-center text-error">Error: {error.message}</div>;
    }

    return (
        <div className="w-11/12 mx-auto">
            <div className="w-[98%] mx-auto">
                <h1 className="text-2xl font-semibold">Invoices</h1>

                <div className="overflow-x-auto mt-4">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Transaction ID</th>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center animate-pulse text-3xl">
                                        Loading...
                                    </td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-base-content/70">
                                        No payments found yet.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment, index) => (
                                    <tr key={payment?._id || payment?.session_id || index}>
                                        <th>{index + 1}</th>
                                        <td className="break-all">{getPaymentId(payment)}</td>
                                        <td>{payment?.order}</td>
                                        <td>{getAmount(payment)}</td>
                                        <td>{formatDate(payment?.created_at || payment?.createdAt || payment?.date)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Invoices;
