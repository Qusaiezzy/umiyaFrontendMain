import { useEffect, useState } from "react";
import api from "../../api/axios";


export default function AdminOverview(){


    const [data,setData]=useState({

        totalEmployees:0,

        confirmedBookings:0,

        pendingBookings:0,

        monthlyRevenue:0

    });



    useEffect(()=>{


        getDashboard();


    },[]);




    const getDashboard = async()=>{


        try{


            const res = await api.get(

                "/dashboard",

                {

                    headers:{

                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );



            setData(res.data);


        }


        catch(err){


            console.log(err);


        }


    };





    const cards = [


        {

            title:"Total Employees",

            value:data.totalEmployees

        },


        {

            title:"Confirmed Bookings",

            value:data.confirmedBookings

        },


        {

            title:"Pending Bookings",

            value:data.pendingBookings

        },


        {

            title:"Monthly Revenue",

            value:`₹${data.monthlyRevenue}`

        }


    ];





    return (


        <div>


            <h1 className="
            text-3xl
            font-bold
            mb-8
            ">

                Dashboard Overview

            </h1>





            <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            ">



                {
                    cards.map((item,index)=>(


                        <div

                            key={index}

                            className="
                            bg-white
                            shadow-lg
                            rounded-xl
                            p-6
                            border
                            "

                        >


                            <h2 className="text-gray-500">

                                {item.title}

                            </h2>



                            <p className="
                            text-3xl
                            font-bold
                            mt-3
                            text-yellow-500
                            ">

                                {item.value}

                            </p>



                        </div>


                    ))

                }



            </div>



        </div>


    )


}