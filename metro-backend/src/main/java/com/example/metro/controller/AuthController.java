package com.example.metro.controller;

import com.example.metro.config.JwtUtil;
import com.example.metro.dto.AuthRequest;
import com.example.metro.dto.AuthResponse;
import com.example.metro.entity.Passenger;
import com.example.metro.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ REGISTER (always registers as USER)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Passenger passenger) {
        passenger.setPassword(passwordEncoder.encode(passenger.getPassword()));
        passenger.setRole("ROLE_USER"); // Default role
        passengerRepository.save(passenger);
        return ResponseEntity.ok("Passenger registered successfully!");
    }


    // ✅ LOGIN (works for both USER & ADMIN)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            String token = jwtUtil.generateToken(request.getEmail());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid credentials!");
        }
    }
    @PostMapping("/encrypt-password")
    public String encryptPassword(@RequestParam String password) {
        return passwordEncoder.encode(password);
    }
}
