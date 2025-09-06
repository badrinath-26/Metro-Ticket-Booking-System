package com.example.metro.service;

import com.example.metro.entity.Passenger;
import com.example.metro.repository.PassengerRepository;
import org.springframework.stereotype.Service;

@Service
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository passengerRepository;

    public PassengerServiceImpl(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    @Override
    public Passenger registerPassenger(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    @Override
    public Passenger getPassengerById(Long id) {
        return passengerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Passenger not found with id: " + id));
    }

    @Override
    public Passenger updatePassenger(Long id, Passenger passengerDetails) {
        Passenger passenger = passengerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Passenger not found with id: " + id));

        passenger.setName(passengerDetails.getName());
        passenger.setEmail(passengerDetails.getEmail());
        passenger.setPhone(passengerDetails.getPhone());
//        passenger.setPassword(passengerDetails.getPassword());

        return passengerRepository.save(passenger);
    }
}
