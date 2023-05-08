import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

function EditAnimal({ animal, onEdit, handleEdit }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(animal.name);
  const [species, setSpecies] = useState(animal.species);
  const [age, setAge] = useState("");
  const [adopted, setAdopted] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [chip, setChip] = useState(false);
  const [lastViewed, setLastViewed] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:3001/animals/${animal.id}`, {
      name,
      species,
      age,
      adopted,
      description,
      image,
      chip,
      lastViewed,
    })
    .then(response => {
      const updatedAnimal = response.data;
      handleEdit(updatedAnimal);
      onEdit(null);
      handleClose()
    })
    .catch(error => {
      console.log(error);
    });
  }
  

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        <FaEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Animal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAnimalSpecies">
              <Form.Label>Species</Form.Label>
              <Form.Control
                as="select"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              >
                <option value="">Select species</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="bird">Bird</option>
                <option value="hamster">Hamster</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAdopted">
              <Form.Check
                type="checkbox"
                label="Adoption status"
                checked={adopted}
                onChange={(e) => setAdopted(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formChip">
              <Form.Check
                type="checkbox"
                label="Chip"
                checked={chip}
                onChange={(e) => setChip(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLastViewed">
              <Form.Label>Last Viewed</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter last viewed date"
                value={lastViewed}
                onChange={(e) => setLastViewed(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAnimal;
