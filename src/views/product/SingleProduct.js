// material-ui
import { Typography } from '@mui/material';
import {Single_Product,Update_Product} from '../../global'
import { useParams } from 'react-router';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    let params = useParams();
const [product,setProduct]=useState({})
useEffect((res)=>{
    Single_Product(params.id)
    .then((res)=>{
        console.log("Single Product Display :" +JSON.stringify(res.data))
        setProduct(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
})
console.log(product)
return(
  <MainCard title="Sample Card">
    <Typography variant="body2">
     Product Code:{product.product_code}
     Product Name:{product.product_name}
    </Typography>
  </MainCard>
)};

export default SamplePage;
