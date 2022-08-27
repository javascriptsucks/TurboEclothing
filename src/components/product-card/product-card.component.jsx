import './product.styles.scss';
import Button from '../button/button.component';
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const { addItemToCart, cartItems } = useContext(CartContext);

    const addProductToCart = () => {
        console.log(cartItems);
        // console.log(CartContext);
        return (addItemToCart(product))
    };

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{`$ ${price}`}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>ADD TO CART</Button>
        </div>
    )
}

export default ProductCard; 