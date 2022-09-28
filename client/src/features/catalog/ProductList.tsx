import { Grid } from '@mui/material'
import { Product } from '../../app/models/Product'
import { useAppSelector } from '../../app/store/configureStore';
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton';

interface props {
  products : Product[]
  
}

export default function ProductList({products} : props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={4} key={product.id}>
            {!productsLoaded ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={product} />
            )}
          </Grid>
        ))}
      </Grid>
    </>

  )
}
