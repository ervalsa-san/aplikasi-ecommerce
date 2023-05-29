import {router, usePage} from "@inertiajs/react";
import {useState} from "react";

export default function Product(props) {
    const page = usePage();
    const { product } = props;

    const [quantity, setQuantity] = useState(1);

    function onBuy() {
        console.log(quantity)
         router.post(route("transaction.buy"), {
            items: [
                {
                    product_id: product.id,
                    merchant_id: product.user_id,
                    quantity
                },
            ]
        })
    }

    return (
        <div>

            <input type="number" onChange={(v) => {
            console.log(v);
            setQuantity(v.target.value);}
            } defaultValue="1"/>
            <button onClick={onBuy}>
                beli
            </button>
        </div>
    )
}
