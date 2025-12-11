// src/components/home/HeroSlider.jsx

import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200",
        title: "Discover Your Next Adventure",
        description:
            "Browse thousands of books and get them delivered right to your doorstep. Reading made convenient.",
        link: "/books",
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200",
        title: "Knowledge at Your Fingertips",
        description:
            "Access academic resources, research materials, and educational books without leaving home.",
        link: "/books",
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200",
        title: "Fast & Reliable Delivery",
        description:
            "Order today and receive your books within 2–3 business days. We value your time.",
        link: "/books",
    },
];

const HeroSlider = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (!swiperRef.current || !prevRef.current || !nextRef.current) return;

        // wire navigation to the rendered buttons once everything exists
        swiperRef.current.params.navigation.prevEl = prevRef.current;
        swiperRef.current.params.navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
    }, []);

    return (
        <section className="relative w-10/12 mx-auto h-[350px] md:h-[480px] mt-6 rounded-2xl overflow-hidden">
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                slidesPerView={1}
                loop
                effect="fade"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletClass:
                        "swiper-pagination-bullet bg-white/40 hover:bg-white transition-all w-2 h-2 rounded-full mx-1",
                    bulletActiveClass: "swiper-pagination-bullet-active bg-white w-6",
                }}
                navigation
                className="h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            {/* Background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-black/55" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                                <div className="max-w-3xl space-y-6">
                                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-base md:text-xl opacity-90">
                                        {slide.description}
                                    </p>
                                    <div>
                                        <Link to={slide.link} className="btn btn-primary btn-lg">
                                            Explore Books
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
                ref={prevRef}
                className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost bg-black/30 hover:bg-black/50 text-white border-none"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                ref={nextRef}
                className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost bg-black/30 hover:bg-black/50 text-white border-none"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Swiper pagination will render here */}
            <div className="swiper-pagination '!bottom-6'" />
        </section>
    );
};

export default HeroSlider;
