import React, {useEffect , useState} from 'react';
import{Link} from 'react-router-dom';
import axios from 'axios';

const Placeorder = () =>{
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

    const[name , pickName] = useState("");
    const[email , pickEmail] = useState("");
    const[mobile , pickMobile] = useState("");
    const[address , pickAddress] = useState("");
    const save = () =>{
        var myorder = { "name":name, "mobile":mobile, "email":email, "address":address, "product":cartitem};
        var url = "http://localhost:3003/orderlist";
        axios.post(url , myorder)
        .then(response =>{
            processMessage("Your Order Placed Successfully !")
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

            <div className="row mt-4 mb-5">
                <div className="col-lg-12 mb-3">
                    <h2 className="text-white text-center"> Enter Your Details To Place an Order </h2>
                    <p className="text-center text-white"> {message} </p>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="bg-white p-4 rounded">
                        <div className="mb-3">
                            <label>Enter Your Name</label>
                            <input type="text" className="form-control" onChange={obj=>pickName(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Enter Your Mobile</label>
                            <input type="text" className="form-control" onChange={obj=>pickMobile(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Enter Your E-Mail</label>
                            <input type="text" className="form-control" onChange={obj=>pickEmail(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Enter Your Address</label>
                            <textarea className="form-control" onChange={obj=>pickAddress(obj.target.value)}></textarea>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={save}>Place Order Now</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Placeorder;