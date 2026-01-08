import React from 'react'
import { useParams } from 'react-router-dom';
import dataAkun from "../assets/data/dataAkun.json";

const Payment = () => {

    const {productId} = useParams(); //untuk mengambil props id path
    

    const akunTunggal = dataAkun.find(akun => akun.cardId === Number(productId));

  return (
    <h1>JAMAL {akunTunggal.cardId}</h1>
  )
}

export default Payment