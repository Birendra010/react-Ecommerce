

// add item in cart  user login required 
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}


// get all items in cart by login user
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user" + userId);
    const data = await response.json();
    resolve({ data });
  });
}
// handle remove item to cart 
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/"+itemId, {
      method: "DELETE",
      
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data:{id:itemId} });
  });
}
// update item in cart
export function updateItem(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}


// after order-succes reset the cart
export function resetCart(userId) {

  // get all items of user's cart and then delete each 
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId)
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id)
    }
    resolve({ status:"success"});
  });
}