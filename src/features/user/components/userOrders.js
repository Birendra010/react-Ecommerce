import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync , selectCount, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function UserOrders() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id))
  },[])


  return (
    <div>
      {orders.map((order) => 
        
        <h1 className="p-24 text-5xl">{ order.id}</h1>
      )}
     
    </div>
  );
}
