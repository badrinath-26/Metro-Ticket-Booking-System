import React, { useState, useEffect } from "react";
import { getAllStations, bookTicket, getTicketFare } from "../Services/api";

function Dashboard() {
  const [stations, setStations] = useState([]);
  const [fromStationId, setFromStationId] = useState("");
  const [toStationId, setToStationId] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [fare, setFare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    if (fromStationId && toStationId && fromStationId !== toStationId) {
      fetchFare();
    } else {
      setFare(null);
    }
  }, [fromStationId, toStationId]);

  const fetchStations = async () => {
    try {
      const response = await getAllStations();
      setStations(response.data);
    } catch (error) {
      console.error("Error fetching stations:", error);
      alert("Failed to load stations");
    }
  };

  const fetchFare = async () => {
    try {
      const response = await getTicketFare(fromStationId, toStationId);
      setFare(response.data);
    } catch (error) {
      console.error("Error fetching fare:", error);
      setFare(null);
    }
  };

  const handleBookTicket = async (e) => {
    e.preventDefault();
    
    if (!passengerName || !fromStationId || !toStationId) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await bookTicket({
        passengerName,
        fromStationId: parseInt(fromStationId),
        toStationId: parseInt(toStationId)
      });

      alert("Ticket booked successfully!");
      
      // Add to booking history
      setBookingHistory(prev => [...prev, response.data]);
      
      // Reset form
      setPassengerName("");
      setFromStationId("");
      setToStationId("");
      setFare(null);
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("Failed to book ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>User Dashboard</h1>
      
      {/* Booking Form */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>Book a Ticket</h2>
        <form onSubmit={handleBookTicket}>
          <div style={{ marginBottom: '15px' }}>
            <label>Passenger Name:</label>
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              placeholder="Enter passenger name"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>From Station:</label>
            <select
              value={fromStationId}
              onChange={(e) => setFromStationId(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            >
              <option value="">Select Station</option>
              {stations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>To Station:</label>
            <select
              value={toStationId}
              onChange={(e) => setToStationId(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            >
              <option value="">Select Station</option>
              {stations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>

          {fare !== null && (
            <div style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>
              Fare: ₹{fare}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !fare}
            style={{
              backgroundColor: loading || !fare ? '#ccc' : '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: loading || !fare ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Booking..." : "Book Ticket"}
          </button>
        </form>
      </div>

      {/* Booking History */}
      {bookingHistory.length > 0 && (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
          <h2>Your Recent Bookings</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ticket ID</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Passenger</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>From</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>To</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Fare</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((ticket) => (
                  <tr key={ticket.id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.passengerName}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.fromStation.name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.toStation.name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{ticket.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;