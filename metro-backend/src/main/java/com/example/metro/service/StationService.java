package com.example.metro.service;

import com.example.metro.entity.Station;
import java.util.List;

public interface StationService {
    Station createStation(Station station);
    Station getStationById(Long id);
    List<Station> getAllStations();
    Station updateStation(Long id, Station station);
    void deleteStation(Long id);
}

