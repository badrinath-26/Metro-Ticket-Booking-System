package com.example.metro.service;

import com.example.metro.entity.Ticket;

import java.util.List;

public interface TicketService {
    Ticket bookTicket(String passengerName, Long fromStationId, Long toStationId);
    Ticket getTicketById(Long id);
    int calculateFare(Long fromStationId, Long toStationId);
    List<Ticket> getAllTickets();
    void deleteTicket(Long id);
}
