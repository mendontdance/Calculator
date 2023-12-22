import React, { FC } from 'react';
import Container from '../Container';
import { IProductsListProps } from './types';
import Product from '../Product';

const ProductsList: FC<IProductsListProps> = ({ products }) => {
  return products.length ? (
    <Container flexColumn>
      {products.map((elem) => (
        <Product name={elem.name} id={elem.id} price={elem.price} key={elem.id} />
      ))}
    </Container>
  ) : null;
};

export default ProductsList;
