import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useState } from "react";

export default function SignUpPage() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [password2,setPassword2] = useState("");
  const navigate = useNavigate();

  function signUp(e){

    e.preventDefault();

    if (password !== password2) return alert('As senhas não conferem!');

    const body = {name, email, password};

    axios.post("/cadastro" , body)
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
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} type="text" required/>
        <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} type="email" required/>
        <input placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} type="password" autocomplete="new-password" required/>
        <input placeholder="Confirme a senha" value={password2} onChange={e => setPassword2(e.target.value)} type="password" autocomplete="new-password" required/>
        <button>Cadastrar</button>
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
