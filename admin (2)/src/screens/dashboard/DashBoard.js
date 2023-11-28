import React from 'react';
import { FcAreaChart, FcComboChart, FcFlowChart, FcPieChart } from 'react-icons/fc';

const card = [
    {
        id: 1,
        icon: <FcComboChart size={50}/>,
        text: "Total Sales",
        price: "$43.2K"
    },
    {
        id: 2,
        icon: <FcAreaChart size={50}/>,
        text: "Total Income",
        price: "$54.2K"
    },
    {
        id: 3,
        icon: <FcPieChart size={50}/>,
        text: "Total Reservation",
        price: "$85.2K"
    },
    {
        id: 4,
        icon: <FcFlowChart size={50}/>,
        text: "Total Orders",
        price: "$986.2K"
    },
]

const DashBoard = () => {
    return (
        <div className='row'>
            {card?.map((item) => {
                return (
                    <div className='col-3'>
                        <div className="common_card" key={item?.id} style={{height:"40vh"}}>
                            <h2 className='medium_font'>{item?.text}</h2>
                            <h2 className='small_font'>{item?.price}</h2>
                            <div className='small_font'>{item?.icon}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DashBoard;
