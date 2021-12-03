import React, {useEffect , useState} from 'react';
import{Link} from 'react-router-dom';
import axios from 'axios';

const Home = () =>{
    
    const[product , updateProduct] = useState([]);
    const getProduct = () =>{
        axios.get("http://localhost:3003/product")
        .then(response=>{
            updateProduct(response.data.reverse());
        })
    }

    useEffect(()=>{
        getProduct();
        getCart();
    },[true])

    const[cartitem , updateCart] = useState([]);

    const[message , processMessage] = useState("");   
    const addToCart = (productData) =>{
        var url = "http://localhost:3003/cart";
        axios.post(url , productData).then(response=>{
            processMessage(" Item Added to cart ");
            getCart(); // to update the count in cartitem on top right header
        })
    }

    const getCart = () =>{
        var url = "http://localhost:3003/cart";
        axios.get(url).then(response=>{
            updateCart(response.data);
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
                <div className="col-lg-12 mb-3 text-center text-white">
                    <p> {message} </p>
                </div>
                {
                    product.map((pinfo , index)=>{
                        return(
                            <div className="col-xl-3 col-lg-4 col-sm-2 col-12 mb-3" key={index}>
                                <div className="bg-white p-3 rounded text-center">
                                    <h4 className="text-primary">{pinfo.name}</h4>
                                    <img src={pinfo.photo} className="rounded" height="110" width="80%"/>
                                    <p>Rs.{pinfo.price}</p>
                                    <p>{pinfo.details}</p>
                                    <button className="btn btn-danger btn-sm" onClick={addToCart.bind(this , pinfo)}> 
                                        <i className="fa fa-plus"></i> Add to Cart 
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;