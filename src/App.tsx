import React, { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import uuid from 'react-uuid';
import bem from 'bem-cn';
import { useStore } from './services/rootStoreContext';
import Container from './components/Container';
import ProductsList from './components/ProductsList';
import InputText from './components/InputText';
import Button from './components/Button';
import Text from './components/Text';
import './styles.scss';

const App = observer(() => {
  const classBem = bem('products-container');
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');

  const { productsStore } = useStore();
  const { data, addProduct, deleteProducts } = productsStore;
  const products = Array.from(data.values());

  const isValid = productPrice && productName && Number(productPrice);
  const priceValid = productPrice === '' || Number(productPrice);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setProductPrice(e.target.value);
  };

  const onClickAdd = () => {
    if (isValid) {
      addProduct({ id: uuid(), name: productName, price: productPrice });
      setProductName('');
      setProductPrice('');
    }
  };

  const onClickDelete = () => {
    deleteProducts();
  };

  return (
    <section className={classBem()}>
      <Container>
        <InputText
          placeholder={'Название товара'}
          value={productName}
          onChange={onChangeName}
          textValid="Введите название товара"
          isValid={!!productName}
        />
        <InputText
          placeholder={'Цена товара'}
          value={productPrice}
          onChange={onChangePrice}
          isValid={!!priceValid}
          textValid="Введите числовое значение"
        />
        <Button appearance="primary" value="Добавить" onClick={onClickAdd} />
      </Container>
      <ProductsList products={products} />
      <Container>
        <Text value={`Общая сумма: ${productsStore.totalPrice} р.`} weight="bold" />
        <Button appearance="primary" value="Очистить список" onClick={onClickDelete} />
      </Container>
    </section>
  );
});

export default App;
