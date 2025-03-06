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
  FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./types";

function Home() {
  const [category, setCategory] = useState("all");
  const router = useRouter();
  const categories = [
    { label: "All", value: "all" },
    { label: "Electronics", value: "electronics" },
    { label: "Jewelry", value: "jewelery" },
    { label: "Men's Clothing", value: "men's clothing" }, 
    { label: "Women's Clothing", value: "women's clothing" },
  ];

  const fetchProducts = async () => {
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;
    const { data } = await axios.get(url);
    return data;
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const handleViewDetails = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="center" my={3}>
        <FormControl sx={{ minWidth: 250 }}>
          {/* <InputLabel>Category</InputLabel> */}
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
          >
            {categories.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {products?.map((product: Product) => (
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
                  onClick={() => handleViewDetails(product.id)}
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