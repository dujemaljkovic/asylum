import React from "react";
import { Table, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { FaCheck,  FaTrash } from "react-icons/fa";

function DonationTable(props) {
  const { donations, onMarkAsDonated, onDelete, onRepeat } = props;

  const { isAdmin } = useContext(UserContext);

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
            <td>{donation.amount}€</td>
            <td>{donation.description}</td>
            <td>
              {isAdmin && donation.category === "looking_for" && (
                <>
                  <Button
                    variant="success"
                    onClick={() => onMarkAsDonated(donation.id)}
                  >
                    <FaCheck /> as Donated
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => onDelete(donation.id)}
                  >
                    <FaTrash />
                  </Button>
                </>
              )}
              {!isAdmin && donation.category !== "donated" && donation.category !== "offers" && (
                <Button
                  variant="success"
                  onClick={() => onMarkAsDonated(donation.id)}
                >
                  Donate
                </Button>
              )}
              {isAdmin && donation.category === "offers" && (
                <>
                  <Button
                    variant="success"
                    onClick={() => onMarkAsDonated(donation.id)}
                  >
                    Accept <FaCheck />
                  </Button>
                </>
              )}
              {isAdmin && donation.category === "donated" && (
                <>
                  <Button
                    variant="primary"
                    onClick={() => onRepeat(donation.id)}
                  >
                    Repeat
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(donation.id)}
                  >
                    <FaTrash />
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DonationTable;
