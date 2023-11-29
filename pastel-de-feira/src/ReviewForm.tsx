import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Review } from './types';
import './ReviewForm.css';

interface ReviewFormProps {
  onSubmit: () => void;
  review?: Review; // Optional for update
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, review }) => {
  const [title, setTitle] = useState(review?.title || '');
  const [description, setDescription] = useState(review?.description || '');
  const [author, setAuthor] = useState(review?.author || '');
  const [product, setProduct] = useState(review?.product || '');

  useEffect(()=>{
    if (review){
      setTitle(review.title || '');
      setDescription(review.description || '');
      setAuthor(review.author || '');
      setProduct(review.product || '');
    }
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validação dos campos
    if (!title || !description || !author || !product) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    const data = { title, description, author, product };
  
    try {
      if (review) {
        await axios.put(`http://localhost:8000/update?title=${title}}`, data);
      } else {
        await axios.post(`http://localhost:8000/create/`, data);
      }
  
      // Limpar os campos após o envio bem-sucedido
      setTitle('');
      setDescription('');
      setAuthor('');
      setProduct('');
  
      onSubmit(); // Talvez você queira chamar isso após a conclusão da requisição
    } catch (error) {
      // Lidar com erros da requisição
      console.error('Ocorreu um erro:', error);
      // Trate o erro adequadamente, como exibir uma mensagem para o usuário
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo da avaliação" />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição da avaliação" />
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor da avaliação" />
      <input type="text" value={product} onChange={e => setProduct(e.target.value)} placeholder="Produto" />
      <button type="submit">{review ? 'Atualizar' : 'Criar'}</button>
    </form>
  );
};

export default ReviewForm;