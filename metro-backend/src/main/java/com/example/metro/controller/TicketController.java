package com.example.metro.controller;

import com.example.metro.dto.TicketRequest;
import com.example.metro.entity.Ticket;
import com.example.metro.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    // ✅ Only USER can book tickets
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody TicketRequest request) {
        return ticketService.bookTicket(
                request.getPassengerName(),
                request.getFromStationId(),
                request.getToStationId()
        );
    }

    // ✅ USER can see a specific ticket
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{id}")
    public Ticket getTicket(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    // ✅ Only ADMIN can view all tickets
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    // ✅ USER can check fare
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/fare")
    public int getFare(@RequestParam Long fromStationId, @RequestParam Long toStationId) {
        return ticketService.calculateFare(fromStationId, toStationId);
    }

    // ✅ Only ADMIN can delete tickets
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }
}
