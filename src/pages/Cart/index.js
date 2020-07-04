/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../util/format';

export default function Cart() {
    const total = useSelector((state) =>
        formatPrice(
            state.cart.reduce((totalSUM, product) => {
                return totalSUM + product.price * product.amount;
            }, 0)
        )
    );

    const cart = useSelector((state) =>
        state.cart.map((product) => ({
            ...product,
            subtotal: formatPrice(product.price * product.amount),
        }))
    );

    const dispatch = useDispatch();
    function increment(product) {
        dispatch(
            CartActions.updateAmountRequest(product.id, product.amount + 1)
        );
    }
    function decrement(product) {
        dispatch(
            CartActions.updateAmountRequest(product.id, product.amount - 1)
        );
    }

    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <tr />
                        <th>PRODUTO</th>
                        <th>QUANTIDADE</th>
                        <th>SUBTOTAL</th>
                        <tr />
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product) => (
                        <tr>
                            <td>
                                <img src={product.image} alt="Tenis" />
                            </td>
                            <td>
                                <strong>{product.title} </strong>
                                <strong>{product.priceFormatted} </strong>
                            </td>
                            <td>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => decrement(product)}
                                    >
                                        <MdRemoveCircleOutline
                                            size={20}
                                            color="#7159c1"
                                        />{' '}
                                    </button>
                                    <input
                                        type="number"
                                        readOnly
                                        value={product.amount}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => increment(product)}
                                    >
                                        <MdAddCircleOutline
                                            size={20}
                                            color="#7159c1"
                                        />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>{product.subtotal} </strong>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            CartActions.removeFromCart(
                                                product.id
                                            )
                                        )
                                    }
                                >
                                    <MdDelete size={20} color="#7159c1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>
            <footer>
                <button type="button">FINALIZAR PEDIDO</button>
                <Total>
                    <span>TOTAL</span>
                    <strong> {total} </strong>
                </Total>
            </footer>
        </Container>
    );
}
