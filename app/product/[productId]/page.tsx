"use client";
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Rating,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { addToCartAtom } from "@/app/store/cartAtom";

const ProductDetails = ({ params }: { params: { productId: number } }) => {
  const { productId } = params;
  const addToCart = useSetAtom(addToCartAtom);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetails(productId),
    enabled: !!productId,
  });

  const fetchProductDetails = async (id: number) => {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return data;
  };

  if (isLoading) return <p>Loading product details...</p>;
  if (error || !product) return <p>Error loading product details</p>;

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 3,
          borderRadius: 2,
          p: 3,
          height: "80vh",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            width: { xs: "100%", md: 400 },
            height: "70%",
            objectFit: "contain",
            borderRadius: 2,
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Category: {product.category}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            fontWeight="bold"
            gutterBottom
          >
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
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, py: 1, fontSize: "1rem" }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
