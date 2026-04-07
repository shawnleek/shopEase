package com.shopease.controller;

import com.shopease.model.Product;
import com.shopease.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAll() { return productService.getAllProducts(); }

    @GetMapping("/{id}")
    public Product getOne(@PathVariable Long id) { return productService.getProduct(id); }

    @GetMapping("/search")
    public List<Product> search(@RequestParam String name) {
        return productService.searchProducts(name);
    }

    @GetMapping("/category/{cat}")
    public List<Product> byCategory(@PathVariable String cat) {
        return productService.getByCategory(cat);
    }

    @PostMapping
    public Product create(@RequestBody Product p) { return productService.createProduct(p); }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product p) {
        return productService.updateProduct(id, p);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}