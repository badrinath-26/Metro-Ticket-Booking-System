import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketForm = ({ onTicketBooked }) => {
  const [passengerName, setPassengerName] = useState('');
  const [fromStationId, setFromStationId] = useState('');
  const [toStationId, setToStationId] = useState('');
  const [stations, setStations] = useState([]);
  const [fare, setFare] = useState(null);

  // Fetch station list from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/stations')
      .then(res => setStations(res.data))
      .catch(err => console.error('Error fetching stations:', err));
  }, []);

  // Fetch fare whenever fromStationId or toStationId changes
  useEffect(() => {
    if (fromStationId && toStationId && fromStationId !== toStationId) {
   axios.get(`http://localhost:8080/tickets/fare?fromStationId=${fromStationId}&toStationId=${toStationId}`)
  .then(res => {
    setFare(res.data);
  })
  .catch(err => {
    console.error('Error fetching fare:', err);
    setFare(null);
  });
    }
  }, [fromStationId, toStationId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/tickets/book', {
      passengerName,
      fromStationId: parseInt(fromStationId),
      toStationId: parseInt(toStationId)
    })
      .then(() => {
        alert('Ticket booked successfully!');
        if (onTicketBooked) onTicketBooked(); // refresh TicketList
        setPassengerName('');
        setFromStationId('');
        setToStationId('');
        setFare(null);
      })
      .catch(err => console.error('Error booking ticket:', err));
  };

  return (
    <div>
      <h2>Book a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Passenger Name: </label>
          <input
            type="text"
            placeholder='Enter name'
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>From Station: </label>
          <select
            value={fromStationId}
            onChange={(e) => setFromStationId(e.target.value)}
            required
          >
            <option value="">Select Station</option>
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>To Station: </label>
          <select
            value={toStationId}
            onChange={(e) => setToStationId(e.target.value)}
            required
          >
            <option value="">Select Station</option>
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fare display always visible */}
        <div style={{ marginTop: '10px' }}>
          <strong>Fare: {fare !== null ? `₹${fare}` : '—'}</strong>
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Book Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;
