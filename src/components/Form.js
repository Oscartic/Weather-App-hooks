import React, { useState } from 'react';

function Form({ queryData }) {

    const [search, saveSearch ] = useState({
        city: '',
        country: ''
    }) 

    const handleChange = e => {
        saveSearch({
            ...search, 
            [e.target.name]: e.target.value
        })
    }

    const sendQuery = e => {
        e.preventDefault();
        
        // go data to the main component
        queryData(search);
    }

    return(
        <form onSubmit={sendQuery}>
            <div className="input-field col s12">
                <input type="text" name="city" id="city" onChange={handleChange}/>
                <label htmlFor="city"></label>
            </div>

            <div className="input-field col s12">
                <select name="country" onChange={handleChange}>
                    <option value="">Selecciona un Pais</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Coscta Rica</option>
                </select>
            </div>

            <div className="input-field col s12">
                <input type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4" value="Buscar Clima" />
            </div>

        </form>
    )
}

export default Form;