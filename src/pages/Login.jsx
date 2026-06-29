import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();



    const login = async () => {


        const res =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );



        localStorage.setItem(
            "token",
            res.data.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
        );



        if (
            res.data.user.role === "admin"
        ) {

            navigate("/admin");

        }
        else {

            navigate("/sales");

        }


    };



    return (


        <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-yellow-50
        via-white
        to-green-100
        px-4
        ">


            <div className="
            w-full
            max-w-5xl
            bg-white
            rounded-3xl
            shadow-2xl
            overflow-hidden
            grid
            grid-cols-1
            md:grid-cols-2
            ">



                {/* Solar Information Section */}

                <div

                    className="
                    hidden
                    md:flex
                    flex-col
                    justify-center
                    p-12
                    bg-cover
                    bg-center
                    relative
                    "

                    style={{

                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=80')"

                    }}

                >


                    <div className="
                    absolute
                    inset-0
                    bg-black/40
                    "></div>



                    <div className="
                    relative
                    z-10
                    text-white
                    ">


                        <h1 className="
                        text-5xl
                        font-bold
                        mb-5
                        ">

                            Umiya Enterprises

                        </h1>



                        <p className="
                        text-xl
                        leading-relaxed
                        ">

                            Powering businesses and homes
                            with clean solar energy solutions.

                        </p>




                        <div className="
                        mt-8
                        space-y-4
                        ">


                            <div className="flex gap-3 items-center">

                                <span className="
                                bg-yellow-400
                                text-black
                                p-3
                                rounded-full
                                ">

                                    ☀️

                                </span>


                                <span>
                                    Renewable Solar Energy
                                </span>


                            </div>




                            <div className="flex gap-3 items-center">

                                <span className="
                                bg-green-500
                                p-3
                                rounded-full
                                ">

                                    🌱

                                </span>


                                <span>
                                    Sustainable Future
                                </span>


                            </div>





                            <div className="flex gap-3 items-center">


                                <span className="
                                bg-blue-500
                                p-3
                                rounded-full
                                ">

                                    ⚡

                                </span>


                                <span>
                                    High Efficiency Systems
                                </span>


                            </div>



                        </div>



                    </div>


                </div>







                {/* Login Form */}


                <div className="
                p-8
                sm:p-12
                flex
                flex-col
                justify-center
                ">



                    <div className="text-center mb-8">


                        <div className="
                        mx-auto
                        w-20
                        h-20
                        rounded-full
                        bg-yellow-400
                        flex
                        items-center
                        justify-center
                        text-4xl
                        shadow-lg
                        ">

                            ☀️
                        </div>



                        <h2 className="
                        mt-5
                        text-3xl
                        font-bold
                        text-gray-800
                        ">

                            Welcome Back

                        </h2>



                        <p className="
                        text-gray-500
                        mt-2
                        ">

                            Login to Umiya Enterprises

                        </p>


                    </div>





                    <label className="
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                    ">

                        Email

                    </label>



                    <input

                        type="email"

                        placeholder="Enter your email"


                        className="
                        w-full
                        px-5
                        py-3
                        mb-5
                        rounded-xl
                        border
                        border-gray-300
                        outline-none
                        focus:ring-2
                        focus:ring-yellow-400
                        "

                        onChange={
                            e => setEmail(e.target.value)
                        }


                    />







                    <label className="
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                    ">

                        Password

                    </label>



                    <input


                        type="password"


                        placeholder="Enter your password"



                        className="
                        w-full
                        px-5
                        py-3
                        mb-6
                        rounded-xl
                        border
                        border-gray-300
                        outline-none
                        focus:ring-2
                        focus:ring-yellow-400
                        "


                        onChange={
                            e => setPassword(e.target.value)
                        }


                    />







                    <button


                        onClick={login}



                        className="
                        cursor-pointer
                        w-full
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-yellow-400
                        to-orange-500
                        text-white
                        font-bold
                        text-lg
                        shadow-lg
                        hover:scale-105
                        transition
                        duration-300
                        "


                    >

                        Login

                    </button>




                    <p className="
                    text-center
                    text-sm
                    text-gray-400
                    mt-8
                    ">


                        © {new Date().getFullYear()} Umiya Enterprises
                        <br />

                        Powering a greener tomorrow 🌱


                    </p>




                </div>




            </div>



        </div>


    );


}