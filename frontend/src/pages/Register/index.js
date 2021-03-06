import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zap, setZap] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault();
    
    const data = {
      name,
      email,
      zap,
      city,
      uf
    };

    try {
      const response =  await api.post('ongs', data)
    
      alert(`Seu Id de acesso: ${response.data.id}`)
      
      history.push('/')
    } catch (err) {
      alert('Erro no cadastro, tente novamente.')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas e encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da ONG" />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail"/>
          <input value={zap} onChange={e => setZap(e.target.value)} placeholder="WhatsApp" />
          
          <div className="input-group">
            <input value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" />
            <input value={uf} onChange={e => setUf(e.target.value)} placeholder="UF" style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}