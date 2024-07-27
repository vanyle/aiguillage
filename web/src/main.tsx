import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { OpenAPI as OpenAPIConfig } from "../openapi/requests/core/OpenAPI";
import App from "./App";
import "./index.css";

// Configure the API
OpenAPIConfig.BASE = location.origin;

// Render the app
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
