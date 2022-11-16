import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Index() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useState(false)
    const [drinkName, setDrinkName] = useState()
    const [data, setData] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [errMessage, setErrMessage] = useState()
    const BASE_URL = "http://localhost:8000/api"

    const getData = async (token) => {
        await axios.get(`${BASE_URL}/data/get`, {
            headers: {
                token: token
            }
        }).then((res) => {
            console.log(res.data);
            setData(res.data.data)
        })
    }
    useEffect(() => {
        const user = localStorage.getItem("token")
        setUser(user)
        getData(user)
    }, [])
    useEffect(() => {
        const user = localStorage.getItem("token")
        setUser(user)
        getData(user)
    }, [refreshing, drinkName])
    const auth = (e) => {
        e.preventDefault();
        if (!name) {
            alert("Enter your name")
        }
        else if (!email) {
            alert("Enter email address")
        }
        else if (!password) {
            alert("Enter password")
        }
        else {
            axios.post(`${BASE_URL}/auth/register`, { name, email, password }).then((res) => {
                if (res.data.message == "Email is already registered") {
                    alert(res.data.message)
                    setRefreshing(!refreshing)
                    window.location.reload(false);
                }
                else {
                    localStorage.setItem("token", res.data.token)
                    setUser(true)
                }
            }).catch((err) => console.log(err))
        }
    }
    const dataCreate = async (e) => {
        if (e !== null) {
            if (data?.monster + data?.black + data?.americano + data?.sugar + data?.energy + e.limit <= 500) {
                if (data?.monster + data?.black + data?.americano + data?.sugar + data?.energy <= 500) {
                    setErrMessage("")
                    axios.post(`${BASE_URL}/data/create`, { drinkName, userId: user, }).then((res) => {
                        alert(`${res.data.message}`)
                        setRefreshing(!refreshing)
                    })
                }
                else {
                    setErrMessage("Consumed limit reached")
                }
            }
            else {
                setErrMessage("Consumed limit reached")
            }
        }
        else {
            setErrMessage("Please select drink")
        }
    }
    const login = async (e) => {
        e.preventDefault();
        if (!name) {
            alert("Enter your name")
        }
        else if (!email) {
            alert("Enter email address")
        }
        else if (!password) {
            alert("Enter password")
        }
        else {
            axios.post(`${BASE_URL}/auth/login`, { name, email, password }).then((res) => {
                if (res.data.message == "Email is not registered") {
                    alert(res.data.message)
                    setRefreshing(!refreshing)
                    window.location.reload(false);
                }
                else {
                    localStorage.setItem("token", res.data.token)
                    setUser(true)
                    setRefreshing(!refreshing)
                }
            }).catch((err) => console.log(err))
        }
    }
    const logout = async () => {
        await localStorage.removeItem("token")
    }
    return (
        <div className='container'>
            {/* Welcome Heading  */}
            <div className='headingContainer'>
                <h2 className='welHeading'>Welcome to Caffeine Store</h2>
            </div>
            {
                !user ?
                    /* Auth Form  */
                    <div className='authFormConatainer'>
                        <form onSubmit={auth}>
                            <input onChange={(e) => setName(e.target.value)} type="text" className='nameInput' placeholder='Your Name' />
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className='emailInput' placeholder='Email Address' />
                            <input onChange={(e) => setPassword(e.target.value)} type="text" className='ageInput' placeholder='Password' />
                            <input type="submit" className='authBtn' value='Register Now' />
                        </form>
                        <form onSubmit={login}>
                            <input onChange={(e) => setName(e.target.value)} type="text" className='nameInput' placeholder='Your Name' />
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className='emailInput' placeholder='Email Address' />
                            <input onChange={(e) => setPassword(e.target.value)} type="text" className='ageInput' placeholder='Password' />
                            <input type="submit" className='authBtn' value='Login' />
                        </form>
                    </div>
                    :
                    /* Register Form / Response */
                    <div className='responseContainer'>
                        <div className='resDataContainer'>
                            <h3 className='resDataHeading'>Consumed:</h3>
                            <div className='resData'>
                                <div className='resDataContent'>
                                    <span>Monster Ultra Sunrise:</span>
                                    <span>{`${data?.monster !== undefined ? data?.monster : 0} mg`}</span>
                                </div>
                                <div className='resDataContent'>
                                    <span>Black Coffee:</span>
                                    <span>{`${data?.black !== undefined ? data?.black : 0} mg`}</span>

                                </div>
                                <div className='resDataContent'>
                                    <span>Americano:</span>
                                    <span>{`${data?.americano !== undefined ? data?.americano : 0} mg`}</span>

                                </div>
                                <div className='resDataContent'>
                                    <span>Sugar free NOS:</span>
                                    <span>{`${data?.sugar !== undefined ? data?.sugar : 0} mg`}</span>

                                </div>
                                <div className='resDataContent'>
                                    <span>5 Hour Energy</span>
                                    <span>{`${data?.energy !== undefined ? data?.energy : 0} mg`}</span>

                                </div>

                            </div>
                        </div>
                        <div className='resDataForm'>
                            <form action="" onSubmit={(e) => {
                                e.preventDefault()
                                dataCreate(
                                    drinkName == "monster" ? { value: 500 - data?.monster, limit: 150 } :
                                        drinkName == "black" ? { value: 500 - data?.black, limit: 95 } :
                                            drinkName == "americano" ? { value: 500 - data?.americano, limit: 77 } :
                                                drinkName == "sugar" ? { value: 500 - data?.sugar, limit: 260 } :
                                                    drinkName == "energy" ? { value: 500 - data?.energy, limit: 200 } : null

                                )
                            }}>
                                <select name="" id="" onChange={(e) => setDrinkName(e.target.value)}>
                                    <option value="monster">Monster Ultra Sunrise</option>
                                    <option value="black">Black Coffee</option>
                                    <option value="americano">Americano</option>
                                    <option value="sugar">Sugar free NOS</option>
                                    <option value="energy">5 Hour Energy</option>
                                </select>
                                <div>
                                    <p>Total Capacity: 500</p>
                                    <p>Total Consumed: {isNaN(data?.monster + data?.black + data?.americano + data?.sugar + data?.energy) === true ? 0 : data?.monster + data?.black + data?.americano + data?.sugar + data?.energy}</p>
                                </div>
                                {
                                    errMessage !== undefined ?
                                        <p style={{ color: 'red' }}>{errMessage}</p> : null
                                }
                                <input type="submit" value={"Consumed"} />
                            </form>
                            <form action="" onSubmit={logout}>
                                <input type="submit" value={"Logout"} />
                            </form>
                        </div>
                    </div>
            }
        </div >
    )
}
