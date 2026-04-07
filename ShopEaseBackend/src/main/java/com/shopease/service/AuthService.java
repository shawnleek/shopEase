package com.shopease.service;

import com.shopease.dto.*;
import com.shopease.model.User;
import com.shopease.repository.UserRepository;
import com.shopease.util.JwtUtil;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.math.BigInteger;

@Service
public class AuthService {
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
            return new BigInteger(1, hash).toString(16);
        } catch (Exception e) {
            throw new RuntimeException("Hashing failed", e);
        }
    }

    public String register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email already in use");
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(hashPassword(req.getPassword()));
        userRepo.save(user);
        return jwtUtil.generateToken(user.getEmail());
    }

    public String login(LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!hashPassword(req.getPassword()).equals(user.getPassword()))
            throw new RuntimeException("Invalid password");
        return jwtUtil.generateToken(user.getEmail());
    }
}