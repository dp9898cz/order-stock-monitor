import React from "react";

interface OrderModalProps {
    id: string;
    order: Order | null;
}

const OrderModal = ({ id, order }: OrderModalProps) => {
    if (order === null) return null;
    return (
        <dialog id={id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default OrderModal;
