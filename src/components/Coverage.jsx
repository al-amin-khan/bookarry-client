import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import coverageAreas from '../assets/warehouses.json';


const Coverage = () => {
    // const coverageAreas = useLoaderData();
    const position = [23.8103, 90.4125];
    const mapRef = useRef(null);

    const handleSearchLocation = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        if (location) {
            const district = coverageAreas.find(center => center.city.toLowerCase().includes(location.toLowerCase()));
            console.log(district);
            if (district) {
                const coordinate = [district.latitude, district.longitude];
                mapRef.current.flyTo(coordinate, 12, { duration: 3 });
            }

        }
    }


    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl w-10/12 mx-auto">
                <div className="text-center mb-5">
                    <h2 className="text-4xl font-bold mb-4">Delivery Coverage</h2>
                    <p className="text-lg text-base-content opacity-70">
                        We deliver books to major cities across the country
                    </p>
                </div>
                <div>
                    <div className='grid place-items-center mb-0'>
                        <form onSubmit={handleSearchLocation}>
                            <div className="join">
                                <input name='location' className="input join-item rounded-l-full w-64" placeholder="Search for a city" />
                                <button type='submit' className="btn join-item rounded-r-full btn-primary text-white">Search</button>
                            </div>
                        </form>
                    </div>
                    <MapContainer ref={mapRef} center={position} zoom={7} scrollWheelZoom={false} className='h-[460px] mx-auto mb-10 mt-2 rounded-2xl'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            coverageAreas.map((center, index) =>
                                <Marker key={index} position={[center.latitude, center.longitude]}>
                                    <Popup>
                                        <p className='font-semibold'> {center.city} Collection Points</p>
                                        <p><strong>Points:</strong> {center.covered_area.join(', ')}</p>
                                    </Popup>
                                </Marker>)
                        }
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default Coverage;