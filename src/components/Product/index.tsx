import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import bem from 'bem-cn';
import { useStore } from '../../services/rootStoreContext';
import Button from '../Button';
import InputText from '../InputText';
import Text from '../Text';
import { EButtonAppearance } from '../Button/types';
import { IProductProps } from './types';
import './styles.scss';

const Product: FC<IProductProps> = ({ name, id, price }) => {
  const classBem = bem('product');
  const { productsStore } = useStore();
  const { deleteProduct, updateProduct } = productsStore;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const isValid = productPrice && productName && Number(productPrice);
  const [isPriceValid, setIsPriceValid] = useState<boolean | undefined>(true);

  const checkPrice = (value: string) => {
    if (Number(value)) {
      const numberValue = Number(value);
      return numberValue.toFixed(2) >= value;
    }
  };

  const onClickEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onClickDelete = () => {
    setIsEdit((prevState) => !prevState);
    deleteProduct(id);
  };

  const onClickSave = () => {
    if (isValid && isPriceValid) {
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
  }, []);

  useEffect(() => {
    setIsPriceValid((!!Number(productPrice) || productPrice === '') && checkPrice(productPrice));
  }, [onChangePrice]);

  return (
    <div className={classBem()}>
      {!isEdit ? (
        <>
          <Text value={productName} />
          <Text value={`${Number(productPrice)} р.`} />
          <Button appearance={EButtonAppearance.primary} value="Редактировать" onClick={onClickEdit} />
          <Button appearance={EButtonAppearance.danger} value="Удалить" onClick={onClickDelete} />
        </>
      ) : (
        <>
          <InputText value={productName} placeholder={'Название товара'} onChange={onChangeName} />
          <InputText
            value={productPrice}
            placeholder={'Цена товара'}
            onChange={onChangePrice}
            isValid={isPriceValid}
            textValid="Введите числовое значение"
          />
          <Button appearance={EButtonAppearance.primary} value="Сохранить" onClick={onClickSave} />
        </>
      )}
    </div>
  );
};

export default Product;
