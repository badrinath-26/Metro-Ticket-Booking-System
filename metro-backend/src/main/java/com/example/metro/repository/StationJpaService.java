 package com.example.metro.repository;

import com.example.metro.entity.Station;
import com.example.metro.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationJpaService implements StationService {

    @Autowired
    private StationJpaRepository stationJpaRepository;

    @Override
    public Station createStation(Station station) {
        return stationJpaRepository.save(station);
    }

    @Override
    public Station getStationById(Long id) {
        return stationJpaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + id));
    }

    @Override
    public List<Station> getAllStations() {
        return stationJpaRepository.findAll();
    }

    @Override
    public Station updateStation(Long id, Station updatedStation) {
        Station existing = stationJpaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + id));

        existing.setName(updatedStation.getName());

        return stationJpaRepository.save(existing);
    }

    @Override
    public void deleteStation(Long id) {
        if (!stationJpaRepository.existsById(id)) {
            throw new RuntimeException("Station not found with id: " + id);
        }
        stationJpaRepository.deleteById(id);
    }
}
