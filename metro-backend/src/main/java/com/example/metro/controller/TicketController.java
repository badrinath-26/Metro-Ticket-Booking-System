package com.example.metro.controller;

import com.example.metro.dto.TicketRequest;
import com.example.metro.entity.Ticket;
import com.example.metro.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody TicketRequest request) {
        return ticketService.bookTicket(
                request.getPassengerName(),
                request.getFromStationId(),
                request.getToStationId()
        );
    }

    @GetMapping("/{id}")
    public Ticket getTicket(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }
    @GetMapping("/fare")
    public int getFare(@RequestParam Long fromStationId, @RequestParam Long toStationId) {
        return ticketService.calculateFare(fromStationId, toStationId);
    }


    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }
}
