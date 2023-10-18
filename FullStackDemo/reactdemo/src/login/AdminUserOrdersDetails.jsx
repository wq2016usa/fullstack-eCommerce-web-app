import { useEffect, useState } from 'react';

const AdminUserOrdersDetails = () =>{
    const [allUsers, setAllUsers] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    // const [checkIfOrder, setCheckIfOrder] = useState(false);
    

    useEffect(() => {
        // Fetch product data from the backend API
        fetch(`http://localhost:8080/ehome_admin/all_users`)
          .then((response) => response.json())
          .then((data) => {
            setAllUsers(data);
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
        });

        fetch(`http://localhost:8080/ehome_admin/all_orders`)
            .then((response) => response.json())
            .then((orders) => {
                setAllOrders(orders)
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });


    }, []);

    console.log('uu',allUsers, allOrders);

    return(
        <div>
            <div className='admin_user'>
                {allUsers.map((user)=>{
                    let checkIfOrder=false;
                    return !user.isAdmin&&(
                        <div className='user'>
                            <h4>username: {user.username}</h4>
                            {
                                allOrders.map((order)=>{
                                    return(
                                        <div>
                                            {!user.isAdmin && user.userId===order.euser.userId&&<h4>Order Id - {order.orderId}</h4>}
                                            {
                                                
                                            order.purchases.map((product)=>{
                                                if(!user.isAdmin && user.userId===order.euser.userId){
                                                    checkIfOrder=true;
                                                    // console.log('ee',product);
                                                    return(
                                                        <div className='products_in_admin'>
                                                            <p>product name: {product.product.productName}</p>
                                                            <p>product price: ${product.product.price.toFixed(2)}</p>
                                                            <p>product quantity: {product.order_quantity}</p>
                                                            <img src={`${product.product.imageUrl}`} alt={product.product.productName} />
                                                        </div>
                                                    )
                                                }
                                            })   
                                            }
                                        </div>
                                )})
                            }

                            {!checkIfOrder&&(<div><h5>no order</h5></div>)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminUserOrdersDetails;