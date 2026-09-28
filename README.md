# monis.rent Workspace Configurator

An interactive workspace builder for [monis.rent](https://monis.rent), a Bali-based office-equipment rental service for digital nomads and startups.

Users can visually design their dream remote-work setup — pick a desk, chair, monitors, plants, lamps, and even lifestyle gear like surfboards and scooters — then review a monthly rental summary and hit "Rent".

## Live Demo

- **Deployed URL:** (added after Vercel deployment)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Architecture:** MVVM (Model-View-ViewModel)

## Architecture

```
models/           # Data models and product catalog
viewmodels/       # React hooks that expose state + business logic
views/            # Top-level page views
components/       # Reusable UI components
app/              # Next.js app router entry points
```

## Features

- 3 desks, 3 chairs, and a range of accessories
- Visual workspace preview that updates in real time
- Slot-based accessory placement (center/left/right monitors, plants, etc.)
- Monthly rental summary with deposit estimate
- Mobile-responsive layout
- Smooth animations and micro-interactions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Deployment

This project is configured for Vercel. Connect the GitHub repository to a Vercel project for automatic deploys.
