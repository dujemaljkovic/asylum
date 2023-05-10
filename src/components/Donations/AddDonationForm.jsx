import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const AddDonationForm = ({show, onHide, onSubmit}) => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/donations", {
      category,
      type,
      amount,
      description,
    }).then((response) => {
      onSubmit(response.data); // pass the new donation to the parent component
      onHide(); // close the modal
    });
    setCategory("");
    setType("");
    setAmount("");
    setDescription("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="requested">Requested</option>
          <option value="offered">Offered</option>
          <option value="donated">Donated</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter donation type"
          value={type}
          onChange={(event) => setType(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter donation amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter donation description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddDonationForm;
