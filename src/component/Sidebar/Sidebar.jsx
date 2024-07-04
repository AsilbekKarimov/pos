import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";


const Sidebar = () => {
    let [links, setLink] = useState([
        { linkName: "Фискальный модули", linkAddress: "https://google.com" },
        { linkName: "Соотрудники", linkAddress: "https://google.com" },
        { linkName: "Онлайн-ККМ и ВК", linkAddress: "https://google.com" },
        { linkName: "Торговые точки", linkAddress: "https://google.com" }, 
        { linkName: "Список филиалов", linkAddress: "https://google.com" },
        { linkName: "Товар без имени ФМля", linkAddress: "https://google.com" },
        { linkName: "Список парнёров ЦТО", linkAddress: "https://google.com" },
       
       
    ])

    return (
        <aside className='w-2/12 h-full flex flex-col min-h-screen justify-between px-5 border-r shadow-lg shadow-black'>
            <div className='h-[25%] py-10 flex items-center'>
                <h1 className='h-full'>LOGO</h1>
            </div>
            <div className='flex flex-col gap-3'>
                {
                    links.map((item, id) => (
                        <Link to={item.linkAddress}>{item.linkName}</Link>
                    ))
                }
            </div>
                
        </aside>
    )
}

export default Sidebar