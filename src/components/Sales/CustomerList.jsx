import { useEffect, useState } from "react";
import api from "../../api/axios"


export default function CustomerList() {


    const [data, setData] = useState([]);


    useEffect(() => {


    api.get(

        "/customers",

        {

            headers: {

                Authorization:
                `Bearer ${localStorage.getItem("token")}`

            }

        }

    )

    .then(res => {


        console.log("Customer List:",res.data);



        setData(

            Array.isArray(res.data)

            ?

            res.data

            :

            res.data.customers || []

        );


    })


    .catch(err=>{


        console.log(err);


        setData([]);


    });


}, []);




    return (

        <div className="
bg-white
rounded-xl
shadow
p-4
overflow-x-auto
">


            <h2 className="
text-xl
font-bold
mb-4
">
                My Customers
            </h2>


            <table className="
min-w-full
text-sm
">


                <thead className="
bg-gray-200
">


                    <tr>

                        <th className="p-3 text-left">
                            Name
                        </th>


                        <th className="p-3 text-left">
                            Mobile
                        </th>


                        <th className="p-3 text-left">
                            Status
                        </th>


                        <th className="p-3 text-left">
                            Rate
                        </th>


                    </tr>


                </thead>



                <tbody>


                    {
                        data.length === 0 ?

                            <tr>

                                <td
                                    colSpan="4"
                                    className="
text-center
p-5
"
                                >

                                    No Customers Found

                                </td>

                            </tr>


                            :

                            data.map(c => (


                                <tr
                                    key={c._id}
                                    className="
border-b
"
                                >


                                    <td className="p-3">
                                        {c.customerName}
                                    </td>


                                    <td className="p-3">
                                        {c.mobile}
                                    </td>


                                    <td className="p-3 capitalize">
                                        {c.status}
                                    </td>


                                    <td className="p-3">
                                        ₹{c.rate}
                                    </td>


                                </tr>


                            ))

                    }


                </tbody>


            </table>


        </div>

    )

}