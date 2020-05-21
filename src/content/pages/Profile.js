import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

//Go over how tokens are used to make an API call and retrieve info
//Declare API URL that we want to call 


//this component should list all the items 

const Profile = props => {

	let itemz = props.item.currentList.map((l, i) => {
		return (
			<div key={i}>
				<p>{l.listTitle}</p>
			</div>
		)
	})

	let sales = props.sale.currentSales.map((s, j) => {
		return (
			<div key={j}>
				<p>{s.date}</p>
				<p>{s.address}</p>
			</div>
		)
	})

  return (
    <div>
		<div>
			<h2>{props.user.firstname}</h2>
			<img src={props.user.pic} alt={props.user.firstname} />
			
		</div>
		<div>
			<button><a href='/posting'>+</a></button>
			{sales}{itemz}
		</div>
    </div>
  )
}

export default Profile
