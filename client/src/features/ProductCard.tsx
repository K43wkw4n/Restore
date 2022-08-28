import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar, IconButton } from '@mui/material'
import { red } from '@mui/material/colors';
import React from 'react'
import { Product } from '../app/models/Product';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface props {
  product : Product
}

export default function ProductCard({product} : props) {
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

        <CardMedia
          component="img"
          height="100%"
          image={product.pictureUrl}
          sx={{backgroundSize:"contain",bgcolor:"B8F1B0"}}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {(product.price * 10).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
          <Button size="small">view</Button>
        </CardActions>
      </Card>
    </>
  );
}
