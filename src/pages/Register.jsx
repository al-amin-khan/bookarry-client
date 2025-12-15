import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
    const { registerUser, updateUserProfile, setUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (data) => {
        console.log(data)

        console.log(data.name);

        setIsSubmitting(true);
        registerUser(data.email, data.password)
            .then((res) => {
                const createdUser = res.user;
                updateUserProfile({
                    displayName: data.name,
                    photoURL: data?.photoURL || null,
                }).then(() => {
                    setUser(createdUser);
                    toast.success('User profile updated successfully');
                }).catch((error) => {
                    toast.error(`Error updating profile: ${error.message}`, {
                        duration: 4000,
                        position: 'bottom-left',
                    });
                });

                toast.success(`Welcome, ${data.name}, you have successfully registered.`, {
                    duration: 6000,
                    position: 'bottom-left',
                });
                navigate('/', { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`Error: ${errorCode}-${errorMessage}`, {
                    duration: 4000,
                    position: 'bottom-left',
                });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };
    return (
        <div className="hero bg-base-200 h-full flex items-center">
            <div className='w-8/12 mx-auto bg-base-100 grid place-items-center max-w-sm shadow-2xl rounded-2xl py-5'>
                <div className="mb-5">
                    <h2 className="text-2xl font-bold leading-tight">Create an Account</h2>
                </div>

                <div className=" w-5/7">
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <fieldset className="fieldset">
                            <label className="label text-neutral/90">Name</label>
                            <input type="text" className="input w-full" placeholder="Name" {...register("name", { required: true })} />
                            {errors.name && <span className="text-red-500">This field is required</span>}

                            <label className="label text-neutral/90">Email</label>
                            <input type="email" className="input w-full" placeholder="Email" {...register("email", { required: true })} />
                            {errors.email && <span className="text-red-500">This field is required</span>}

                            <label className="label text-neutral/90">Password</label>
                            <input type="password" className="input w-full" placeholder="Password" {...register("password", { required: true })} />
                            {errors.password && <span className="text-red-500">This field is required</span>}

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-primary text-neutral mt-4">
                                {isSubmitting ? `{<span className="loading loading-spinner loading-sm"></span>}` : 'Register'}
                            </button>
                            <div>
                                <p className="text-sm text-base-content py-1">
                                    Already have any account?
                                    <Link to="/auth/login" className="link link-hover px-1 text-primary">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </fieldset>
                    </form>
                    <div className="divider">OR</div>
                    <GoogleSignInButton />
                </div>
            </div>
        </div>
    );
};

export default Register;