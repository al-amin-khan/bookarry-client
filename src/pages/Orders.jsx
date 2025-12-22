import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const Orders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: orders, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`);
            return res.data.data;
        }
    });

    console.log(orders)

    if (isError) {
        return <div className='text-error text-center text-lg'>Error: {error.message}</div>;
    }

    const handlePayment = async (order, status) => {
        console.log(order, status);

        if (status === 'pay') {
            if (!order) return;

            const paymentInfo = {
                orderId: order._id,
                title: order.book_title,
                price: order.price,
                customer_email: order.email,
                customer_name: order.name,
                order: order.order,
            }

            try {
                const res = await axiosSecure.post('/payments/create-checkout-session', paymentInfo);
                console.log(res.data.url);
                // window.location.href = res.data.url;
                window.location.assign(res.data.url);
            } catch (err) {
                console.error('Create checkout session failed', err);
            }
        }

        if (status === 'cancel') {
            try {
                const res = await axiosSecure.put(`/orders/${order._id}/cancel`);
                console.log(res.data);
                if (res.data.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your order has been cancelled successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                refetch();
            } catch (err) {
                console.error('Cancel order failed', err);
            }
        }
    }

    return (
        <div className="w-11/12 mx-auto">
            <div className='w-[98%] mx-auto'>
                <h1>Orders</h1>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Order</th>
                                <th>Book</th>
                                <th>Price</th>
                                <th>Address</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ? <tr><td colSpan={7} className='text-center animate-pulse text-3xl'>Loading...</td></tr> :

                                    orders?.map((order, index) => <tr key={order._id}>
                                        <th>{index + 1}</th>
                                        <td>{order?.order}</td>
                                        <td className='mx-2'>{order.book_title}</td>
                                        <td>${order.price}</td>
                                        <td>
                                            <div>
                                                <p> <span className='font-semibold'>Name:</span> {order.name}</p>
                                                <p> <span className='font-semibold'>Email:</span> {order.email}</p>
                                                <p> <span className='font-semibold'>Phone:</span> {order.phone}</p>
                                                <p> <span className='font-semibold'>Address:</span> {order.address}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    order.order_status === 'pending'
                                                        ? 'text-yellow-100 bg-amber-400 inline-block py-1 px-2 rounded-full'
                                                        :
                                                        order.order_status === 'canceled' ? 'text-white bg-red-400 inline-block py-1 px-2 rounded-full' : 'text-success'}
                                            >{order.order_status}</div>
                                        </td>
                                        <td>
                                            {
                                                order.payment_status === 'unpaid' ?
                                                    <div className='text-white inline-block bg-amber-400 py-1 px-2 rounded-full'>Unpaid</div>
                                                    :
                                                    <div className='text-white inline-block bg-green-400 py-1 px-2 rounded-full'>Paid</div>
                                            }
                                        </td>
                                        <td>
                                            {
                                                order.payment_status === 'unpaid' && order.order_status !== 'canceled' ?
                                                    <div className='flex flex-row gap-1 justify-center items-center pr-1'>
                                                        <button onClick={() => handlePayment(order, "pay")} className='btn btn-sm btn-primary'>Pay Now</button>
                                                        <button onClick={() => handlePayment(order, "cancel")} className='btn btn-sm btn-error'>Cancel Order</button>
                                                    </div>
                                                    :
                                                    <button className='btn hover:cursor-not-allowed disabled:cursor-not-allowed'>
                                                        {
                                                            order.payment_status === 'paid' ? 'Paid' :
                                                                order.order_status === 'canceled' ? 'Canceled' : 'N/A'
                                                        }
                                                    </button>
                                            }
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;