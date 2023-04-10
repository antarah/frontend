import React, { useEffect,useState } from 'react'


const Subtotal = ({iteam}) => {
   
    const [price, setPrice] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [iteam]);

    const totalAmount = () => {
        let price = 0
        iteam.map((item) => {
            price += item.price.cost
        });
        setPrice(price)
    }

    return (
        <div className="sub_item">
            <h3>Subtotal ({iteam.length} items):<strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</strong></h3>
        </div>
    )
}

export default Subtotal; 



/*const Subtotal = () => {
  return (
    <div className="sub_item">
     <h3>Subtotal (1 items):<strong style={{ fontWeight: "700", color: "#111" }}> ₹.00</strong></h3>
    </div>
  )
};

export default Subtotal;*/