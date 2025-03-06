"use client";
import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box, Container, Rating } from "@mui/material";

const product = {
  id: 2,
  title: "Mens Casual Premium Slim Fit T-Shirts ",
  price: 22.3,
  description:
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  category: "men's clothing",
  image:
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  rating: {
    rate: 4.1,
    count: 259,
  },
};

const ProductDetails: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 3, borderRadius: 2, p: 3, height: "80vh", maxWidth: "1200px", width: "100%" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ width: { xs: '100%', md: 400 }, height: "70%", objectFit: 'contain', borderRadius: 2 }}
        />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: "100%" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Category: {product.category}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {product.description}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Rating value={product.rating.rate} precision={0.1} readOnly />
            <Typography variant="body2" color="textSecondary">
              ({product.rating.count} reviews)
            </Typography>
          </Box>
          <Box mt={3}>
            <Button variant="contained" color="primary" sx={{ borderRadius: 2, py: 1, fontSize: "1rem" }}>
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;