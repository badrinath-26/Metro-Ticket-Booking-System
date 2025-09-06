import React, { useState, useEffect } from "react";
import { getAllTickets, getAllStations } from "../Services/api";

function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTickets: 0,
    totalRevenue: 0,
    totalStations: 0
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [ticketsResponse, stationsResponse] = await Promise.all([
        getAllTickets(),
        getAllStations()
      ]);

      setTickets(ticketsResponse.data);
      setStations(stationsResponse.data);

      // Calculate stats
      const totalRevenue = ticketsResponse.data.reduce((sum, ticket) => sum + ticket.fare, 0);
      setStats({
        totalTickets: ticketsResponse.data.length,
        totalRevenue: totalRevenue,
        totalStations: stationsResponse.data.length
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
        <h2>Loading Admin Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#4CAF50', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3>Total Tickets</h3>
          <h2>{stats.totalTickets}</h2>
        </div>
        <div style={{ backgroundColor: '#2196F3', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3>Total Revenue</h3>
          <h2>₹{stats.totalRevenue}</h2>
        </div>
        <div style={{ backgroundColor: '#FF9800', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3>Total Stations</h3>
          <h2>{stats.totalStations}</h2>
        </div>
      </div>

      {/* All Tickets Table */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>All Booked Tickets</h2>
        {tickets.length === 0 ? (
          <p>No tickets booked yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ticket ID</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Passenger Name</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>From Station</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>To Station</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Fare</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Booking Time</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.passengerName}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.fromStation.name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.toStation.name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{ticket.fare}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {new Date(ticket.bookingTime).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stations List */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2>Metro Stations</h2>
        {stations.length === 0 ? (
          <p>No stations available.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {stations.map((station) => (
              <div key={station.id} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <strong>{station.name}</strong>
                <br />
                <small>Position: {station.position}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;