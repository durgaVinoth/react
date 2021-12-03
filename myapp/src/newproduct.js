import React, { useState } from 'react';
import axios from 'axios';

const Newproduct = () => {
    const [name, processName] = useState("");
    const [price, processPrice] = useState("");
    const [details, processDetails] = useState("");
    const [photo, processPhoto] = useState("");
    const [message, processMessage] = useState("");

    const save = () => {
        var url = "http://localhost:3003/product";
        var data = {
            "name": name,
            "price": price,
            "photo": photo,
            "details": details
        };
        axios.post(url , data).then(response=>{
            processMessage(name + " Save Successfully !")
        })
    }

    return (
        <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 bg-white p-4 rounded">
                <h3 className="text-center text-primary"> Add Product </h3>
                <p className="text-center text-danger">{message}</p>
                <div className="mb-3">
                    <label>Product Name</label>
                    <input type="text" className="form-control"
                        onChange={obj => processName(obj.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Product Price</label>
                    <input type="text" className="form-control"
                        onChange={obj => processPrice(obj.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Photo</label>
                    <input type="text" className="form-control"
                        onChange={obj => processPhoto(obj.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Product Details</label>
                    <textarea className="form-control"
                        onChange={obj => processDetails(obj.target.value)}></textarea>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={save}>Save Product</button>
                </div>
            </div>
            <div className="col-lg-3"></div>
        </div>
    )
}

export default Newproduct;