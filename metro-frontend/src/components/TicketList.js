import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    axios.get('http://localhost:8080/tickets') // ✅ matches your backend controller
      .then(res => setTickets(res.data))
      .catch(err => console.error('Error fetching tickets:', err));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>All Booked Tickets</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Passenger Name</th>
            <th>From Station</th>
            <th>To Station</th>
            <th>Booking Date</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.passengerName}</td>
                <td>{ticket.fromStation?.name}</td>
                <td>{ticket.toStation?.name}</td>
                <td>{new Date(ticket.bookingTime).toLocaleDateString()}</td>
                <td>{ticket.fare}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No tickets booked yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
