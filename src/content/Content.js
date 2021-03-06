// Packages
import React, { useEffect, useState} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react' 
import clodinaryCore from 'cloudinary-core'

// Custom component
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Discovery from './pages/Discovery'
import Posting from './pages/Posting'


const API_URL = process.env.REACT_APP_SERVER_URL


const Content = props => {

  let [lists, setLists] = useState([])
  let [sale, setSale] = useState({currentSales: []})
  let [discoveries, setDiscoveries] = useState({publicSales:[]})
  

  //calls the List model to retrieve the List data 
  const callListAPI = () => {
   let token = localStorage.getItem('boilerToken')
   console.log('ListAPI Function running')
   fetch(API_URL + 'list', { 
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${token}`
     }
   })
   .then(listResponse => {
     console.log('ListAPI',listResponse)
     return listResponse.json()
   })
   .then(listData => {
     console.log('ListAPI', listData)
     setLists(listData.currentLists)
   })
   .catch(err => {
     console.log(err, 'Error fetching the ListAPI')
   })
 }

 //calls the Sale model to retrieve the Sale data
 const callSaleAPI = () => {
   let token = localStorage.getItem('boilerToken')
   console.log('SaleAPI Function running')
   fetch(API_URL + 'sale', {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${token}`
     }
   })
   .then(saleResponse => {
     console.log('SaleAPI', saleResponse)
     return saleResponse.json()
   })
   .then(saleData => {
     console.log('SaleAPI', saleData)
     setSale(saleData)
   })
   .catch(err => {
     console.log(err, 'Error fetching the SaleAPI')
   })
 }

 //calls the Sale model, but via an unprotected route. This makes
 //all sales available for discovery to the public
 const callDiscoveryAPI = () => {
  let token = localStorage.getItem('boilerToken')
  console.log('DiscoveryAPI Function running')
  fetch(API_URL + 'discovery', {
    method: 'GET',
    headers: {
    'Authorization': `Bearer ${token}`
    }
  })
  .then(discoveriesResponse => {
    console.log('DiscoveryAPI', discoveriesResponse)
    return discoveriesResponse.json()
  })
  .then(discoveriesData => {
    console.log('DiscoveryAPI', discoveriesData)
    setDiscoveries(discoveriesData)
  })
  .catch(err => {
    console.log(err, 'Error fetching the DiscoveryAPI')
  })
}


 useEffect(() => {
   callListAPI()
   callSaleAPI()
   callDiscoveryAPI()
 }, [])

 const callAllAPI = () => {
   callListAPI()
   callSaleAPI()
   callDiscoveryAPI()
 }



  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} url={API_URL} lists={lists} sale={sale} refresh={callAllAPI} />
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/discovery" render={
        () => <Discovery user={props.user} updateToken={props.updateToken}  refresh={callAllAPI} discoveries={discoveries} />
      } />
      <Route path="/posting" render={
        () => <Posting 
          user={props.user} 
          lists={lists} 
          sale={sale} 
          url={API_URL} 
          updateToken={props.updateToken}
          refresh={callAllAPI}
        />
      } />
    </div>
  )
}

export default Content
