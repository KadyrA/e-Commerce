import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';

const FavoriteItem = ({ item, onRemoveFromFavorite}) => {
    const classes = useStyles();

    return (
        <Card>
           <CardMedia image={item.media.source} alt={item.name} className={classes.media} /> 
           <CardContent className={classes.cardContent}>
               <Typography variant="h5">{item.name}</Typography>
               <Typography variant="h6">{item.line_total.formatted_with_code}</Typography>
           </CardContent>
           <CardActions className={classes.cardActions}>             
                <Button variant="contained" type="button" color="secondary"onClick={() => onRemoveFromFavorite(item.id)}>Remove</Button>
           </CardActions>
        </Card>
    )
}

export default FavoriteItem
