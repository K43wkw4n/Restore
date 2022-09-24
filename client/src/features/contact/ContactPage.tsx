import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { incremented,decremented } from './counterSlice';

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const {num} = useAppSelector((state)=>state.counter);

  return (
    <>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={()=>dispatch(decremented(1))}>-</Button>
        <Button>{num}</Button>
        <Button onClick={()=>dispatch(incremented(1))}>+</Button>
      </ButtonGroup>
    </>
  )
}
