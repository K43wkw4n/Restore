import axios from 'axios'
import { Console } from 'console'
import React, { useEffect, useState } from 'react' 
import agent from '../../app/api/agent'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { Product } from '../../app/models/Product'
import ProductList from './ProductList'

export default function Catalog() {

  const [products, setproducts] = useState<Product[]>([])

  const [loading, setLoading] = useState(true);

  useEffect(() => { //ทำงานทันที ตอนเริ่ม
    agent.Catalog.list()
    .then((response : any)=>setproducts(response))
    .catch((error)=>console.log(error))
    .finally(()=>setLoading(false))

    // return () => { //ต้องออกก่อนถึงจะทำงาน
    //   second
    // }
  }, []) //ถ้าเป็นค่าเดิมจะไม่ทำงาน

  if (loading) return <LoadingComponent message="Loading Products....." />;

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
