import React from 'react';
import {userData} from './common.js';
//import EditProduct from './EditProduct';
class Product extends React.Component{
	constructor(props){
		super(props)
		this.state={
			userData:userData,
			newUser:{
				id:null,
				pname:'',
				pqunty:'',
			},
			addData:false,
		}
	}

	addNewUser=(event)=>{
		let newUser=this.state.newUser
		newUser['id']=this.state.userData.length+1
		newUser[event.target.name]=event.target.value
		this.setState({
			newUser
		},()=>console.log(this.state.newUser.pname,this.state.newUser.pqunty))
	}
		handleSubmit=(event)=>{
			event.preventDefault();
			this.setState({
				userData:[...this.state.userData,this.state.newUser],
				newUser:{
							id:null,
							pname:'',
							pqunty:'',
						},
				addData:false,
			})
		}

	render(){
			console.log(this.state.userData)
		return(
			<div>
				<h1><u>Product Information</u></h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Name</label>
						<input name="pname" onChange={this.addNewUser} defaultValue={this.state.newUser.pname}/>
					</div>
						<div>
						<label>Quantity</label>
						<input name="pqunty" onChange={this.addNewUser} defaultValue={this.state.newUser.pqunty}/>
					</div>
						<button>ADD PRODUCT</button>
				</form>
				<table style={{ border: '2px solid black', marginLeft: '10%'}} >
            			<thead>
            				<tr>
	            				<th>ID</th>
	            				<th>Name</th>
	            				<th>Quantity</th>
	            				<th>Action</th>
            				</tr>
            			</thead>
            				<tbody>
            					{this.state.userData.map((item,index)=>
            						(
            						<tr key={item.id}>
            						<td>{item.id}</td>
            						<td>{item.pname}</td>
            						<td>{item.pqunty}</td>
            						
            					</tr>
            					)
            					        				
           					)}
            					</tbody>
            		</table>
			</div>
				
            

			)
	}
}
export default Product;