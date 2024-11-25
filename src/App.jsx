import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CountryList from './component/CountryList'


function App() {
  const [searchFilter, setSearchFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries,setFiltered] = useState(null)
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const handleChange = (event) =>{
    console.log(event.target.value)
    setSearchFilter(event.target.value)
  }
  const handleShow = (country)=>{
    console.log(country)
    setFiltered([country])
  }

  useEffect(()=>{
    axios.get(url)
    .then(response => response.data)
    .then(data => 
      setCountries(data.map((value)=> value.name.common.toLowerCase())
    )
  )
  },[])
  useEffect(() => {
    // console.log(filteredCountries)
    if(countries){
    setFiltered(countries.filter((country)=>country.includes(searchFilter.toLowerCase())))
}},[searchFilter])

if(!countries){
  return null
}
  return (
    <div>
    <span>find countries</span> <input type="text" onChange={handleChange} />
    
    {filteredCountries ? <CountryList handleShow={handleShow} countries={filteredCountries}/> : ''}
    </div>
  )
}

export default App
