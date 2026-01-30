// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// // import FuelProvider from "./pages/Context/FuelContext.jsx";

// import { FuelProvider } from "./pages/context/FuelContext";

// import "./index.css"; 

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <FuelProvider>
//       <App />
//     </FuelProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FuelProvider } from "./pages/context/FuelContext";
import { MusicProvider } from "./pages/context/MusicContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FuelProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </FuelProvider>
  </React.StrictMode>
);
