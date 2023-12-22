import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import bem from 'bem-cn';
import Button from '../Button';
import InputText from '../InputText';
import { IProductProps } from './types';
import Text from '../Text';
import './styles.scss';
import { useStore } from '../../services/rootStoreContext';
import uuid from 'react-uuid';

const Product: FC<IProductProps> = ({ name, id, price }) => {
  const classBem = bem('product');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const { productsStore } = useStore();
  const { deleteProduct, updateProduct } = productsStore;

  const isValid = productPrice && productName && Number(productPrice);
  const priceValid = productPrice === '' || Number(productPrice);

  const onClickEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onClickDelete = () => {
    setIsEdit((prevState) => !prevState);
    deleteProduct(id);
  };

  const onClickSave = () => {
    if (isValid) {
      setIsEdit((prevState) => !prevState);
      updateProduct({ id: id, name: productName, price: productPrice });
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setProductPrice(e.target.value);
  };

  useEffect(() => {
    setProductName(name);
    setProductPrice(price);
  }, [name, price]);

  return (
    <div className={classBem()}>
      {!isEdit ? (
        <>
          <Text value={productName} />
          <Text value={`${Number(productPrice)} р.`} />
          <Button appearance="primary" value="Редактировать" onClick={onClickEdit} />
          <Button appearance="danger" value="Удалить" onClick={onClickDelete} />
        </>
      ) : (
        <>
          <InputText
            value={productName}
            placeholder={'Название товара'}
            onChange={onChangeName}
            textValid="Введите название товара"
            isValid={!!productName}
          />
          <InputText
            value={productPrice}
            placeholder={'Цена товара'}
            onChange={onChangePrice}
            isValid={!!priceValid}
            textValid="Введите числовое значение"
          />
          <Button appearance="primary" value="Сохранить" onClick={onClickSave} />
        </>
      )}
    </div>
  );
};

export default Product;
