import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
  const initialValues = {
    name: '',
    description: '',
    color: '',
  };

  const { clearForm, handlerChange, values } = useForm(initialValues);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://susanaflix.herokuapp.com/categorias';
    fetch(URL)
      .then(async (res) => {
        const result = await res.json();
        setCategories([
          ...result,
        ]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.name}
      </h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        setCategories([
          ...categories,
          values,
        ]);
        clearForm();
      }}
      >

        <FormField
          label="Nome da Categoria:"
          type="text"
          name="name"
          value={values.name}
          onChange={handlerChange}
        />

        <FormField
          label="Descrição:"
          type="textarea"
          name="description"
          value={values.description}
          onChange={handlerChange}
        />

        <FormField
          label="Cor:"
          type="color"
          name="color"
          value={values.color}
          onChange={handlerChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categories.length === 0 && (
        <div>
          Loading...
        </div>
      )}
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            {category.name}
          </li>
        ))}
      </ul>
      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
