import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Error from './components/Error';
import Weather from './components/Weather'

function App() {

  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState(false)
  const [resultWeather, setResultWeather] = useState({})
  useEffect(() => {
    // prevent fist callApi 
    if(city === '') return;

    const queryApi = async () => {

      const appId = 'e3646bbc406abe0aa693067648112d7d';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}` 
  
      const answer = await fetch(url);
      const result = await answer.json();
    
      console.log(result);
      setResultWeather(result);
    }

    queryApi()
  }, [city, country])
  
  const queryData = data => {
    // Validate form 
    if(data.city === '' || data.country === ''){
      setError(true)
      return; 
    }
    // if city and country exist, add to state: 
    setCity(data.city)
    setCountry(data.country)
    setError(false)
  }
  
  // load a conditional components
  let component;
  if(error){
    // There is an error  
    component = <Error message={"Ambos campos son obligatorios"} />;
  } else if(resultWeather.cod === '404'){
    component = <Error message={"No se encuentra la ciudad"} />;
  } else {
    // There is no error
    component = <Weather resultWeather={resultWeather}/>;
  }


  return (
    <div className="App">
      <Header title="React App" />
      
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            
            <div className="col s12 m6">
              <Form queryData={queryData} />
      
            </div>

            <div className="col s12 m6">
              {component}
      
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
