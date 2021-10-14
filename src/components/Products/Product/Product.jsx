import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart, FavoriteBorder, Favorite } from '@material-ui/icons'

import useStyles from './styles';

const Product = ({ product, onAddToCart, onAddToFavorite, likeActionState, onRemoveFromFavorite }) => {
    const classes = useStyles();
    const isLiked = likeActionState && likeActionState.likedProducts && likeActionState.likedProducts.hasOwnProperty(product.id);

    console.log("product", product)

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h6" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6">
                        {product.price.formatted_with_code}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
                {product.inventory.available <= 5 ? (
                <Typography className={classes.stock}>Last {product.inventory.available} Item(s) </Typography>) : null}
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Favorite" onClick={() => isLiked ? onRemoveFromFavorite(product.id) : onAddToFavorite(product.id)}>
                    {isLiked ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
