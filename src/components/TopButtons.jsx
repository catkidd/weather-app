import React from "react";

const TopButtons = ({ setQuerry }) => {
    const cities = [
        {
            id: 1,
            title: "Kathmandu",
        },
        {
            id: 2,
            title: "Dhulikhel",
        },
        {
            id: 3,
            title: "Pokhara",
        },
        {
            id: 4,
            title: "Biratnagar",
        },
        {
            id: 5,
            title: "Janakpur",
        },
    ];
    return (
        <div className="flex items-center justify-between my-6">
            {cities.map((city) => {
                return (
                    <button
                        key={city.id}
                        className="text-white text-lg font-medium"
                        onClick={() => {
                            setQuerry({ q: city.title });
                        }}>
                        {city.title}
                    </button>
                );
            })}
        </div>
    );
};

export default TopButtons;
