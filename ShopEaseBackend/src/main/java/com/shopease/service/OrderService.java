package com.shopease.service;

import com.shopease.model.*;
import com.shopease.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public OrderService(OrderRepository orderRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    public Order placeOrder(String email, Order order) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        return orderRepo.save(order);
    }

    public List<Order> getUserOrders(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepo.findByUser(user);
    }
}