"use client";
import React, { useState } from "react";
import { Container, Card, Typography, Button, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const initialCart = [
  {
    id: 1,
    name: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    quantity: 1,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
  {
    id: 2,
    name: "Solid Gold Petite Micropave",
    price: 168.99,
    quantity: 2,
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2, p: 3 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Shopping Cart
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 3  }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={4}>
                      <img src={item.image} alt={item.name} width={50} height={50} style={{ borderRadius: 5 }} />
                      <Typography>{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => updateQuantity(item.id, -1)}><Remove /></IconButton>
                    {item.quantity}
                    <IconButton onClick={() => updateQuantity(item.id, 1)}><Add /></IconButton>
                  </TableCell>
                  <TableCell align="center">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="center">${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => removeItem(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">Total Cost: ${getTotalCost()}</Typography>
          <Button variant="contained" color="primary" sx={{ borderRadius: 2, py: 1, px: 2, fontSize: "0.8rem" }}>
            Proceed to Checkout
          </Button>
        </Box>
      </Card>
    </Container>
  );
}