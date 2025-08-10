package com.example.metro.controller;

import com.example.metro.entity.Station;
import com.example.metro.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StationController {

    @Autowired
    private StationService stationService;

    // Create a new station
    @PostMapping("/api/stations")
    public ResponseEntity<Station> createStation(@RequestBody Station station) {
        Station savedStation = stationService.createStation(station);
        return ResponseEntity.ok(savedStation);
    }

    // Get a station by ID
    @GetMapping("/api/stations/{id}")
    public ResponseEntity<Station> getStationById(@PathVariable Long id) {
        Station station = stationService.getStationById(id);
        if (station != null) {
            return ResponseEntity.ok(station);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all stations
    @GetMapping("/api/stations")
    public ResponseEntity<List<Station>> getAllStations() {
        List<Station> stations = stationService.getAllStations();
        return ResponseEntity.ok(stations);
    }

    // Update a station
    @PutMapping("/api/stations/{id}")
    public ResponseEntity<Station> updateStation(@PathVariable Long id, @RequestBody Station station) {
        try {
            Station updatedStation = stationService.updateStation(id, station);
            return ResponseEntity.ok(updatedStation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a station
    @DeleteMapping("/api/stations/{id}")
    public ResponseEntity<Void> deleteStation(@PathVariable Long id) {
        try {
            stationService.deleteStation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
