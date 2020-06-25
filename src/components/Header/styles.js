import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0;
    > a figure img {
        width: 100%;
        max-width: 275px;
    }
`;
export const Cart = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #fff;
        }

        span {
            font-size: 12px;
            color: #998;
        }
    }
`;
