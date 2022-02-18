/* Global Variables */
const apiKey = 'e5cd678a04439e1e196ae06234dd8590&units=imperial'
// Create a new date instance dynamically with JS

let d = new Date();
let day = d.getDate();
let month = d.getMonth()+1; 
let year=  d.getFullYear();
let newDate = month + '.' + day + '.' + year;
// Dynamically accept zipcode
const weatherURL = (zipCode) => {
  return `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`;
};

const convertTemp = (k) => {
  console.log(k);
  const temp = {
    fahrenheit: Math.round(((Number(k) - 273.15) * 9) / 5 + 32),
    celcius: Math.round(Number(k) - 273.15),
  };
  return temp;
};

// GET the Weather from OpenWeatherMap API
const getWeatherData = async () => {
  const zipCode = document.getElementById('zip').value;
  const res = await fetch(weatherURL(zipCode));
  try {
    const data = await res.json();
    const temp = data.main.temp;
    const content = document.getElementById('feelings').value;
    const newData = {
      date: newDate,
      cityName: data.name,
      temp,
      content,
    };
    return newData;
  } catch (err) {
    console.log('error:', err);
  }
};

// POST to the Journal(on local server)
const postData = async (url = '', newData = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('error:', err);
    return false;
  }
};
/* Function to GET Project Data */
const retrieveData = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData) }
  catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
  }
// Add the data to the Page (Update UI)
const updateUI = (data) => {
  document.getElementById('date').innerHTML=`Today is ${data.date}`;
  document.getElementById('temp').innerHTML=`In ${data.cityName}, it is ${data.temp}`;
  document.getElementById('content').innerHTML=`${data.content}`;
};

document.getElementById('generate').addEventListener('click', () =>
    getWeatherData().then((data) =>
    postData('/api', data).then((data) => updateUI(data))
    )
  );
