import logo from '../assets/bookarry-full-logo.png'

const BrandLogo = () => {
    return (
        <div className='flex relative left-0 top-0'>
            <img src={logo} className='h-10 w-auto' alt="bookarry-logo" />
        </div>
    );
};

export default BrandLogo;