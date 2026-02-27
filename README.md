# Aishwaryam X AI

## Project Overview
Aishwaryam X AI is a frontend application built to serve as an intelligent financial operating system for young working professionals. It analyzes a user's cashflow and structural financial health to provide precise micro-optimizations, purchase risk analysis, and future wealth trajectory simulations.

The primary goal of the application is to translate raw financial inputs into actionable, high-impact behavioral adjustments using real-time computation and data visualization.

---

## Technical Architecture

The architecture is entirely client-side, utilizing a modern React stack optimized for rapid performance, fluid interactions, and maintainable state management.

### Tech Stack
*   **Framework**: React 18
*   **Build Tool**: Vite (with SWC for faster compilation)
*   **State Management**: Zustand (Global state for user financial profiles)
*   **Routing**: React Router DOM (Client-side localized routing without full page reloads)
*   **Styling**: Tailwind CSS v4 (Utility-first CSS framework natively integrated into the build step)
*   **Animations**: Framer Motion (Declarative spring-based physics engine for UI transitions)
*   **Data Visualization**: Recharts (Declarative SVG chart library optimized for React)
*   **Icons**: Lucide React (Clean, scalable SVG icon set)

---

## Core Components and Modules

### 1. State Management (/src/store/useStore.js)
A lightweight, centralized global store built with Zustand. It acts as the single source of truth for the user's financial profile. It tracks:
*   Monthly Income
*   Fixed Expenses
*   Lifestyle Expenses
*   Emergency Fund
*   Invested Savings/Capital

By elevating state globally, components like the Simulator or the AI Advisor can fetch and recalculate data in real-time without prop-drilling or context providers.

### 2. Form Data Intake (/src/pages/FinancialInput.jsx)
A progressive, multi-step intake flow designed to collect financial data efficiently.
*   **Mechanism**: Uses local React state for intermediate keystrokes and updates the global Zustand store only when completing a step to minimize unnecessary global re-renders.
*   **Real-time Feedback**: Computes and displays the remaining monthly surplus dynamically as fields are populated.

### 3. Financial Intelligence Dashboard (/src/pages/Dashboard.jsx)
The core analytics hub visualizing standard benchmark rules.
*   **Scoring Algorithm**: A custom 100-point algorithm that evaluates financial structural integrity. It analyzes the Savings Ratio (target >20%), Fixed Obligations Ratio (target <50%), Lifestyle Ratio (target <30%), and the depth of the Emergency Fund (target >6 months).
*   **Visualizations**: Utilizes an SVG-based custom Circular Progress indicator for the score, and a Recharts Donut Pie chart for cash flow allocation.

### 4. AI Advisor & Simulator (/src/pages/Advisor.jsx)
The predictive engine of the application.
*   **Smart Spend Advisor**: Deducts a proposed discretionary purchase directly from the calculated monthly surplus, categorizing the purchase into Safe, Caution, or Danger risk strata, while simulating the absolute delay to broader financial goals.
*   **Future Simulator**: Computes a 12-month compounding forward-projection based on an assumed 8% CAGR on the current savings + monthly surplus, plotted against an AI-optimized trajectory via a Recharts dual-path Area Chart.

### 5. Master Action Plan (/src/pages/ActionPlan.jsx)
A structural remediation planner detailing necessary behavioral changes.
*   **Dynamic Risk Rendering**: Parses user variables to trigger conditional alerts (e.g., rendering "Fragile Emergency Buffer" only if the ratio falls below 6 months).
*   **Re-allocation Strategy**: Computes mathematically viable trims to rigid and discretionary expenses based on industry-standard benchmarking, showcasing the exact long-term compounded value of executing the trim.

### 6. Interactive Splash (/src/pages/Splash.jsx)
A framer-motion powered introductory screen establishing the premium aesthetic and identity of the system before onboarding.

### 7. UI Component Library (/src/components/ui/)
A custom, decoupled UI implementation enforcing a premium, dark-mode-first fintech visual identity. Components implement tailwind-merge to ensure predictable CSS class overrides when extended.

---

## Installation and Local Setup

1.  Clone the repository.
2.  Navigate to the project root directory.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
   

---

## Project Structure

```
aish2.0/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and global files
│   ├── components/
│   │   ├── layout/         # High-level wrappers (Navbar, Layout)
│   │   └── ui/             # Granular UI abstractions (Button, Card, Input)
│   ├── pages/              # Primary route views (Splash, Landing, Dashboard, Advisor)
│   ├── store/              # Global state definitions (Zustand)
│   ├── App.jsx             # Router and layout configuration
│   ├── index.css           # Global styles and Tailwind variable configuration
│   └── main.jsx            # Application entry point
├── package.json            # Dependency tracking
├── tailwind.config.js      # Configuration for v4 CSS pipeline (if utilized)
└── vite.config.js          # Build configuration plugins
```
