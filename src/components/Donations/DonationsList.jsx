import { useEffect, useState } from "react";
import { Button, Modal, Form} from "react-bootstrap";
import axios from "axios";
import DonationTable from "../Donations/DonationTable";

function DonationsList() {
  const [donations, setDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDonation, setNewDonation] = useState({
    id: null,
    category: "",
    type: "",
    amount: "",
    description: "",
  });

  const load = async () => {
    try {
      const response = await axios.get("http://localhost:3001/donations");
      setDonations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    load()
  }, [newDonation]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (event) => {
    setNewDonation({
      ...newDonation,
      [event.target.name]: event.target.value,
    });
  };

  const changeCategory = async (id, category) => {
    try {
      const response = await axios.patch(`http://localhost:3001/donations/${id}`, { category });
      if (response.status === 200) {
        load(); // assuming there's a load function that reloads the donations list
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleMarkAsDonated = (donationId) => {
    changeCategory(donationId, "donated");
  };
  
  const handleOnRepeat = (donationId) => {
    changeCategory(donationId, "looking_for");
  };
  
  

  const handleDelete = (donationId) => {
    axios.delete(`http://localhost:3001/donations/${donationId}`).then(() => {
      const updatedDonations = donations.filter(
        (donation) => donation.id !== donationId
      );
      setDonations(updatedDonations);
    });
  };

  

  const donationsByCategory = (category) =>
    donations.filter((donation) => donation.category === category);


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/donations", newDonation).then(() => {
      setDonations([...donations, newDonation]);
      setNewDonation({
        category: "",
        type: "",
        amount: "",
        description: "",
      });
      handleCloseModal();
    });
  };

  return (
    <>
      <h2>Donations</h2>
      <Button variant="primary" onClick={handleShowModal}>
        Add Donation
      </Button>
      <h2>Looking for</h2>
      <DonationTable
        category="looking_for"
        donations={donationsByCategory("looking_for")}
        onMarkAsDonated={handleMarkAsDonated}
        onDelete={handleDelete}
      />
      <h2>Offers</h2>
      <DonationTable
        category="offers"
        donations={donationsByCategory("offers")}
        onMarkAsDonated={handleMarkAsDonated}
        onDelete={handleDelete}
      />
      <h2>Donated</h2>
      <DonationTable
        category="donated"
        donations={donationsByCategory("donated")}
        onMarkAsDonated={handleMarkAsDonated}
        onDelete={handleDelete}
        onRepeat={handleOnRepeat}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newDonation.category}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                <option value="looking_for">Looking For</option>
                <option value="offers">Offers</option>
                <option value="donated">Donated</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={newDonation.type}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                name="amount"
                value={newDonation.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newDonation.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DonationsList;
