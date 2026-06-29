import { useEffect, useState } from "react";
import api from "../../api/axios";


export default function CreateEmployee() {


    const [showEmployee, setShowEmployee] = useState(false);
    const [showRate, setShowRate] = useState(false);


    const [users, setUsers] = useState([]);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("sales");


    const [rate, setRate] = useState("");

    const [loading, setLoading] = useState(false);





    useEffect(() => {


        getUsers();


    }, []);






    const getUsers = async () => {


        try {


            const res = await api.get(

                "/users",

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );


            setUsers(res.data);


        }

        catch (err) {


            console.log(err);


        }


    };







    const createEmployee = async () => {


        try {


            setLoading(true);



            await api.post(

                "/auth/register",

                {

                    name,
                    email,
                    password,
                    role

                }

            );



            alert("Employee created successfully");



            setShowEmployee(false);



            setName("");
            setEmail("");
            setPassword("");
            setRole("sales");



            getUsers();



        }


        catch (error) {


            alert(

                error.response?.data?.message ||
                "Something went wrong"

            );


        }


        finally {


            setLoading(false);


        }


    };









    const saveRate = async () => {


        try {


            await api.post(

                "/rate",

                {

                    amount: rate

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );



            alert("Rate saved");

            setShowRate(false);



        }


        catch (err) {


            alert(

                err.response?.data?.message ||
                "Failed to save rate"

            );


        }


    };










    const deleteUser = async (id) => {


        try {


            await api.delete(

                `/users/${id}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );



            alert("User deleted");


            getUsers();



        }

        catch (err) {


            console.log(err);


        }


    };









    return (


        <div>


            <h1 className="
            text-3xl
            font-bold
            mb-6
            ">

                Admin Panel

            </h1>







            {/* BUTTONS */}


            <div className="
            flex
            gap-4
            mb-8
            flex-wrap
            ">


                <button


                    onClick={() => setShowEmployee(true)}


                    className="
                bg-yellow-400
                px-6
                py-3
                rounded-lg
                font-bold
                "

                >

                    Create Employee

                </button>





                <button


                    onClick={() => setShowRate(true)}


                    className="
                bg-green-500
                text-white
                px-6
                py-3
                rounded-lg
                font-bold
                "

                >

                    Set Rate

                </button>


            </div>









            {/* USERS TABLE */}



            <div className="
            bg-white
            rounded-xl
            shadow
            overflow-x-auto
            ">


                <table className="
                min-w-full
                ">
                    <thead>
                        <tr className="
                        bg-gray-100
                        text-left
                        ">
                            <th className="p-2">
                                Sr No
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Role
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>



                        {

                            users.length === 0 ?


                                (

                                    <tr>


                                        <td

                                            colSpan="5"

                                            className="
                            text-center
                            p-5
                            "

                                        >

                                            No Users Found

                                        </td>


                                    </tr>

                                )


                                :



                                users.map((u, index) => (


                                    <tr

                                        key={u._id}

                                        className="
                    border-b
                    "


                                    >



                                        <td className="p-4">

                                            {index + 1}

                                        </td>




                                        <td>

                                            {u.name}

                                        </td>




                                        <td>

                                            {u.email}

                                        </td>




                                        <td>


                                            <span className="
                            capitalize
                            ">

                                                {u.role}

                                            </span>


                                        </td>





                                        <td>


                                            <button


                                                onClick={() => deleteUser(u._id)}


                                                className="
                            bg-red-500
                            text-white
                            px-4
                            py-2
                            rounded
                            cursor-pointer
                            hover:bg-red-700
                            "

                                            >


                                                Delete


                                            </button>


                                        </td>




                                    </tr>



                                ))

                        }



                    </tbody>



                </table>



            </div>













            {/* CREATE EMPLOYEE MODAL */}



            {

                showEmployee &&


                <div className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            ">



                    <div className="
                bg-white
                p-6
                rounded-xl
                w-[90%]
                max-w-md
                ">


                        <h2 className="
                    text-xl
                    font-bold
                    mb-5
                    ">

                            Create Employee

                        </h2>





                        <input

                            placeholder="Name"

                            value={name}

                            onChange={
                                e => setName(e.target.value)
                            }

                            className="input mb-3"

                        />




                        <input

                            placeholder="Email"

                            value={email}

                            onChange={
                                e => setEmail(e.target.value)
                            }

                            className="input mb-3"

                        />




                        <input

                            placeholder="Password"

                            type="password"

                            value={password}

                            onChange={
                                e => setPassword(e.target.value)
                            }

                            className="input mb-3"

                        />





                        <select

                            value={role}

                            onChange={
                                e => setRole(e.target.value)
                            }

                            className="input mb-4"

                        >


                            <option value="sales">

                                Sales Person

                            </option>



                            <option value="admin">

                                Admin

                            </option>


                        </select>






                        <button


                            onClick={createEmployee}


                            className="
                    bg-yellow-400
                    px-5
                    py-2
                    rounded
                    "

                        >


                            {
                                loading
                                    ?
                                    "Creating..."
                                    :
                                    "Create"
                            }


                        </button>





                        <button

                            onClick={() => setShowEmployee(false)}

                            className="
                    ml-4
                    "

                        >

                            Close

                        </button>




                    </div>



                </div>


            }
            {/* RATE MODAL */}

            {

                showRate &&


                <div className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            ">
                    <div className="
                bg-white
                p-6
                rounded-xl
                w-[90%]
                max-w-md
                ">

                        <h2 className="
                    text-xl
                    font-bold
                    mb-5
                    ">

                            Set Rate

                        </h2>

                        <input


                            type="number"


                            value={rate}


                            onChange={
                                e => setRate(e.target.value)
                            }


                            placeholder="Enter rate"


                            className="
                    input
                    mb-4
                    "


                        />

                        <button


                            onClick={saveRate}


                            className="
                    bg-green-500
                    text-white
                    px-5
                    py-2
                    rounded
                    "

                        >


                            Save


                        </button>





                        <button

                            onClick={() => setShowRate(false)}

                            className="
                    ml-4
                    "

                        >

                            Close

                        </button>



                    </div>


                </div>


            }



        </div>


    )

}