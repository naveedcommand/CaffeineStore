import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Index() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [user, setUser] = useState(false)
    const [drinkName, setDrinkName] = useState()
    const [mg, setMg] = useState()
    const [data, setData] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [errMessage, setErrMessage] = useState()
    const BASE_URL = "http://localhost:8000/api"
    useEffect(() => {
        const user = localStorage.getItem("userEmail")
        setUser(user)
        axios.get(`${BASE_URL}/data/get`, {
            headers: {
                email: user
            }
        }).then((res) => { setData(res.data.data) })
        console.log(data);
    }, [])
    useEffect(() => {
        const user = localStorage.getItem("userEmail")
        setUser(user)
        axios.get(`${BASE_URL}/data/get`, {
            headers: {
                email: user
            }
        }).then((res) => { setData(res.data.data) })
        console.log(data);

    }, [refreshing])
    const auth = (e) => {
        e.preventDefault();
        if (!name) {
            alert("Enter your name")
        }
        else if (!email) {
            alert("Enter email address")
        }
        else if (!age) {
            alert("Enter your age")
        }
        else {
            axios.post(`${BASE_URL}/auth`, { name, email, age }).then((res) => {
                if (res.data.message == "Email is already registered") {
                    alert(res.data.message)
                }
                else {
                    localStorage.setItem("userEmail", email)
                    setUser(true)
                }
            }).catch((err) => console.log(err))
        }
    }
    const dataCreate = async (e) => {
        if (e.value !== null) {
            if (e.limit > e.value) {
                setErrMessage("Consumed limit reached")
            }
            else {
                axios.post(`${BASE_URL}/data/create`, { drinkName, userEmail: user, }).then((res) => {
                    alert(`${res.data.message}`)
                    setRefreshing(!refreshing)
                })
            }
        }
        else {
            setErrMessage("Please select drink")
        }

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
                            <input onChange={(e) => setAge(e.target.value)} type="text" className='ageInput' placeholder='Your Age' />
                            <input type="submit" className='authBtn' value='Register Now' />
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
                                    drinkName == "monster" ? { value: 500 - data?.monster, limit: 75 } :
                                        drinkName == "black" ? { value: 500 - data?.black, limit: 95 } :
                                            drinkName == "americano" ? { value: 500 - data?.americano, limit: 77 } :
                                                drinkName == "sugar" ? { value: 500 - data?.sugar, limit: 130 } :
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
                                {/* <input type="text" placeholder='Total mg' onChange={(e) => setMg(e.target.value)} /> */}
                                {
                                    drinkName == "monster" ?
                                        <div>
                                            <p>Total Capacity: {500 - data?.monster == null ? 500 : 500 - data?.monster}</p>
                                            <p>Total Consumed: {data?.monster}</p>
                                        </div>
                                        :
                                        drinkName == "black" ?
                                            <div>
                                                <p>Total Capacity: {500 - data?.black == null ? 500 : 500 - data?.black}</p>
                                                <p>Total Consumed: {data?.black}</p>
                                            </div>
                                            :
                                            drinkName == "americano" ?
                                                <div>
                                                    <p>Total Capacity: {500 - data?.americano == null ? 500 : 500 - data?.americano}</p>
                                                    <p>Total Consumed: {data?.americano}</p>
                                                </div>
                                                :
                                                drinkName == "sugar" ?
                                                    <div>
                                                        <p>Total Capacity: {500 - data?.sugar == null ? 500 : 500 - data?.sugar}</p>
                                                        <p>Total Consumed: {data?.sugar}</p>
                                                    </div>
                                                    :
                                                    drinkName == "energy" ?
                                                        <div>
                                                            <p>Total Capacity: {500 - data?.energy == null ? 500 : 500 - data?.energy}</p>
                                                            <p>Total Consumed: {data?.energy}</p>
                                                        </div>
                                                        :
                                                        null
                                }
                                {
                                    errMessage !== undefined ?
                                        <p style={{ color: 'red' }}>{errMessage}</p> : null
                                }
                                <input type="submit" value={"Consumed"} />
                            </form>
                        </div>
                    </div>
            }







            {/* Footer  */}
            <div></div>
        </div >
    )
}
