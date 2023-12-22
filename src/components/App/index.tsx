import React, { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import uuid from 'react-uuid';
import bem from 'bem-cn';
import { useStore } from '../../services/rootStoreContext';
import Container from '../Container';
import ProductsList from '../ProductsList';
import InputText from '../InputText';
import Button from '../Button';
import Text from '../Text';
import { EButtonAppearance } from '../Button/types';
import './styles.scss';

const App = observer(() => {
  const classBem = bem('products-container');
  const { productsStore } = useStore();
  const { data, addProduct, deleteProducts } = productsStore;
  const products = Array.from(data.values());

  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const totalPrice = `Общая сумма: ${productsStore.totalPrice.toFixed(2)} р.`;
  const [isPriceValid, setIsPriceValid] = useState<boolean | undefined>(true);

  const checkPrice = (value: string) => {
    if (Number(value)) {
      const numberValue = Number(value);
      return numberValue.toFixed(2) >= value;
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setProductPrice(e.target.value);
  };

  const onClickAdd = () => {
    const isValid = productPrice && productName && Number(productPrice);
    if (isValid && isPriceValid) {
      addProduct({ id: uuid(), name: productName, price: productPrice });
      setProductName('');
      setProductPrice('');
    }
  };

  const onClickDelete = () => {
    deleteProducts();
  };

  useEffect(() => {
    setIsPriceValid((Number(productPrice) && productPrice === '') || checkPrice(productPrice));
  }, [onClickAdd]);

  return (
    <section className={classBem()}>
      <Container>
        <InputText placeholder="Название товара" value={productName} onChange={onChangeName} />
        <InputText
          placeholder={'Цена товара'}
          value={productPrice}
          onChange={onChangePrice}
          isValid={isPriceValid || productPrice === ''}
          textValid="Введите корректное число"
        />
        <Button appearance={EButtonAppearance.primary} value="Добавить" onClick={onClickAdd} />
      </Container>
      <ProductsList products={products} />
      <Container>
        <Text value={totalPrice} weight="bold" />
        <Button appearance={EButtonAppearance.danger} value="Очистить список" onClick={onClickDelete} />
      </Container>
    </section>
  );
});

export default App;
