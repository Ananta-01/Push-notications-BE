var walletBalance = 100;

function createOrder() {
    const orderData = {
        orderId: "ORD1001",
        userId: "USR123",
        items: [
            { productId: "P001", quantity: 2, price: 10.99 },
            { productId: "P002", quantity: 1, price: 5.49 }
        ],
        total: 27.47,
        status: "pending",
        createdAt: "2025-06-03T10:00:00Z"
    };
    console.log("Order Created");
    return orderData; 
}
function proccedToPay(orderData){
   let PayOrderData = orderData;
  if(PayOrderData.orderId){
     console.log("Procced to Pay !")
  }
 return PayOrderData;
}


function showOrderSummary(OrderSummary){
 OrderSummary.items.forEach(item => {
        console.log(`Product: ${item.productId}, Quantity: ${item.quantity}, Price: $${item.price}`);
    });
    return  OrderSummary.total
}

function updateWallet(total){
     if (walletBalance < total) {
        console.log("Transaction failed: Insufficient wallet balance.")
    } else {
        const updatedWallet = walletBalance - total;
        console.log("\nTransaction completed. Updated Wallet Balance: $" + updatedWallet.toFixed(2));
        return updatedWallet;
    }
}

const handlePromise = new Promise(function(resolve, reject) {
    const order = createOrder();
    if (order) {
        resolve(order);  
    } else {
        reject(new Error("Failed to create order"));
    }
});

handlePromise
    .then((orderData) => {
        // console.log("Order Created:", orderData);
        return orderData;
    })
    .catch((error) => {
         console.log("\n❌ Error:", error.message);
    })
    .then((orderId)=>{
       return proccedToPay(orderId)
    })
    .then((OrderSummary)=>{
       return showOrderSummary(OrderSummary)
    })
    .then((TotalPrice)=> {
        return updateWallet(TotalPrice)
    })
