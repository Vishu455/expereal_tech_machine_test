"use client";
import React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useAtom } from "jotai";
import { cartAtom } from "../store/cartAtom";

const Navbar: React.FC = () => {
  const [cart] = useAtom(cartAtom);
  const cartItemCount = cart.length;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1E1E2F", boxShadow: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
        >
          EXPEREAL TECHNOLOGIES
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Typography
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontSize: "1rem",
              "&:hover": { color: "#64b5f6" },
            }}
          >
            Home
          </Typography>
        </Box>
        <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <IconButton sx={{ display: { md: "none" }, color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
