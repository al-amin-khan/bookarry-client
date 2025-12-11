
const Stat = () => {
    const stats = [
        { value: '10,000+', label: 'Books Available' },
        { value: '5,000+', label: 'Happy Readers' },
        { value: '64', label: 'Cities Covered' },
        { value: '99%', label: 'Satisfaction Rate' }
    ];

    return (
        <section className="py-20 px-4 bg-linear-to-r from-primary to-secondary text-white w-11/12 mx-auto rounded-2xl">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center animate-bounce-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="text-5xl font-bold mb-2">{stat.value}</div>
                            <div className="text-xl opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stat;