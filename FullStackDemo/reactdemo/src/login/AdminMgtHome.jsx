import { useEffect, useState } from 'react';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import UpdatedProductCard from './UpdatedProductCard';
import AdminUserOrdersDetails from './AdminUserOrdersDetails';
import './ECommerce.css';

const AdminMgtHome =  () => {
  const apiUrl = "http://localhost:8080";
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [desc, setDesc] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        // Fetch product data from the backend API
        fetch(`${apiUrl}/ehome_admin`)
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
    }, [isUpdate]);

    const makeUpdate = () =>{
      setIsUpdate(!isUpdate);
    }
    
    const addProduct = async(e) => {
        e.preventDefault();
        // Validate input
        // if (!productName || !productPrice) {
        //   alert('Please enter product name and price.');
        //   return;
        // }

        // Send a POST request to the Spring Boot backend
        const response = await fetch(`${apiUrl}/ehome_admin/admin_management_page/store_new_product`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "productName":productName, 
            "price":productPrice,
            "quantity": quantity,
            "description":desc,
            "imageUrl":imageUrl
          }),
      });

      // Handle the response accordingly (e.g., display a success message)
      const result = await response.json();
      console.log('r',result);
      if (!result.isCreated) {
          alert("product already exists, please change another one!");
      }else{
      
          // Add new product to the products list
          const newProduct = { productName: result.productInfo.productName, 
            price: result.productInfo.price, 
            quantity: result.productInfo.quantity,
            description: result.productInfo.description,
            imageUrl: result.productInfo.imageUrl
            };
          setProducts([...products, newProduct]);
      
          // Clear input fields
          setProductName('');
          setProductPrice('');
          setQuantity('');
          setDesc('');
          setImageUrl('');
          makeUpdate();
        }
      };
    
      const deleteProduct = (productId) => {
        // Filter out the product with the given ID
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
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
          <h1>E-Commerce Admin Management</h1>
          <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
          </header>
          <hr style={{ width: '100%', margin: '10px 0', borderTop: '1px solid #ddd' }} />
          {loading ? (
              <p>Loading...</p>
          ) : (
          <div>
              <form className="add_new_product_form" onSubmit={addProduct}>
                  <h3>Add New Product</h3>
                  <label>
                    Product Name:
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                  </label>
                  
                  <label>
                    Product Price:
                    <input type="number" step="0.01" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required/>
                  </label>

                  <label>
                    Product Quantity:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>
                  </label>

                  <label>
                    Product Description:
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} required/>
                  </label>

                  <label>
                    Product Image:
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required/>
                  </label>
                  <br />
                  <button>Add Product</button>
              </form>

              <hr style={{ width: '100%', margin: '10px 0', borderTop: '1px solid #ddd' }} />

              <div>
                  <h3>Product List</h3>
                  <section className="product-grid">
                      {products.map((product) => (
                          <UpdatedProductCard update_product_Id={product.productId} product={product} isUpdate={makeUpdate}/>
                      ))}
                  </section>
              </div>
          </div>

        )}

        <hr style={{ width: '100%', margin: '10px 0', borderTop: '1px solid #ddd' }} />

        <div>
            <h2>Users & Orders View</h2>
            <div>
                <AdminUserOrdersDetails/>
            </div>
        </div>
            
      </div>
    )
}

export default AdminMgtHome;