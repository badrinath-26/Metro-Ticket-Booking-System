package com.example.metro.controller;

import com.example.metro.entity.Passenger;
import com.example.metro.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/passengers")
public class PassengerController {

    @Autowired
    private PassengerService passengerService;

    // Register Passenger
    @PostMapping("/register")
    public Passenger register(@RequestBody Passenger passenger) {
        return passengerService.registerPassenger(passenger);
    }

    // View Profile
    @GetMapping("/{id}")
    public Passenger getPassenger(@PathVariable Long id) {
        return passengerService.getPassengerById(id);
    }

    // Update Profile
    @PutMapping("/{id}")
    public Passenger updatePassenger(@PathVariable Long id, @RequestBody Passenger passenger) {
        return passengerService.updatePassenger(id, passenger);
    }
}
