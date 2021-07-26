/* Global Variables */
const apiKey = '&appid=d71bce87d2497801e6f25a5b92f9aaf7&units=metric';
const baseURL= 'https://api.openweathermap.org/data/2.5/weather?zip='


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//To make the generate button executable
document.getElementById('generate').addEventListener('click', (e)=>{
	const zip = document.getElementById('zip').value; // To know what country to add which is a dynamic value that the user enters.
	const feelings = document.getElementById('feelings').value;
	
  getWeatherData(baseURL,zip,apiKey)

    .then(function(data){
    	
    	console.log(data);
    	postData('/addData',{date:newDate, temp:data.main.temp, content:feelings}) //this is what will be sent to the server
    	updateUI();
    });
});


const getWeatherData = async (url,zipCode,API_key)=>{  
 
    const res = await fetch(url+zipCode+API_key);
    try {

      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
    }
}

const postData = async ( url = '', data = {})=>{  
     console.log(data);
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
      console.log("error", error);
      }
}

const updateUI = async()=>{
const request = await fetch('/all')
try{
const allData = await request.json();
console.log(allData)
document.getElementById('date').innerHTML = `Date: ${allData.date}`;
document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
}catch(err){
console.log('error',err);
}
}