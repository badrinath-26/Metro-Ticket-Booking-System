package com.example.metro.repository;

import com.example.metro.entity.Station;
import java.util.List;


    public interface StationRepository {
        Station saveStation(Station station);
        Station getStationById(Long id);
        List<Station> getAllStations();
        Station updateStation(Long id, Station station);
        void deleteStation(Long id);
    }

