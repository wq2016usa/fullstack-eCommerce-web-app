import { useEffect, useState } from 'react';

const apiUrl = "http://localhost:8080";
const UserOrdersDetails = ({userId, cart}) =>{
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        // Fetch product data from the backend API
        fetch(`${apiUrl}/ehome/view_order&userId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            setAllOrders(data);
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
          });

          
    }, [cart]);

    console.log(allOrders);
    return(
        <div>
            <div>
                {allOrders.map((order)=>{
                    return(
                    <div className='each_order'>
                        <h4>order number - {order.orderId}</h4>
                        {
                            order.purchases.map((product)=>(
                                <div className='products_in_order'>
                                    <p>product name: {product.product.productName}</p>
                                    <p>product price: ${product.product.price.toFixed(2)}</p>
                                    <p>product quantity: {product.order_quantity}</p>
                                    <img src={`${product.product.imageUrl}`} alt={product.product.productName} />
                                </div>
                            ))
                        }

                    </div>
                )})}
            </div>
        </div>   
    )
}

export default UserOrdersDetails;