import React , {useState , useEffect} from 'react';
import axios from 'axios';

const OrderList = () =>{
const[order , updateOrder] = useState([]);
const getOrder = () =>{
    axios.get("http://localhost:3003/orderlist")
    .then(response=>{
        updateOrder(response.data.reverse());
    })
}
useEffect(()=>{
    getOrder();
}, [true])


    return(
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="bg-white p-2 rounded">
                        <h3 className="text-center"> {order.length} - Order List </h3>
                        {
                            order.map((info , index)=>{
                                return(
                                    <div className="row mb-3" key={index}>
                                        <div className="col-lg-6">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr> <th>Name</th><td>{info.name}</td> </tr>
                                                    <tr> <th>Mobile</th><td>{info.mobile}</td> </tr>
                                                    <tr> <th>e-Mail</th><td>{info.email}</td> </tr>
                                                    <tr> <th>Address</th><td>{info.address}</td> </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="col-lg-6">
                                            <table className="table table-border">
                                                <thead>
                                                    <tr>
                                                        <th> Product </th>
                                                        <th> Price </th>
                                                        <th> Photo </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        info.product.map((pro , index2)=>{
                                                            return(
                                                                <tr key={index2}>
                                                                    <td> {pro.name} </td>
                                                                    <td> {pro.price} </td>
                                                                    <td> <img src={pro.photo} height="40" width="50"/></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-lg-12 bg-primary p-2">  </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderList;