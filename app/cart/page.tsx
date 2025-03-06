"use client";
import React from "react";
import { Container, Card, Typography, Button, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useAtom } from "jotai";
import { cartAtom, removeFromCartAtom, updateQuantityAtom } from "../store/cartAtom";
import { CartProduct } from "../types";

export default function Cart() {
  const [cart] = useAtom(cartAtom);
  const updateQuantity = useAtom(updateQuantityAtom)[1];
  const removeItem = useAtom(removeFromCartAtom)[1];

  const getTotalCost = () => {
    return cart.reduce((total: number, item: CartProduct) => total + (item?.price || 0) * (item?.quantity || 0), 0).toFixed(2);
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
              {cart.map((item: CartProduct) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={4}>
                      <img src={item.image} alt={item.title} width={50} height={50} style={{ borderRadius: 5 }} />
                      <Typography>
                        {item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => updateQuantity({ productId: item.id, change: -1 })}><Remove /></IconButton>
                    {item.quantity}
                    <IconButton onClick={() => updateQuantity({ productId: item.id, change: 1 })}><Add /></IconButton>
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