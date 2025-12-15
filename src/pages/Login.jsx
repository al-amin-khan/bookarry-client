import { useEffect, useRef, useState } from 'react';
import { IoLogoGithub } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import GoogleSignInButton from '../components/GoogleSignInButton';




const Login = () => {
    const { user, googleLoginWithPopUp, gitHubLoginWithPopUp, signInUser } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();

    const redirectTarget = location.state?.from;
    const redirectPath = redirectTarget?.pathname || '/';



    useEffect(() => {
        if (user) {
            navigate(redirectPath, { replace: true });
        }
    }, [user, redirectPath, navigate]);


    const handleSocialLogin = (loginWith) => {
        setIsSubmitting(true);
        if (loginWith === 'google') {
            googleLoginWithPopUp()
                .then(res => {
                    toast.success(`Welcome, ${res.user.displayName}, you have successfully logged in.`, {
                        duration: 6000,
                        position: 'bottom-left',
                    });
                    navigate(redirectPath, { replace: true });
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(`Error: ${errorCode}-${errorMessage}`, {
                        duration: 4000,
                        position: 'bottom-left',
                    });
                }).finally(() => {
                    setIsSubmitting(false);
                });
        }
        if (loginWith === 'github') {
            gitHubLoginWithPopUp()
                .then(res => {
                    toast.success(`Welcome, ${res.user.displayName}, you have successfully logged in.`, {
                        duration: 6000,
                        position: 'top-right',
                    });
                    navigate(redirectPath, { replace: true });
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(`Error: ${errorCode}-${errorMessage}`, {
                        duration: 4000,
                        position: 'bottom-left',
                    });
                });
        }
    };

    const handleLoginWithEmailAndPassword = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setIsSubmitting(true);
        signInUser(email, password)
            .then((res) => {
                toast.success(`Welcome, ${res.user.displayName}, you have successfully logged in.`, {
                    duration: 6000,
                    position: 'bottom-left',
                });
                navigate(redirectPath, { replace: true });
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
            })


    }

    const handlePasswordReset = () => {
        navigate('/auth/reset-password', {
            state: {
                email: emailRef.current?.value ?? "",
                from: redirectTarget ?? { pathname: redirectPath },
            },
            replace: false,
        });

    };

    return (
        <>
            <div className="hero bg-base-200">
                <div className="hero-content w-full md:w-3/4 lg:w-3/4">
                    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                        <div className="card-body">
                            <div className='text-center text-3xl font-bold text-gray-800'>Login</div>
                            <form onSubmit={handleLoginWithEmailAndPassword}>
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input ref={emailRef} type="email" name='email' className="input w-full" placeholder="Email" required />
                                    <label className="label">Password</label>
                                    <label className="input w-full">
                                        <input type={showPassword ? 'text' : 'password'} name='password' className="grow w-full" placeholder="Password" required />
                                        {
                                            showPassword ?
                                                <Eye className="h-5 w-5" onClick={() => setShowPassword(!showPassword)} />
                                                :
                                                <EyeOff className="h-5 w-5" onClick={() => setShowPassword(!showPassword)} />
                                        }
                                    </label>
                                    <div className='grid grid-cols-2 w-full'>
                                        <button
                                            type="button"
                                            onClick={handlePasswordReset}
                                            className="link link-hover text-left"
                                        >
                                            Forgot password?
                                        </button>
                                        <Link to="/auth/register" className="link link-hover text-end">New to this site?</Link>
                                    </div>
                                    <button className={`btn mt-4 ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'btn-neutral'}`} disabled={isSubmitting}>Login</button>
                                </fieldset>
                            </form>
                            <div className="divider">OR</div>
                            <GoogleSignInButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;