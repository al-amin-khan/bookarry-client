import { useSearchParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useEffect } from 'react';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const axios = useAxiosSecure();
    const sessionId = searchParams.get('session_id');
    console.log(sessionId)

    useEffect(() => {
        const confirmPayment = async () => {
            if (sessionId) {
                const res = await axios.patch(`/payments/confirm-payments?session_id=${sessionId}`);
                return res.data?.data
            }
        };
        confirmPayment();
    }, [sessionId, axios]);

    return (
        <div>
            Payment Success
        </div>
    );
};

export default PaymentSuccess;