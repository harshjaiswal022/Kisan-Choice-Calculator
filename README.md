# 🌾 Kisan Choice Calculator

> An AI-assisted AgriTech prototype that helps farmers compare post-harvest selling, transportation, and storage options to understand which choice could provide better net returns.

![Kisan Choice Calculator](https://img.shields.io/badge/AgriTech-Farmer%20Decision%20Support-2E7D32)
![Built With](https://img.shields.io/badge/Built%20With-AI--Assisted%20Development-4285F4)
![Status](https://img.shields.io/badge/Status-Prototype-orange)

---

## 📌 Overview

Farmers often face an important decision immediately after harvest:

**Should I sell my produce locally, transport it to another mandi, or store it and sell later?**

The Kisan Choice Calculator is a mobile-first decision-support prototype designed to make this decision easier by comparing different post-harvest strategies based on factors such as:

- Crop and quantity
- Produce quality
- Local mandi price
- District mandi price
- Transportation distance
- Transportation cost
- Mandi charges
- Storage costs
- Estimated spoilage or weight loss

Instead of looking only at the headline selling price, the application focuses on the **estimated net amount remaining after major costs and losses**.

---

## 🎯 Problem Statement

Post-harvest decisions can significantly affect a farmer's final earnings.

A higher mandi price does not necessarily mean higher profit. Transportation expenses, mandi charges, storage costs, and potential spoilage can reduce the final amount received.

Farmers therefore need a simple way to answer:

> **"Which selling option is likely to leave me with the most money after costs and losses?"**

Kisan Choice Calculator attempts to provide this comparison through a simple, farmer-friendly interface.

---

## 💡 Solution

The application compares three primary strategies:

### 1. 🏪 Sell Now

Sell the produce at the local mandi immediately.

### 2. 🚚 Transport to Another Mandi

Compare the expected higher mandi price against transportation and other associated costs.

### 3. ❄️ Store & Sell Later

Estimate whether storing the produce for a selected period could potentially result in a better return after storage costs and expected losses.

The application then presents the options side-by-side and highlights the option with the highest estimated net return.

---

## ✨ Key Features

- 🌾 Crop selection
- ⚖️ Quantity-based calculation
- ⭐ Produce quality selection
- 📍 Local and district mandi comparison
- 🚚 Transportation distance and cost estimation
- 💰 Mandi fee calculation
- ❄️ Storage option analysis
- 📉 Estimated spoilage / weight-loss consideration
- 📊 Net income comparison
- 🏆 Recommended sale strategy
- 🔍 Transparent cost breakdown
- 📱 Mobile-first farmer-friendly interface
- 🌐 Designed with accessibility and simplicity in mind

---

## 🧮 How It Works

The core decision process follows:

```text
Farmer Input
     ↓
Crop & Quantity
     ↓
Quality & Market Selection
     ↓
Compare Available Strategies
     ↓
Estimate Gross Revenue
     ↓
Subtract Transportation / Mandi / Storage Costs
     ↓
Account for Estimated Losses
     ↓
Calculate Net Return
     ↓
Compare Strategies
     ↓
Recommended Option
Simplified calculation
Net Return
=
Gross Crop Value
− Mandi Charges
− Transportation Cost
− Storage Cost
− Estimated Losses

The prototype presents these calculations in a way that is easier to understand than a traditional financial or agricultural dashboard.

🖥️ Application Flow
Step 1 — Enter Produce Details

The farmer selects:

Crop
Quantity
Quality grade
Step 2 — Select Market Options

The farmer can compare:

Local mandi
District mandi
Transportation distance
Storage availability
Step 3 — Calculate

The application processes the available inputs and estimates the expected return for each strategy.

Step 4 — Compare Results

The farmer receives a comparison of:

Strategy	Expected Return	Major Costs
Sell Now	Calculated	Mandi charges
Transport	Calculated	Transport + mandi charges + losses
Store & Sell Later	Calculated	Storage + losses + mandi charges
Step 5 — Understand the Recommendation

The application highlights the strategy with the highest calculated net return and explains the major factors behind the result.

🛠️ Technology

The prototype was developed using an AI-assisted rapid development workflow.

Frontend
React
JavaScript / TypeScript
Modern responsive UI
CSS-based responsive design
Development & AI
Google AI Studio
Gemini-powered AI-assisted development
Version Control
Git
GitHub
Prototype Data

The current version uses demo/configurable market data for demonstrating the decision-making workflow.

🤖 AI-Assisted Development

This project was developed using an AI-assisted product prototyping workflow.

The development process was:

Problem Identification
        ↓
Challenge Analysis
        ↓
Idea Refinement
        ↓
Product Requirements / PRD
        ↓
AI-Assisted Application Development
        ↓
UI & Workflow Refinement
        ↓
Working Prototype

The initial problem and solution concept were developed during the TCS AI Tech Day / RapidBuild Hackathon, followed by AI-assisted implementation and refinement using Google AI Studio.

The goal was to demonstrate how AI-assisted development can reduce the time required to transform a real-world problem into a functional software prototype.

🚧 Current Limitations

This repository contains a prototype intended to demonstrate the product concept and decision-support workflow.

The current version does not represent a production-grade agricultural advisory system.

Current limitations include:

Market data is currently based on demo/configurable values.
Transportation costs are estimates rather than live vehicle quotations.
Storage availability is not connected to real cold-storage inventory.
Spoilage estimates are simplified.
Weather and market-trend data are not yet integrated.
Recommendations should not be treated as guaranteed financial outcomes.
🔮 Future Improvements

The project can be extended into a more comprehensive farmer decision-support platform.

Live Market Data

Integrate reliable mandi/market data sources to provide updated prices.

🚚 Transport Intelligence

Integrate:

Distance-based transport estimates
Vehicle availability
Local transport rates
Loading/unloading costs
❄️ Storage Intelligence

Add:

Nearby cold-storage discovery
Storage availability
Cost per day
Expected spoilage
Break-even selling price
🌦️ Weather Integration

Use weather forecasts to estimate potential post-harvest risks during transportation and storage.

📈 Market Trends

Analyze historical and current market prices to provide trend-based insights.

🗣️ Regional Languages

Support languages such as:

Hindi
Bengali
Marathi
Punjabi
Tamil
Telugu
📱 Voice-Based Interaction

Introduce voice input and conversational assistance for farmers who may prefer speaking instead of typing.

👨‍🌾 FPO Integration

Enable Farmer Producer Organizations to compare:

Aggregated produce
Transport options
Storage options
Market opportunities
🎯 Target Users

The concept is primarily designed for:

Small and marginal farmers
Farmers managing perishable crops
Farmer Producer Organizations (FPOs)
Agricultural cooperatives
Rural market facilitators
🌱 Example Use Case

Suppose a farmer has harvested a batch of produce.

The local mandi offers a lower price, while another mandi offers a higher price.

However, reaching the second mandi requires:

Transportation
Loading/unloading
Mandi charges
Additional travel time
Potential produce loss

The calculator compares these factors rather than simply showing:

"Mandi B has a higher price."

Instead, it tries to answer:

"After considering the additional costs and estimated losses, how much money could remain with the farmer?"

This is the core idea behind Kisan Choice Calculator.

📊 Project Vision

The long-term vision is to evolve Kisan Choice Calculator from a demonstration prototype into a practical post-harvest decision-support platform that combines:

Market Prices
      +
Transport Costs
      +
Storage Costs
      +
Weather
      +
Crop Characteristics
      +
Market Trends
      ↓
Farmer-Friendly Decision Support

The objective is not simply to provide more agricultural data, but to convert fragmented information into a simple financial comparison that farmers can understand and act upon.

🏆 Hackathon Context

This prototype was developed as part of the:

TCS AI Tech Day Hackathon — RapidBuild

Challenge

Post-Harvest Handling and Sale Timing

Prototype

Kisan Choice Calculator

Core Question

When should a farmer sell, where should they sell, and what could they actually earn after considering the major costs and losses?

👨‍💻 Project

Kisan Choice Calculator

Built as an AI-assisted AgriTech prototype focused on post-harvest decision support.

📄 License

This project is currently intended as a prototype and demonstration project.

Add an appropriate open-source license if you decide to make the repository open source.

⭐ Future Direction

The prototype can serve as a foundation for building a more data-driven agricultural decision-support system with reliable market, transport, storage, and weather integrations.

From "Where is the price higher?" to "Where could I actually earn more?" 🌾
