import React from 'react'
import Country from './Country'

function CountryList({countries,handleShow}) {

    if(countries.length == 1){
      return (
        <Country name={countries[0]}/>
      )
    } else if(countries.length < 10){
      return(<ul>
        {countries.map((country,index) => {
        return <li key={index}>{country.slice(0,1).toUpperCase() + country.slice(1)} <button onClick={() => handleShow(country)}>show</button></li>
      })}
      </ul>)
    }else if(countries.length == 250){
      return null;
    } 
    else{
    return (
    <p>Too many matches, specify another filter</p>
    ) 
  }
}

export default CountryList