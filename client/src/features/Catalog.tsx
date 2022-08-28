import React, { useEffect, useState } from 'react' 
import { Product } from '../app/models/Product'
import ProductList from './ProductList'

export default function Catalog() {

  const [products, setproducts] = useState<Product[]>([])

  useEffect(() => { //ทำงานทันที ตอนเริ่ม
    fetch("http://localhost:5000/api/Products")
    .then((response)=>response.json()) // then = เมื่อถูก
    .then((data)=>{setproducts(data)})
    .catch((error)=>console.log(error))

    // return () => { //ต้องออกก่อนถึงจะทำงาน
    //   second
    // }
  }, []) //ถ้าเป็นค่าเดิมจะไม่ทำงาน
  

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
