/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const [category, setCategory] = useState("all");
  const router = useRouter();
  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  };

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p: any) => p.category === category);

  const handleViewDetails = (productId: number) => {
    router.push(`/product/${productId}`)
  };

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="center" mb={3}>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          variant="outlined"
          sx={{ minWidth: 200 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={3}>
        {filteredProducts?.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", padding: 2 }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  ${product.price}
                </Typography>
              </CardContent>
              <Box textAlign="center" pb={2}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "80%", borderRadius: 2 }}
                  onClick={()=>handleViewDetails(product.id)}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
