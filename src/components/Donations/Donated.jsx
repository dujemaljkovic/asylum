import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";

const Donated = ({ donations, setDonations, setDonationToRepeat }) => {
  const [donated, setDonated] = useState([]);
  const [updatedDonation, setUpdatedDonation] = useState(null);
  const [donationIds, setDonationIds] = useState([]);

  const { isAdmin } = useContext(UserContext);

  const fetchDonated = async () => {
    const response = await axios.get(
      "http://localhost:3001/donations?category=donated"
    );
    setDonated(response.data);
  };

  useEffect(() => {
    fetchDonated();
  }, [donations]);


  const markAsDonated = async (donation) => {
    console.log("repeat")
    const updatedDonation = await axios.put(
      `http://localhost:3001/donations/${donation.id}`,
      {
        ...donation,
        category: "requested",
      }
    );
    setUpdatedDonation(updatedDonation.data);
    setDonations([...donations, updatedDonation.data], console.log("setdonatons"));
    setDonated(donated.filter((d) => d.id !== donation.id), console.log("setdonated"));
    setDonationToRepeat(donation);
  };
  

  
  

  const deleteRequest = async (donation) => {
    await axios.delete(`http://localhost:3001/donations/${donation.id}`);
    setDonations(donations.filter((d) => d.id !== donation.id));
    setDonated(donated.filter((d) => d.id !== donation.id));
  };
  


  return (
    <>
      <h1>Donated</h1>
      {updatedDonation && (
        <p>{`Donation ${updatedDonation.id} has been updated to category ${updatedDonation.category}`}</p>
      )}
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
            donations
              .filter((donation) => donation.category === "donated")
              .map((donation, index) => {
                const uniqueId = donationIds[index] || uuidv4(); // generate a new unique id for each donation
                if (!donationIds[index]) {
                  setDonationIds([...donationIds.slice(0, index), uniqueId, ...donationIds.slice(index + 1)]);

                  }
                return (
                  <tr key={uniqueId}>
                    <td>{donation.type}</td>
                    <td>{donation.amount}</td>
                    <td>{donation.description}</td>
                    <td>
                      {isAdmin && (
                        <Button
                          variant="success"
                          onClick={() => markAsDonated(donation)}
                        >
                          Repeat
                        </Button>
                      )}{" "}
                      {isAdmin && (
                        <Button
                          variant="danger"
                          onClick={() => deleteRequest(donation)}
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </>
  );
};

export default Donated;
