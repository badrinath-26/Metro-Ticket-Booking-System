package com.example.metro.service;

import com.example.metro.entity.Passenger;

public interface PassengerService {
    Passenger registerPassenger(Passenger passenger);
//    Passenger login(String email, String password);
    Passenger getPassengerById(Long id);
    Passenger updatePassenger(Long id, Passenger passenger);
}
