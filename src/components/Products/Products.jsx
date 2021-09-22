import React, { useState, useCallback} from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';


const Products = ({products, onAddToCart})=> {
    const classes = useStyles();


    const [productList, setProductList]  = useState(products);
    const [searchedValue, setSearchedValue] = useState('');

    console.log('products',products)
    const onSearchValueChanged = useCallback((text) => {
            const inputValue = text.target.value;
            setSearchedValue(inputValue);

            
            if(inputValue.length === 0){
                setProductList(products);
            } else {
                let newProducts = []
            for(let product of products){
                // fifa.includes('fifa') / true
                if(product.name.toLowerCase().includes(inputValue.toLowerCase())){
                    newProducts.push(product)
                }
            }
            setProductList(newProducts);
            }
            
    },[products])


    return(
        <main className={classes.content}>
             
            <div className={classes.toolbar}/>
                    <div className={classes.searchDiv}> 
                       <input className={classes.search} type="text" placeholder="Search..." onChange={onSearchValueChanged} value={searchedValue}/>
                   </div>
            <Grid container justifyContent="center" spacing={4}>
                {productList.map((product) =>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
    
}

export default Products;