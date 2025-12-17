import axios from "axios";
import { useEffect } from 'react';
import useAuth from './useAuth';
import { Navigate } from "react-router";

const axiosSecure = axios.create({
    // baseURL: 'https://bookarry-server.vercel.app/api/v1/',
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
    
});

const useAxiosSecure = () => {
    const {user, logOut} = useAuth();

    useEffect(() => {
        // interceptor request
        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
            return config; 
        })

        // interceptor response
        const responseInterceptor = axiosSecure.interceptors.response.use(response => response, async error => {
            if (error.response.status === 401 || error.response.status === 403) {
                await logOut();
                Navigate('/login');
            }
            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }
    }, [user, logOut]);

    return axiosSecure
};

export default useAxiosSecure;
