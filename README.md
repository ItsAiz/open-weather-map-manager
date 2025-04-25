# WeatherApp

Welcome to **WeatherApp**. Track weather in your favorite cities, save locations, and access real-time meteorological data with ease.

## 🔥 Here you will find:

### ✨ Smart City Search
Quickly find any city with dynamic suggestions as you type.

### ✨ Live Weather Details
See temperature, wind, humidity, and more in real time.

### ✨ Historical Insights
Explore forecast weather trends with interactive graphs.

### ✨ Your Favorite Cities
Save and manage frequently checked locations easily.

---

## 🚀 Technologies Used

- **Next.js** 15.3.1
- **React** 19
- **TypeScript**
- **Material UI (MUI)** for UI components
- **Recharts** for visualizing weather trends
- **Axios** for API requests
- **UUID** for unique ID generation

---

## 🛠 Installation Instructions

> **Node.js version:** 20 or higher required

1. Clone the repository:

   ```bash
   git clone https://github.com/ItsAiz/open-weather-map-manager.git
   cd open-weather-map-manager

2. Install dependencies:

   ```bash
   npm install

## 🏁 How to Run the Project
- ##### Development mode:

   ```bash
   npm run dev

- ##### Production build:

   ```bash
   npm run build
   npm run start

- ##### Lint your code:

   ```bash
   npm run lint

## 🌐 Environment Variables

Before running the project, you need to define the following environment variables in a .env.local file at the root of your project.

- Create the file:

   ```bash
   touchasd .env.local

- And add the following content:

   ```bash
   # App environment (dev, qa, prod)
   NEXT_PUBLIC_REACT_ENV=dev

   # Your OpenWeatherMap API Key
   NEXT_PUBLIC_REACT_API_KEY=178141971bb8321c61ab824b060b770b

   # Base URL for weather data
   NEXT_PUBLIC_REACT_API_URL=https://api.openweathermap.org/data/2.5

   # Base URL for city/location geocoding
   NEXT_PUBLIC_REACT_API_URL_PUBLIC=https://api.openweathermap.org/geo/1.0/direct

⚠️ Important: All environment variables that need to be accessed in the browser must start with NEXT_PUBLIC_.


