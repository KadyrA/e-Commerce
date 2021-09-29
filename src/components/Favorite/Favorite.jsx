import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';

import useStyles from './styles'
import FavoriteItem from './FavoriteItem/FavoriteItem';

const Favorite = ({ favorite, handleAddToFavorite, handleEmptyFavorite, handleRemoveFromFavorite  }) => {

    const classes = useStyles();

    const EmptyFavorite = () => (
        <Typography variant="subtitle1">You have no items in your favorites.
            <Link to="/" className={classes.Link}>Start adding some!</Link>
        </Typography>
    )

    const FilledFavorite = ()=> (
        <>
            <Grid container spacing={3}>
                {favorite.line_items.map((item)=>(
                    <Grid item xs={12} sm={6} md={4} lg={3}  key={item.id}>
                        <FavoriteItem item={item} onRemoveFromFavorite={handleRemoveFromFavorite}  />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4">Subtotal: {favorite.subtotal.formatted_with_code}</Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyFavorite}>Empty Favorites</Button>
                    </div>
            </div>
        </>
    )

    if (!favorite.line_items) return 'Loading...';

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h4" gutterBottom>Your Favorites</Typography>
            { !favorite.line_items.length ? < EmptyFavorite /> : <FilledFavorite /> }
        </Container>
    )
}

export default Favorite
