import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Form,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Notifications() {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: "",
    text: "",
    important: false,
  });

  const { isAdmin } = useContext(UserContext);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  useEffect(() => {
    axios.get("http://localhost:3001/announcements").then((response) => {
      setNotifications(response.data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNotification((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImportantChange = (event) => {
    const { checked } = event.target;
    setNewNotification((prevState) => ({
      ...prevState,
      important: checked,
    }));
  };

  const handleAddNotification = (event) => {
    event.preventDefault();
    const currentDate = formattedDate;
    const notificationToAdd = { ...newNotification, addedAt: currentDate };
    axios
      .post("http://localhost:3001/announcements", notificationToAdd)
      .then((response) => {
        setNotifications((prevState) => [response.data, ...prevState]);
        setNewNotification({ title: "", text: "", important: false });
        setShowModal(false);
      });
  };

  const handleDeleteNotification = (id) => {
    axios.delete(`http://localhost:3001/announcements/${id}`).then(() => {
      setNotifications((prevState) =>
        prevState.filter((notification) => notification.id !== id)
      );
    });
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => b.addedAt - a.addedAt
  );

  return (
    <Container>
      <Button onClick={() => setShowModal(true)}>Add Notification</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddNotification}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newNotification.title}
                onChange={handleInputChange}
                maxLength={40}
                required
              />
            </Form.Group>
            <Form.Group controlId="formText">
              <Form.Label>Text:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="text"
                value={newNotification.text}
                onChange={handleInputChange}
                minLength={10}
                maxLength={250}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImportant">
             {isAdmin && <Form.Check
                type="checkbox"
                name="important"
                checked={newNotification.important}
                onChange={handleImportantChange}
                label="Important"
              />}
            </Form.Group>
            <Button type="submit">Add Notification</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ListGroup>
        {sortedNotifications.map((notification) => (
          <Card
            key={notification.id}
            border={notification.important ? "danger" : "success"}
            style={{ marginTop: "20px" }}
          >
            <Card.Body>
              <Card.Header>
                <Card.Title>{notification.title}</Card.Title>
              </Card.Header>
              <Card.Text>{notification.text}</Card.Text>
              <Card.Footer className="text-muted">
                Added at: {notification.addedAt}
                {isAdmin && (
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <FaTrash />
                  </Button>
                )}
             
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Notifications;
