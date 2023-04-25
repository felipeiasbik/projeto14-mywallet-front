import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import apiAuth from "../services/apiAuth";

export default function SignUpPage() {

  const [form, setForm] = useState({name: "", email: "", password: "", password2: ""})
  const navigate = useNavigate();

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function signUp(e){

    e.preventDefault();

    if (form.password !== form.password2) return alert('As senhas não conferem!');

    const body = {name: form.name, email: form.email, password: form.password};

    apiAuth.signUp(body)
      .then( res => {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch( err => {
        alert(`Erro: ${err.response.data}`)
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" name="name" value={form.name} onChange={handleForm} type="text" required/>
        <input placeholder="E-mail" name="email" value={form.email} onChange={handleForm} type="email" required/>
        <input placeholder="Senha" name="password" value={form.password} onChange={handleForm} type="password" autoComplete="new-password" required/>
        <input placeholder="Confirme a senha" name="password2" value={form.password2} onChange={handleForm} type="password" autoComplete="new-password" required/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
