import React, { useState } from 'react'

const Dropdown = () => {

    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const countries = [
        {
            name: 'India',
            value: 'IN',
            cities: ['Delhi', 'Mumbai']
        },
        {
            name: 'Pakistan',
            value: 'PK',
            cities: ['Lahore', 'Karachi']
        },
        {
            name: 'Bangladesh',
            value: 'BG',
            cities: ['Dhaka', 'Chittagong']
        }
    ];
    const selectedCountry = countries.find((item) => item.name === country);
    console.log("country", country, city)
    return (
        <>
            <div>Dropdown</div>
            <select onClick={(e) => setCountry(e.target.value)}>
                <option value="">Select Country</option>
                {
                    countries.map((item) => {
                        return (
                            <option value={item.name}>{item.name}</option>
                        )
                    })
                }
            </select>
            <select onClick={(e) => setCity(e.target.value)}>
                <option value="">Select City</option>
                {
                    selectedCountry?.cities?.map((item) => {
                        return (
                            <option value={item}>{item}</option>
                        )
                    })
                }
            </select>
        </>

    )
}

export default Dropdown