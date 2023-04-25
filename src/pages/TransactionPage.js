import styled from "styled-components"
import apiTransactions from "../services/apiTransactions";
import { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";


export default function TransactionsPage() {

  const {tipo} = useParams();
  const [form, setForm] = useState({description: "", value: "", type: tipo})
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function postTransaction(e){

    e.preventDefault();

    const body = {description: form.description, value: Number(form.value.replace(",",".")), type: tipo.replace(":","")};

    apiTransactions.postTransaction(body, user.token)
      .then( res => {
        navigate("/home");
      })
      .catch( err => {
        console.log(err)
        alert(`Erro: ${err.response.data}`)
      })
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={postTransaction}>
        <input placeholder="Valor" name="value" value={form.value} onChange={handleForm} type="text" required/>
        <input placeholder="Descrição" name="description" value={form.description} onChange={handleForm} type="text" required/>
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
