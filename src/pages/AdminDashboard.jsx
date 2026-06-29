import {useState} from "react";

import Sidebar from "../components/admin/Sidebar";

import AdminOverview from "../components/admin/AdminOverview";

import CreateEmployee from "../components/admin/CreateEmployee";

import UserData from "../components/admin/UserData";



export default function AdminDashboard(){


const [active,setActive]=useState("dashboard");



return(


<div className="
min-h-screen
flex
bg-gray-100
">


<Sidebar setActive={setActive}/>




<main className="
flex-1
p-6
md:p-10
overflow-auto
">


{
active==="dashboard"

&&

<AdminOverview/>

}



{
active==="create"

&&

<CreateEmployee/>

}




{
active==="data"

&&

<UserData/>

}



</main>



</div>


)


}