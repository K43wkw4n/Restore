import { Grid } from '@mui/material'
import React from 'react'
import { Product } from '../app/models/Product'
import ProductCard from './ProductCard'

interface props {
  products : Product[]
  
}

export default function ProductList({products} : props) {
  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.map((product:any) => {
          return (
            <Grid item sm={4} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          )
        })}
      </Grid>    
    </>
  )
}
