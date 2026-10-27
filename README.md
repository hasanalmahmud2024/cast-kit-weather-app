# CastKit Weather

**Live demo:** [cast-kit-weather-app.vercel.app](https://cast-kit-weather-app.vercel.app/)

CastKit Weather is a responsive weather dashboard for checking current conditions in cities across Bangladesh and around the world. It combines live weather data with atmospheric measurements, condition-aware recommendations, and a visual theme that adapts to the weather and time of day.

## Key Features

- **Search by city:** Find a city using Open-Meteo's geocoding service.
- **Current location:** Use your device's location after granting browser permission.
- **Bangladesh quick picks:** Open current conditions for popular cities, including Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, and Cox's Bazar.
- **Live conditions:** View current temperature, feels-like temperature, humidity, wind speed and direction, surface pressure, and precipitation.
- **Weather-aware presentation:** Condition-specific visuals, themes, and particle effects respond to weather and day/night conditions.
- **Practical recommendations:** Get contextual clothing and activity suggestions based on current conditions.
- **Responsive interface:** Use the dashboard on desktop and mobile screens.
- **About page:** Review a brief overview of the app and its technologies.

Weather and city search use the public [Open-Meteo APIs](https://open-meteo.com/). The app shows current conditions, not hourly or multi-day forecasts.

## Tech stack

- [React 19](https://react.dev/) and [React DOM](https://react.dev/)
- [Vite](https://vite.dev/) for local development and production builds
- [Tailwind CSS 4](https://tailwindcss.com/) with the Vite plugin
- [React Router](https://reactrouter.com/) for client-side routing
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs) and [Geocoding API](https://open-meteo.com/en/docs/geocoding-api) for weather and location data

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- npm (included with Node.js)
- An internet connection to access the Open-Meteo APIs
- A modern browser; location access requires permission and a secure context (HTTPS, or localhost during development)

### Installation

1. Clone the repository and move into the project directory:

   ```bash
   git clone https://github.com/hasanalmahmud2024/cast-kit-weather-app.git
   cd cast-kit-weather-app
   ```

2. Install the dependencies from the lockfile:

   ```bash
   npm ci
   ```

   `npm ci` installs the exact dependency versions recorded in the lockfile. If you change dependencies, use `npm install` to update the lockfile.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`) in your browser.

### Environment variables

No environment variables are required. The app requests data directly from Open-Meteo's public endpoints; no API key or `.env` file is needed.

## Usage

1. On the home page, choose a popular Bangladesh city or select **Search Weather**.
2. Search by city name, or select the location button and allow browser location access.
3. Review the current conditions, atmospheric metrics, and recommendations on the weather page.
4. Use **Search Location** to look up another city, or use the footer to return home or open the About page.

City searches use the first matching result returned by Open-Meteo. If location permission is denied or unavailable, search by city instead. The `/weather` page expects a location selected through the app.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Serve the production build locally for verification. |
| `npm run lint` | Run ESLint on the project. |

## Project structure

```text
.
├── public/                  # Static public assets, including the favicon
├── src/
│   ├── assets/               # App assets
│   ├── components/           # Shared UI and weather display components
│   ├── hooks/                # Reusable React hooks
│   ├── layouts/              # Shared page layouts
│   ├── pages/                # Home, weather, and About pages
│   ├── services/             # Open-Meteo requests and recommendation logic
│   ├── utils/                 # Weather theme helpers
│   ├── Router.jsx             # Client-side route definitions
│   ├── index.css              # Global styles and Tailwind entry point
│   └── main.jsx               # React application entry point
├── index.html
├── package.json
├── package-lock.json
├── vercel.json                # SPA rewrite configuration for Vercel
└── vite.config.js
```

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to a static hosting provider. Configure the host to serve `index.html` for client-side routes such as `/about` on direct visits. The included `vercel.json` provides this rewrite for Vercel.

## Attribution

- Weather observations and city geocoding are provided by [Open-Meteo](https://open-meteo.com/). Review the [Open-Meteo terms](https://open-meteo.com/en/terms) and [data attribution guidance](https://open-meteo.com/en/license) when using or redistributing data.
- Icons are from [Lucide](https://lucide.dev/).
- The interface uses React, Vite, Tailwind CSS, React Router, and Framer Motion; see the linked project sites above for their respective licenses and notices.

## License

This repository does not currently include a `LICENSE` file, so no project-wide open-source license has been declared. Obtain permission from the relevant rights holders before redistributing or reusing this project's source. Third-party dependencies and Open-Meteo data are subject to their own license and attribution terms.
