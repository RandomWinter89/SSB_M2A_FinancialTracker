import { Badge, Card, Col, Row, Container } from "react-bootstrap";
import { TransactionContext } from "../Contexts/TransactionContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useContext } from "react";


export default function Home() {
  const transactionContext = useContext(TransactionContext);

  function SumTransaction(){
    let amount = 0;
    
    transactionContext.transaction.map((data) => {
        amount += parseInt(data.price, 10);
    });

    return amount;
  }
  
  return (
    <Container>
      <h1 className="my-2">Budget Tracker</h1>
      <h2 className="my-2">Transaction Amount: {SumTransaction()}</h2>
      <Row>
        <CardGroup transactionContext = {transactionContext} />
      </Row>
    </Container>
  );
}

function CardGroup ({ transactionContext }) {
  const theme = useContext(ThemeContext).theme;
  const className = "button-" + theme;
  const className02 = "panel-" + theme;
  
  const transaction = transactionContext.transaction;
  const setTransaction = transactionContext.setTransaction;
  
  function Remove(index) {
    transaction.splice(index, 1);
    setTransaction([...transaction]);
  }
  
  return transaction.map((data, index) => {
    const bg = data.price > 0 ? "success" : "danger";
    
    return (
      <Col md = {4} key = {data.id}>
        <Card className = {className02}>
          <Card.Body>
            <Card.Title>{data.price}</Card.Title>
            <Card.Text>{data.price > 0 && "You earn a Profit"}</Card.Text>
            <Card.Text>{data.price <= 0 && "You loss a Profit"}</Card.Text>
            <Badge bg = {bg}>{data.price <= 0 && "Not"} Profit </Badge>
            <button className = {className} onClick = {() => Remove(index)}>Remove</button>
          </Card.Body>
        </Card>
      </Col>
    );
  });
}