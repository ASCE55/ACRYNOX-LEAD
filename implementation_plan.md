# LeadGenius: Web Developer Client Finder

This plan outlines the development of a premium web application designed to help you find potential clients (shops/businesses) in a specific location (e.g., Erode) that have good ratings but lack a website.

## User Review Required

> [!IMPORTANT]
> **Data Source & API Key Requirement**
> To fetch real-time data from Google Maps (including ratings, phone numbers, and website status), this application requires a **Google Maps Places API Key**. 
> 
> Because I cannot provide an active billing API key for you, I will build the application with a **Mock Data Mode**. This will allow you to see the premium UI, interact with the app, and see how the results will look using realistic sample data for "Erode".
>
> I will also write the real API integration code. Once the app is built, you can simply paste your Google Maps API key into the code to start fetching real, live leads from anywhere in the world.
>
> **Do you approve of this approach (building the premium UI with a mock mode, plus the real API code ready for your key)?**

## Proposed Changes

### Frontend Application (Vanilla HTML/CSS/JS)

We will build this as a standalone web application for simplicity and high performance, using a modern, dark-themed, glassmorphism design to make it look professional and premium.

#### [NEW] `c:/Users/mugil/Downloads/webvbul/index.html`
- The main structure of the application.
- A hero section with a search bar (Location) and category dropdown (Food, Salon, Retail, etc.).
- A "Find Leads" action button.
- A results dashboard that dynamically displays categories and individual business cards.

#### [NEW] `c:/Users/mugil/Downloads/webvbul/style.css`
- Premium dark mode aesthetics.
- Cyberpunk/Neon accents or sleek corporate gradients (let me know if you have a preference).
- Hover animations and smooth transitions for the search results.
- Fully responsive design for mobile and desktop.

#### [NEW] `c:/Users/mugil/Downloads/webvbul/app.js`
- Logic to handle user input.
- A `fetchLeads()` function that will interact with either the Mock Data source or the real Google Places API.
- Logic to filter out businesses that already have a website.
- Logic to filter for high ratings (e.g., 4.0 and above).
- DOM manipulation to render the business cards with Name, Rating, Phone, Address, and a Google Maps link.

## Verification Plan

### Manual Verification
1. I will provide a command to run a local server (`npx serve`).
2. You can open the app in your browser.
3. Test the "Mock Data Mode" by searching for "Erode" and "Food".
4. Verify that the UI looks premium, the results are categorized correctly, and the contact/map details are clear.
5. I will point out where to add your Google API key for real-world usage.
