import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar, IconButton } from '@mui/material'
import { red } from '@mui/material/colors';
import { Product } from '../../app/models/Product';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {LoadingButton} from '@mui/lab'
import agent from '../../app/api/agent'; 
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, setBasket } from '../basket/basketSlice';

interface props {
  product : Product
}

export default function ProductCard({product} : props) {
  const { status } = useAppSelector((state) => state.basket);
  const [Loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // function handleAddItem(productId : number){
  //   setLoading(true);
  //   agent.Basket.addItem(productId)
  //   .then((basket)=>dispatch(setBasket(basket)))
  //   .catch((error)=> console.log(error))
  //   .finally(()=>setLoading(false))
  // }

  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.name.at(0)?.toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.pictureUrl}
        subheader={product.name}
      />  
        <Link to={`/catalog/${product.id}`}>
          <CardMedia
            component="img"
            height="100%"
            image={product.pictureUrl}
            sx={{backgroundSize:"contain",bgcolor:"B8F1B0"}}
            alt="green iguana"
          />
        </Link>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {(product.price * 0.01).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton size="small" loading={status.includes("pendingAddItem" + product.id)} onClick={()=>dispatch(addBasketItemAsync({ productId: product.id }))}> 
            Add To Cart
          </LoadingButton> 
          <Button size="small" component={Link} to={`/catalog/${product.id}`}>view</Button>
        </CardActions>
      </Card>
    </>
  );
}
