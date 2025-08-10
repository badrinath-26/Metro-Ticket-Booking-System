package com.example.metro.service;

import com.example.metro.entity.Station;
import com.example.metro.entity.Ticket;
import com.example.metro.repository.StationJpaRepository;
import com.example.metro.repository.StationRepository;
import com.example.metro.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private StationJpaRepository stationRepository;

    @Override
    public Ticket bookTicket(String passengerName, Long fromStationId, Long toStationId) {
        Station fromStation = stationRepository.findById(fromStationId)
                .orElseThrow(() -> new RuntimeException("From Station not found"));

        Station toStation = stationRepository.findById(toStationId)
                .orElseThrow(() -> new RuntimeException("To Station not found"));

        // 🚫 Validation: Prevent booking from and to the same station
        if (fromStation.getId().equals(toStation.getId())) {
            throw new RuntimeException("From and To stations cannot be the same");
        }

        // Calculate fare (₹5 per station)
        int distance = Math.abs(toStation.getPosition() - fromStation.getPosition());
        double fare = distance * 5.0;

        Ticket ticket = new Ticket(
                passengerName,
                fromStation,
                toStation,
                fare,
                LocalDateTime.now()
        );

        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Override
    public int calculateFare(Long fromStationId, Long toStationId) {
        Station fromStation = stationRepository.findById(fromStationId)
                .orElseThrow(() -> new RuntimeException("From Station not found"));

        Station toStation = stationRepository.findById(toStationId)
                .orElseThrow(() -> new RuntimeException("To Station not found"));

        if (fromStation.getId().equals(toStation.getId())) {
            throw new RuntimeException("From and To stations cannot be the same");
        }

        int distance = Math.abs(toStation.getPosition() - fromStation.getPosition());
        return distance * 5; // ₹5 per station
    }
    @Override
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}
