import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import apiTransactions from "../services/apiTransactions";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function HomePage() {

  const [ transaction, setTransaction] = useState([]);
  const {user,name} = useContext(UserContext);
  useEffect(getList, []);

  function getList(){
    apiTransactions.homePage(user.token)
      .then(res => {
        setTransaction(res.data);
      })
      .catch(err => {
        alert(err.message);
      })
  }

  function handleLogout(){
    localStorage.removeItem("user");
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {!transaction[0] ? name : transaction[0].name}</h1>
        <Link to="/" onClick={handleLogout}><Logout><BiExit /></Logout></Link>
      </Header>

      <TransactionsContainer>
        <ul>
          {!transaction[0] ? <TextCenter>Não há registros de entrada ou saída</TextCenter> : transaction.map(t => (
          <ListItemContainer key={t._id}>
            <div>
              <span>{t.date}</span>
              <strong>{t.description}</strong>
            </div>
            <Value color={t.type === "input" ? "positivo" : "negativo"}>{t.value.toFixed(2).replace(".",",")}</Value>
          </ListItemContainer>

          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={transaction[0] && transaction[0].total > 0 ? "positivo" : "negativo"}>{transaction[0] ? transaction[0].total.toFixed(2).replace(".",",") : "0,00"}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <StyledLink to={"/nova-transacao/:input"}>
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </StyledLink>
        <StyledLink to={"/nova-transacao/:output"}>
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </StyledLink>
      </ButtonsContainer>

    </HomeContainer>
  )
}
const TextCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
  font-weight: 400;
  color: #868686;
  text-align: center;
`
const Logout = styled.div`
  font-weight: 700;
  font-size: 26px;
  display: flex;
`
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  ul {
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    height: calc(72vh - 50px);
    position: relative;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    padding: 0px;
    width: 50%;
    height: 115px;
    font-size: 26px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 22px;
    }
  }
`
const StyledLink = styled(Link)`

outline: none;
border: none;
border-radius: 5px;
background-color: #a328d6;
font-weight: 600;
color: #fff;
cursor: pointer;
padding: 12px;
width: 50%;
height: 115px;
font-size: 22px;
text-align: left;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "#03AC00" : "#C70000")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: #000000;
  margin-right: 10px;
  font-size: 16px;
  font-weight: 400;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`