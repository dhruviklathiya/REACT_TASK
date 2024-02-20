import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

const DDS = () => {
    const [data, setdata] = useState([])
    const [filter, setfilter] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [view, setview] = useState({});
    const [ind, setind] = useState();
    useEffect(() => {
        axios.get("https://dummyjson.com/products").then((res) => {
            console.log(res)
            setdata(res.data.products)
            setfilter(res.data.products)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const searching_fn = (e) => {
        const search_for = e.target.value
        const filterdata = data.filter((one) => {
            return one.title.toLowerCase().includes(search_for)
        })
        setfilter([...filterdata])
    }

    const category_search_fn = () => {
        let search_for = document.getElementById('cars').value
        if (search_for !== '') {
            const filterdata = data.filter((one) => {
                return one.category === search_for
            })
            setfilter([...filterdata])
        }
        else {
            setfilter([...data])
        }
    }

    const price_searching_fn = (e) => {
        const search_for = e.target.value
        const filterdata = data.filter((one) => {
            return one.price <= search_for
        })
        setfilter([...filterdata])
    }

    const pagination_fn = (page) => {
        const result = data.slice((page - 1) * 10, ((page - 1) * 10) + 10)
        setfilter([...result])
    }

    const pre_update_fn = (val, ind) => {
        setview(val)
        setind(ind)
    }

    const update_fn = () => {
        // Because of limitation of dummyjson API we cannot update json on server side
        // that's why I have updated it virtually
        data.splice(ind, 1, view)
        setdata([...data])
        setfilter([...data])
    }

    const cookies_set = () => {
        // Cookies will opnly appear on application after refresh
        const USER = "USER"
        Cookies.set('Role', USER)
    }

    const cookies_get = () => {
        // Cookies will opnly appear on application after refresh
        const role = Cookies.get('Role')
        console.log(role);
    }

    const cookies_remove = () => {
        // Cookies will opnly appear on application after refresh
        Cookies.remove('Role')
    }

    const delete_fn = (ind) => {
        data.splice(ind, 1)
        setdata([...data])
        setfilter([...data])
    }

    return (
        <>
            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">Trades</h2>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <input placeholder='Search by name' onChange={searching_fn} />
                            <input placeholder='Search by price' onChange={price_searching_fn} />
                            <select id="cars" onChange={category_search_fn}>
                                <option value="">Search by category</option>
                                <option value="smartphones">smartphones</option>
                                <option value="laptops">laptops</option>
                                <option value="fragrances">fragrances</option>
                                <option value="skincare">skincare</option>
                                <option value="groceries">groceries</option>
                                <option value="home-decoration">home-decoration</option>
                            </select>
                            <button className="m-4" onClick={cookies_set}>Cookies set testing</button>
                            <button className="m-4" onClick={cookies_get}>Cookies get testing</button>
                            <button className="m-4" onClick={cookies_remove}>Cookies remove testing</button>
                            <table class="min-w-full leading-normal">
                                <button className="m-4" onClick={() => pagination_fn(1)}>1</button>
                                <button className="m-4" onClick={() => pagination_fn(2)}>2</button>
                                <button className="m-4" onClick={() => pagination_fn(3)}>3</button>
                                <thead>
                                    <tr>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Client / Invoice
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Amount
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Issued / Due
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filter.slice(0, 10).map((val, ind) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex">
                                                            <div class="flex-shrink-0 w-10 h-10">
                                                                <img
                                                                    class="w-full h-full rounded-full"
                                                                    src={val.images[0]}
                                                                    alt={val.title}
                                                                />
                                                            </div>
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {val.title}
                                                                </p>
                                                                <p class="text-gray-600 whitespace-no-wrap">{val.price}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">${val.price}</p>
                                                        <p class="text-gray-600 whitespace-no-wrap">USD</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                                                        <p class="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span
                                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                        >
                                                            <span
                                                                aria-hidden
                                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                            ></span>
                                                            <span class="relative">Paid</span>
                                                        </span>
                                                    </td>
                                                    <td
                                                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                                    >
                                                        <button
                                                            className="inline-block text-gray-500 hover:text-gray-700"
                                                            type="button"
                                                            onClick={() => { setShowModal(true); pre_update_fn(val, ind) }}
                                                        >
                                                            UPDATE
                                                        </button>
                                                        <button
                                                            type="button"
                                                            class="mx-3 inline-block text-gray-500 hover:text-gray-700"
                                                            onClick={() => delete_fn(ind)}
                                                        >
                                                            DELETE
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                            {/*content*/}
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold">
                                                        Modal Title
                                                    </h3>
                                                    <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                            ×
                                                        </span>
                                                    </button>
                                                </div>
                                                {/*body*/}
                                                <label>PRODUCT NAME</label>
                                                <input value={view.title} onChange={(e) => setview({ ...view, title: e.target.value })} />
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => { setShowModal(false); update_fn() }}
                                                    >
                                                        UPDTE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DDS