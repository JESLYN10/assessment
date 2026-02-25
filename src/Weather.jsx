import {useState,useEffect} from "react"
import axios from "axios";

export default function Weather(){
    const [weatherData,setWeatherData]=useState([]);
    const [check,setCheck]=useState(null);
    const[error,setError]=useState(null);

    const API="https://weather.indianapi.in";
    const city="Delhi"

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData=async()=>{
        try{
           const res=await axios.get(`${API}/india/weather/${city}`,{headers:{Authorization:"sk-live-YoOf4HXP0I29G0Z6UtTkPAUXWBypMfaxn43ybFcU"}});
           setWeatherData(res.data.slice(0,5));
        }
        catch{(err)=>{
            setError("Failed to fetch data");
            console.log(err);
        }
        }
    }

    return(
        <div>
            <div>
                <h1>Weather Data</h1>
                 <button onClick={()=>setCheck("view")}>View Weather Data</button>
                 <br/>
                 <button onClick={()=>setCheck("add")}>Add Weather Data</button>

                 {check === "view"}?
                 (
                   {weatherData.length === 0}?
                   (
                     <p>No Weather Data</p>
                   ):
                   (
                     {weatherData.map((weather,index)=>{
                        <li key={index}>
                          {weather.city}-{weather.forecast}
                        </li>
                     })}
                   )
                 ):
                 (
                <p>Form</p>
                 );
            </div>
        </div>
    )
}
