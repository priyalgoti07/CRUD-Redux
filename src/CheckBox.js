import React, { useEffect, useState } from 'react'

export const CheckBox = () => {
    const arr = ["Play cricket", "Paly video game", "Read book"]
    const [checkvalue, setCheckvalue] = useState()
    const [arrCopy, setArrCopy] = useState(arr)
    console.log(arrCopy)
    const handeldelete = (val) => {
        const filterData = arrCopy.filter((item) => (checkvalue === val) ? item !== val : item)
        setArrCopy(filterData)
    }
    const handleChekBox = (item, value) => {
        setCheckvalue(item)
    }

    useEffect(() => {
        console.log('i am only first page render time call Dependency useEffect');
    }, []);

    useEffect(() => {
        console.log('i am Every Render time call useEffect');
    });
    return (
            <div>
                <h1>List</h1>
                <ul>
                    {
                        arrCopy?.map((item) => {
                            return (
                                <li>
                                    <input type='checkbox' value={checkvalue} onChange={(e) => handleChekBox(item, e.target.checked)} />
                                    {item}
                                    <button onClick={() => handeldelete(item)}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

    )
}
