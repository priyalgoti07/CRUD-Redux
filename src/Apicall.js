import React, { useEffect, useState } from 'react'

const Apicall = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) {
                    
                    throw new Error("Faild to fetch users")
                }
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                setError("i am Error",error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchdata()
    }, [])
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    return (
        <div>
            <h2>User List</h2>
            {
                loading ?
                    <h1>Loading</h1> :
                    <ul>
                        {users?.map((user) => (
                            <li key={user.id}>
                                {user.name} - {user.email}
                            </li>
                        ))}
                    </ul>
            }

        </div>
    )
}

export default Apicall