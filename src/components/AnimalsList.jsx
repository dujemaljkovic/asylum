import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row } from "react-bootstrap";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import EditAnimal from "./EditAnimal";

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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Age</th>
            <th>Adoption Status</th>
            <th>Image</th>
            <th>Description</th>
            <th>Chip status</th>
            <th>Last Viewed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.species}</td>
              <td>{item.age}</td>
              <td>{item.adopted ? "Adopted" : "Not Adopted"}</td>
              <td>{item.image}</td>
              <td>{item.description}</td>
              <td>{item.chip ? "Chipped" : "Not chipped"}</td>
              <td>{item.lastViewed}</td>
              <td>
                {isAdmin && (
                  <EditAnimal
                    animal={item}
                    onEdit={setEdit}
                    handleEdit={handleEdit}
                  />
                )}{" "}
                {isAdmin && (
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </Button>
                )}{" "}
                {!item.adopted && (
                  <Button
                    variant="success"
                    onClick={() => handleAdopt(item.id)}
                  >
                    Adopt
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AnimalsList;
