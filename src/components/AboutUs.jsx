import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const AboutUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to server using Axios or another library
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>General Information</h2>
          <p>
            Animal Asylum is a non-profit organization dedicated to rescuing and
            caring for abandoned animals. Our mission is to provide a safe and
            loving environment for animals until they can be adopted into their
            forever homes. At Animal Asylum, we believe that every animal
            deserves a chance at a happy and healthy life. Our team of dedicated
            staff and volunteers work tirelessly to provide top-quality care for
            all of the animals in our facility, including feeding, grooming, and
            providing medical attention when needed. In addition to providing
            care for animals, we also prioritize education and outreach in our
            community. We strive to raise awareness about the importance of
            responsible pet ownership, spaying and neutering, and the benefits
            of adopting pets from animal shelters. Our facility is open to the
            public for visits and adoptions, and we welcome anyone who is
            interested in meeting our furry friends. We also offer volunteer
            opportunities for those who want to help out and make a difference
            in the lives of animals. Animal Asylum is a place of hope and
            compassion, and we are committed to making a positive impact in the
            lives of animals and people in our community.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <h3>Contact Us</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Button type="submit">Send</Button>
          </Form>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Location</Card.Header>
            <Card.Body>
              <iframe
                title="Google Map"
                width="100%"
                height="300"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCD3dwUxFPuHvABT7obDii7zu0RcNdmCA&q=Sklonište udruge Noina Arka - Ulica grada Vukovara 70, 10000`}
              ></iframe>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
