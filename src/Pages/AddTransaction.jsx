import { Button, Container, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../Contexts/TransactionContext.js"
import { ThemeContext } from "../Contexts/ThemeContext";

export default function AddTransaction() {
  const [ price, setPrice ] = useState(0);

  const setTransaction = useContext(TransactionContext).setTransaction;
  const transaction = useContext(TransactionContext).transaction;

  const navigate = useNavigate();
  
  const theme = useContext(ThemeContext).theme;
  const className = "button-" + theme;

  return (
    <Container>
      <h1 className="my-3">Add a transaction</h1>
      <Form
        onSubmit = {(event) => {
          event.preventDefault();
          setTransaction([
            ...transaction, 
            { id:Date.now(), price },
          ]);
          navigate("/home");
        }}
      >
        <Form.Group className = "mb-3" controlId= "price">
          <Form.Label>Transaction Amount</Form.Label>
          <Form.Control
            value = {price}
            onChange = {(e) => setPrice(e.target.value)}
            type = "number"
            placeholder = "0.00"
            required
          />
        </Form.Group>

        <Button className = {className} type = "submit">
          Submit
        </Button>
      </Form>
    
    </Container>
  );
}