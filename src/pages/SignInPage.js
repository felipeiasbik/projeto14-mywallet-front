import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useContext, useState } from "react";
import apiAuth from "../services/apiAuth";
import { UserContext } from "../contexts/UserContext";

export default function SignInPage() {

  const [form, setForm] = useState({email: "", password: ""})
  const {setUser,setName} = useContext(UserContext);
  const navigate = useNavigate();

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }
  
  function signIn(e){
  
    e.preventDefault();

    const body = {email: form.email, password: form.password};

    apiAuth.signIn(body)
      .then(res => {
        const {token,name} = res.data;
        setName(name)
        setUser({token})
        localStorage.setItem("user", JSON.stringify({token}));
        navigate("/home");
      })
      .catch(err => {
        console.log(err)
        alert(`Erro: ${err.response.data}`)
      })
  
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" name="email" value={form.email} onChange={handleForm} type="email" required/>
        <input placeholder="Senha" name="password" value={form.password} onChange={handleForm} type="password" autoComplete="new-password" required/>
        <button type="submit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button{
    margin-bottom: 20px;
  }
`
