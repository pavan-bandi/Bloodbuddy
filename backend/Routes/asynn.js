axios=require('axios')
const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: '53.1,-0.13'},
    headers: {
      'X-RapidAPI-Key': 'bb2dc99b0dmsha109131f374e037p196a6ajsn8bb5bbd9c6f6',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
async function k(){
    const response = await axios(options);
  
    console.log(response);
    console.log("pavan kalyan")
}

    k();
    console.log(10)


  
 

  
  
  
  
  
  