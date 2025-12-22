import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bookarry-server.vercel.app/api/v1/',
    // baseURL: 'http://localhost:3000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
    
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
