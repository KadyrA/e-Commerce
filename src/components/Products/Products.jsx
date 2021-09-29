import React, { useState, useCallback } from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
// import Favorite from './Favorite/Favorite';
import useStyles from './styles';


const Products = ({ products, onAddToCart,onAddToFavorite, categories }) => {
    const classes = useStyles();
    const categoryData = [{ id: 'all', name: 'All' }, ...categories]

    const [productList, setProductList] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchedValue, setSearchedValue] = useState('');

    console.log('products', products)
    
    const onSearchValueChanged = useCallback((text) => {
        const inputValue = text.target.value;
        setSearchedValue(inputValue);


        if (inputValue.length === 0) {
            setProductList(products);
        } else {
            let newProducts = []
            for (let product of products) {
                // fifa.includes('fifa') / true
                if (product.name.toLowerCase().includes(inputValue.toLowerCase())) {
                    newProducts.push(product)
                }
            }
            setProductList(newProducts);
        }

    }, [products])

    const onCategorySelection = useCallback((categoryItem) => {
        setSelectedCategory(categoryItem)
        if (categoryItem.name === 'All') {
            setProductList(products);
        } else {
            const newProductList = [];
            for (let product of products) {
                for (let categoryOfProduct of product.categories) {
                    if (categoryOfProduct.name.toLowerCase() === categoryItem.name.toLowerCase()) {
                        newProductList.push(product);
                    }
                }
            }
            setProductList(newProductList)
        }
    }, [products, categories])

    return (
        <main className={classes.content}>

            <div className={classes.toolbar} />
            <div className={classes.searchDiv}>
                <input className={classes.search} type="text" placeholder="Search..." onChange={onSearchValueChanged} value={searchedValue} />
            </div>
            <div className={classes.categories}>
                <div className={{ flexDirection: 'row' }}>
                    {categoryData && categoryData.map((item, index) => {
                        console.log('item', item)
                        return (
                            <button className={classes.categoryButtons} onClick={() => onCategorySelection(item)} key={index} >{item.name}</button>
                        )
                    })}
                </div>
            </div>
            <Grid container justifyContent="center" spacing={4}>
                {productList.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <Product product={product} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );

}

export default Products;