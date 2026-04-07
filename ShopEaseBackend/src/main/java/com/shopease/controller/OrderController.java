package com.shopease.controller;

import com.shopease.model.Order;
import com.shopease.service.OrderService;
import com.shopease.util.JwtUtil;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final JwtUtil jwtUtil;

    public OrderController(OrderService orderService, JwtUtil jwtUtil) {
        this.orderService = orderService;
        this.jwtUtil = jwtUtil;
    }

    private String getEmail(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtUtil.extractEmail(token);
    }

    @PostMapping
    public Order placeOrder(@RequestHeader("Authorization") String auth,
                            @RequestBody Order order) {
        return orderService.placeOrder(getEmail(auth), order);
    }

    @GetMapping
    public List<Order> myOrders(@RequestHeader("Authorization") String auth) {
        return orderService.getUserOrders(getEmail(auth));
    }
}