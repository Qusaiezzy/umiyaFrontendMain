import axios from "axios";


export default axios.create({

baseURL:
// "https://umiya-backend.onrender.com/api"
"http://localhost:5000/api"

});