import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  
  increment,
  
  incrementAsync,
  
  selectCount,
} from '../userSlice';

export default function Profile() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
 
  return (
    <div>
      <div>
       
      
       
     
     
      </div>
    </div>
  );
}
