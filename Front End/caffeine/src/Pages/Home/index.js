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
                console.log(res.data);
            }).catch((err) => console.log(err))
        }
    }
    const dataCreate = async (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/data/create`, { drinkName, userEmail: user, }).then((res) => {
            alert(`${res.data.message}`)
            setRefreshing(!refreshing)
        })
    }
    console.log(data);
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
                                    <span>{`${data?.monster} mg`}</span>
                                </div>
                                <div className='resDataContent'>
                                    <span>Black Coffee:</span>
                                    <span>{`${data?.black} mg`}</span>

                                </div>
                                <div className='resDataContent'>
                                    <span>Americano:</span>
                                    <span>{`${data?.americano} mg`}</span>

                                </div>
                                <div className='resDataContent'>
                                    <span>Sugar free NOS:</span>
                                    <span>{`${data?.sugar} mg`}</span>

                                </div>
                                <div className='resDataContent'>
                                    <span>5 Hour Energy</span>
                                    <span>{`${data?.energy} mg`}</span>

                                </div>

                            </div>
                        </div>
                        <div className='resDataForm'>
                            <form action="" onSubmit={dataCreate}>
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
                                        <p>Total Capacity: {500 - data?.monster}</p>
                                        :
                                        drinkName == "black" ?
                                            <p>Total Capacity: {500 - data?.black}</p>
                                            :
                                            drinkName == "americano" ?
                                                <p>Total Capacity: {500 - data?.americano}</p>
                                                :
                                                drinkName == "sugar" ?
                                                    <p>Total Capacity: {500 - data?.sugar}</p>
                                                    :
                                                    drinkName == "energy" ?
                                                        <p>Total Capacity: {500 - data?.energy}</p>
                                                        :
                                                        null
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
