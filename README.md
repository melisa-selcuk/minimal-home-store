# Minimal Home Store

Minimal Home Store is a demo e-commerce web application built with Next.js, TypeScript, Tailwind CSS, Prisma and SQLite.

The project was developed as a graduation project for the React Foundations Web Development Certification Course. It includes product listing, search and filtering, shopping cart management, checkout flow, simulated payment, user authentication and order history.

## Live Demo

https://minimal-home-store.onrender.com

## Demo Video

[Demo video link will be added after recording.](https://drive.google.com/file/d/1GEzcCOPQ_gEa97xpq3sK1L0KmFTt1B4w/view?usp=drive_link)

## Features

- User registration
- User login and logout
- Cookie-based session handling
- Protected routes
- Product listing
- Product detail pages
- Product search
- Category filtering
- Product sorting
- Shopping cart with localStorage persistence
- Quantity update and remove item functionality
- Checkout form
- Simulated credit card payment
- Order creation
- Order history
- Order detail page
- User profile page
- Custom loading, error and not found pages
- Responsive layout basics

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- bcryptjs
- tsx

## Project Structure

```txt
src/
  app/
    api/
    cart/
    checkout/
    login/
    orders/
    products/
    profile/
    register/
  components/
    cart/
    forms/
    layout/
    product/
    ui/
  context/
  generated/
  hooks/
  lib/
  types/
  proxy.ts

prisma/
  schema.prisma
  seed.ts

public/
  products/