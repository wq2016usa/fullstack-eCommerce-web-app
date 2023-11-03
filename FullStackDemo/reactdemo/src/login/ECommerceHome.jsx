import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserOrdersDetails from './UserOrdersDetails';
import './ECommerce.css';

const apiUrl = "http://23.22.243.101:8080";
const products = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
    // ... add more products
];

const ProductCard = ({ product,cart, setCart }) => {
    
    const addToCart = (product) => {
        // Check if the product is already in the cart
        const existingProduct = cart.find((item) => item.productId === product.productId);
    
        if (existingProduct) {
          // If the product is already in the cart, update its quantity
          setCart(
            cart.map((item) =>
              item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
            )
          );
        } else {
          // If the product is not in the cart, add it with quantity 1
          setCart([...cart, { ...product, quantity: 0 }]);
        }
      };

      console.log('ca',cart);
    return (
        <div className="product-card">
        <img src={`${product.imageUrl}`} alt={product.name} />
        <h3>{product.productName}</h3>
        <p>${product.price.toFixed(2)}</p>
        <p>{product.quantity}</p>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
}


const ECommerceHome =  () =>{
    const { user_id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const initialCart = JSON.parse(localStorage.getItem(`cart_${user_id}`)) || [];
    const [cart, setCart] = useState(initialCart);
  
    useEffect(() => {
        // Fetch product data from the backend API
        fetch(`${apiUrl}/ehome/${user_id}`)
          .then((response) => response.json())
          .then((data) => {
            setProducts(data);
            console.log(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
            setLoading(false);
          });

          localStorage.setItem(`cart_${user_id}`, JSON.stringify(cart));
    }, [cart]);

    const updateQuantity = (productId, newQuantity) => {
        setCart(
          cart.map((item) =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
          )
        );
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.productId !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const orderHandler = async(e) => {
        e.preventDefault();
        
        if(cart.length){
            let productsIdArr = cart.map((element) => ({"product": {"productId":element.productId}, "order_quantity": element.quantity}));
            console.log(productsIdArr)
            //sending the order to a server
            // Send a POST request to the Spring Boot backend
            const response = await fetch(`${apiUrl}/ehome/save_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "euser": {
                    "userId": user_id
                },
                "purchases": productsIdArr
            }),
        });

            // Handle the response accordingly (e.g., display a success message)
            const result = await response.json();
            console.log(result);
            if(result){
                alert("purchase successfully!");
                setCart([]);
            }else{
                alert("purchase failed!");
            }
        }else{
            alert("please add products into cart!");
        }
    };
    
    const handleLogout = async () => {
        try {
          // Send a request to your server to logout
          await fetch(`${apiUrl}/ehome/logout`, {
            method: 'POST',
            credentials: 'include', // Include credentials (cookies) in the request
          });
    
          // Clear cookies on the client side
          document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
          // Redirect or perform other actions after logout
          window.location.href = '/'; // Redirect to the login page, for example
        } catch (error) {
          console.error('Error during logout:', error);
        }
    };

    return(
        <div className="home_page">
            <header>
            <h1>E-Commerce Store</h1>
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            </header>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <section className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} cart={cart} setCart={setCart}/>
                ))}
                </section>
            )}


            <div>
                <h2>Shopping Cart</h2>
                <ul>
                    {/* {cart.map((item, index) => (
                    <li key={index}>
                        {item.productName} x 1
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                    </li>
                    ))} */}

                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.productName} - ${item.price} - Quantity:{' '}
                            <input
                                type="number"
                                defaultValue={0}
                                onChange={(e) => updateQuantity(item.productId, e.target.value)}
                                min="1"
                            />{' '}
                            <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <p>Total: ${calculateTotal()}</p>
                <button onClick={orderHandler}>Order</button>
            </div>


            <div>
                <h2>Orders</h2>
                <ur>
                    <UserOrdersDetails userId={user_id} cart={cart}/>
                </ur>
            </div>
        </div>
    )
}

export default ECommerceHome;