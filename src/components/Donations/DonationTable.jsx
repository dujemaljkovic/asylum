import React from "react";
import { Table, Button } from "react-bootstrap";

function DonationTable(props) {
  const { donations, onMarkAsDonated, onDelete } = props;

  return (
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
        {donations.map((donation, index) => (
          <tr key={index}>
            <td>{donation.type}</td>
            <td>{donation.amount}</td>
            <td>{donation.description}</td>
            {donation.category === "looking_for" && (
              <td>
                {donation.category !== "donated" && (
                  <Button
                    variant="success"
                    onClick={() => onMarkAsDonated(donation.id)}
                  >
                    Mark as Donated
                  </Button>
                )}
                <Button variant="danger" onClick={() => onDelete(donation.id)}>
                  Delete
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DonationTable;
