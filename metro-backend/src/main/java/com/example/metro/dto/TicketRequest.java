package com.example.metro.dto;

public class TicketRequest {

    private String passengerName;
    private Long fromStationId;
    private Long toStationId;

    public TicketRequest() {
    }

    public TicketRequest(String passengerName, Long fromStationId, Long toStationId) {
        this.passengerName = passengerName;
        this.fromStationId = fromStationId;
        this.toStationId = toStationId;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public Long getFromStationId() {
        return fromStationId;
    }

    public void setFromStationId(Long fromStationId) {
        this.fromStationId = fromStationId;
    }

    public Long getToStationId() {
        return toStationId;
    }

    public void setToStationId(Long toStationId) {
        this.toStationId = toStationId;
    }
}
