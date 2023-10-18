import { useEffect, useState } from 'react';

const UpdatedProductCard = ({ product, isUpdate }) => {
    const [updatedProductName, setUpdatedProductName] = useState('');
    const [updatedProductPrice, setUpdatedProductPrice] = useState(null);
    const [updatedQuantity, setUpdatedQuantity] = useState(null);
    const [updatedDesc, setUpdatedDesc] = useState('');
    const [updatedimageUrl, setUpdatedImageUrl] = useState('');
    
    const updateProduct = async(e) =>{
        e.preventDefault();
    
        const response = await fetch(`http://localhost:8080/ehome_admin/admin_management_page/update=${product.productId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "productId": product.productId,
            "productName":updatedProductName, 
            "price":updatedProductPrice,
            "quantity": updatedQuantity,
            "description":updatedDesc,
            "imageUrl":updatedimageUrl
          }),
        });

        const result = await response.json();
        console.log('r',result);
        if(result){
            alert(`${product.productName} Updated!`);
            isUpdate();
            setUpdatedProductName('');
            setUpdatedProductPrice('');
            setUpdatedQuantity('');
            setUpdatedDesc('');
            setUpdatedImageUrl('');
        }else{
            alert(`${product.productName} Not Updated! Please input again!`);
        }
        
    }

    const deleteProduct = async(e) =>{
        e.preventDefault();

        const response = await fetch(`http://localhost:8080/ehome_admin/admin_management_page/delete=${product.productId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          }
        });

        const result = await response.json();
        console.log('d',result);
        if(result){
            alert(`${product.productName} Deleted!`);
            isUpdate();
        }else{
            alert(`${product.productName} can Not be Deleted! It exists in user orders!`);
        }
    }

    
    return (
        <div className="product-card">
            <img src={`${product.imageUrl}`} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>${product.price}</p>
            <p>quantity: {product.quantity}</p>
            <p>description: {product.description}</p>
            <hr style={{ width: '100%', margin: '10px 0', borderTop: '1px solid #ddd' }} />

            <form className="updated_form" onSubmit={updateProduct}>
                <h5>Update Current Product</h5>
                <div className='form-group'>
                    <label>Product Name:</label>
                   
                    <input type="text" value={updatedProductName} onChange={(e) => setUpdatedProductName(e.target.value)} required/>
                    
                </div>
                
                <div className='form-group'>
                    <label>Product Price:</label>
                    <input type="number" step="0.01" value={updatedProductPrice} onChange={(e) => setUpdatedProductPrice(e.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label>Product Quantity:</label>
                    <input type="number" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label>Product Description:</label>
                    <input type="text" value={updatedDesc} onChange={(e) => setUpdatedDesc(e.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label>Product Image:</label>
                    <input type="text" value={updatedimageUrl} onChange={(e) => setUpdatedImageUrl(e.target.value)} required/>
                </div>
                <br />
                <button>Update Product Info</button>
                <button className='deleteBtn' onClick={deleteProduct}>Delete Product</button>
            </form>
        </div>
    );
}

export default UpdatedProductCard;