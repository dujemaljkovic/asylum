import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const Requests = () => {
  const [donations, setDonations] = useState([]);
  const [newDonationSubmitted, setNewDonationSubmitted] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, [newDonationSubmitted]);

  const fetchDonations = async () => {
    const response = await axios.get('http://localhost:3001/donations');
    setDonations(response.data.requests);
  };

  const handleMarkAsDonated = async (donationId) => {
    const donationToMove = donations.find((donation) => donation.id === donationId);
    await axios.put(`http://localhost:3001/donations/${donationId}`, { ...donationToMove, category: 'donated' });
    setNewDonationSubmitted(true);
  };

  const handleDelete = async (donationId) => {
    await axios.delete(`http://localhost:3001/donations/${donationId}`);
    setNewDonationSubmitted(true);
  };

  return (
    <div>
      <h2>Requests</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {donations &&
            donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.type}</td>
                <td>{donation.amount}</td>
                <td>{donation.description}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleMarkAsDonated(donation.id)}
                  >
                    Mark as Donated
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(donation.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Requests;
