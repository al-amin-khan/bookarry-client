import { useNavigate } from 'react-router';
import errorBackground from '../assets/blob-scene-haikei.svg'
import error404 from '../assets/404 error with person looking for-amico.svg'

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='w-11/12 mx-auto py-8'>
            <div
                className="min-h-[80vh] bg-no-repeat bg-cover bg-center rounded-2xl"
                style={{ backgroundImage: `url(${errorBackground})` }}
            >
                <div className="flex flex-col justify-center items-center w-full pt-8 space-y-2">
                    <div className="font-bold text-5xl text-white/70">Oops!</div>
                    <img className="h-60 w-full" src={error404} alt="error-404" />
                    <div className="font-bold text-4xl text-white/70">Page Not Found</div>
                    <button
                        className="bg-white/70 hover:bg-white/90 text-black font-bold py-2 px-4 rounded-full my-3" onClick={() => navigate(-1)}
                    >
                        Back to previous page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;