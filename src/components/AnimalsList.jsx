import React, { useEffect, useState } from "react";
import { Card, CardGroup, Button, Form, Row} from "react-bootstrap";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import EditAnimal from "./EditAnimal";
import "../App.css";

function AnimalsList() {
  const [animals, setAnimals] = useState([]);
  const [speciesFilter, setSpeciesFilter] = useState(null);
  const [adoptionFilter, setAdoptionFilter] = useState(null);
  const [edit, setEdit] = useState(null);

  const { isAdmin } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:3001/animals").then((response) => {
      setAnimals(response.data);
    });
  }, []);

  const filteredItems = animals.filter((animal) => {
    if (speciesFilter && adoptionFilter) {
      return (
        animal.species === speciesFilter && animal.adopted === adoptionFilter
      );
    } else if (speciesFilter) {
      return animal.species === speciesFilter && animal.adopted !== true;
    } else if (adoptionFilter !== null) {
      return animal.adopted === adoptionFilter;
    } else {
      return true;
    }
  });

  function handleDelete(id) {
    axios.delete(`http://localhost:3001/animals/${id}`).then(() => {
      setAnimals(animals.filter((animal) => animal.id !== id));
    });
  }

  function handleEdit(updatedAnimal) {
    const updatedAnimals = animals.map((animal) =>
      animal.id === updatedAnimal.id ? updatedAnimal : animal
    );
    setAnimals(updatedAnimals);
    setEdit(null);
  }

  const handleAdopt = (id) => {
    const updatedAnimals = animals.map((animal) =>
      animal.id === id ? { ...animal, adopted: true } : animal
    );
    setAnimals(updatedAnimals);
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group controlId="formFilterType">
            <Form.Label>
              <h4>Filter by Species:</h4>
            </Form.Label>
            <div>
              <Form.Check
                inline
                label="All"
                type="checkbox"
                value=""
                checked={speciesFilter === null}
                onChange={() => setSpeciesFilter(null)}
              />
              <Form.Check
                inline
                label="Dog"
                type="checkbox"
                value="dog"
                checked={speciesFilter === "dog"}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              />
              <Form.Check
                inline
                label="Cat"
                type="checkbox"
                value="cat"
                checked={speciesFilter === "cat"}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              />
              <Form.Check
                inline
                label="Bird"
                type="checkbox"
                value="bird"
                checked={speciesFilter === "bird"}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              />
              <Form.Check
                inline
                label="Hamster"
                type="checkbox"
                value="hamster"
                checked={speciesFilter === "hamster"}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formFilterAdoption">
            <Form.Label>
              <h4>Filter by Adoption Status:</h4>
            </Form.Label>
            <div>
              <Form.Check
                inline
                label="All"
                type="checkbox"
                value=""
                checked={adoptionFilter === null}
                onChange={() => setAdoptionFilter(null)}
              />
              <Form.Check
                inline
                label="Adopted"
                type="checkbox"
                value="true"
                checked={adoptionFilter === true}
                onChange={() => setAdoptionFilter(true)}
              />
              <Form.Check
                inline
                label="Not Adopted"
                type="checkbox"
                value="false"
                checked={adoptionFilter === false}
                onChange={() => setAdoptionFilter(false)}
              />
            </div>
          </Form.Group>
        </Row>
      </Form>
      <CardGroup className="card-container">
  {filteredItems.map((item) => (
    <Card key={item.id}>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          Species: {item.species} <br />
          Age: {item.age} <br />
          Description: {item.description} <br />
          Chip Status: {item.chip ? "Chipped" : "Not chipped"} <br />
          Last Viewed: {item.lastViewed} <br />
          Adoption Status: {item.adopted ? "Adopted" : "Not Adopted"} <br />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="success" disabled={item.adopted} onClick={() => handleAdopt(item.id)}>
          Adopt
        </Button>{" "}
        {isAdmin && (
          <EditAnimal
            animal={item}
            onEdit={setEdit}
            handleEdit={handleEdit}
            imageUrl={item.image}
          />
        )}
        {isAdmin && (
          <Button variant="danger" onClick={() => handleDelete(item.id)}>
            <FaTrash />
          </Button>
        )}
      </Card.Footer>
    </Card>
  ))}
</CardGroup>

    </>
  );
}

export default AnimalsList;
