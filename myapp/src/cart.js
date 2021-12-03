import React, {useEffect , useState} from 'react';
import{Link} from 'react-router-dom';
import axios from 'axios';

const Cart = () =>{
    
    useEffect(()=>{
        getCart();
    },[true])

    const[cartitem , updateCart] = useState([]);
    const[message , processMessage] = useState("");   
    const getCart = () =>{
        var url = "http://localhost:3003/cart";
        axios.get(url).then(response=>{
            updateCart(response.data);
        })
    }

    const deleteCartItem = (pid) =>{
        var url = "http://localhost:3003/cart/"+pid;
        axios.delete(url).then(response=>{
            processMessage("Item Delete From Cart");
            getCart();// call back to reload the list after deleting from cart 
        })
    }

    return(
        <div className="container mt-3">
             <div className="row mb-5">
                <div className="col-lg-5 text-white text-center">
                    <h2> <i className="fa fa-shopping-cart"></i> React Shopping App </h2>
                    <small> <i className="fa fa-handshake-o"></i> You are Welcome </small>
                </div>
                <div className="col-lg-7 text-end pt-2">
                    <div className="btn-group">
                        <Link className="btn btn-light" to="/"> 
                            <i className="fa fa-home"></i> Home 
                        </Link>
                        <Link className="btn btn-light" to="/cart"> 
                            <i className="fa fa-shopping-cart"></i> ( {cartitem.length} ) - in My Cart 
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-12 mb-3 bg-white rounded p-4">
                    <h2 className="text-primary text-center"> Available Items in My Cart </h2>
                    <p className="text-center text-danger"> {message} </p>
                    <table className="table table-striped">
                            <thead>
                                <tr className="bg-light text-primary">
                                    <th> Id </th>
                                    <th> Product Name </th>
                                    <th> Price </th>
                                    <th> Details </th>
                                    <th> Photo </th>
                                    <th> Delete </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartitem.map((proinfo , index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{proinfo.id}</td>
                                                <td>{proinfo.name}</td>
                                                <td>{proinfo.price}</td>
                                                <td>{proinfo.details}</td>
                                                <td>
                                <img src={proinfo.photo} height="50" width="50"/>
                                                </td>
                                                <td> 
                        <button 
                            className="btn btn-danger" 
                            onClick={deleteCartItem.bind(this, proinfo.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>   
                        <div className="text-end mt-3">
                            <Link to="/placeorder" className="btn btn-danger"> Place Order </Link>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Cart;