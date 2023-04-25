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
          {transaction.map(t => (
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
        <button>
          <AiOutlinePlusCircle />
          <Link to={"/nova-transacao/:input"}><p>Nova <br /> entrada</p></Link>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <Link to={"/nova-transacao/:output"}><p>Nova <br />saída</p></Link>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const Logout = styled.div`
  font-weight: 700;
  font-size: 26px;
  display: flex;
  margin-bottom: 15px;
  margin-top: -15px;
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
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`