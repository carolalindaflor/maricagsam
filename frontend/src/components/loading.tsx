import * as React from "react";
// CSS is handled by the bundler; TypeScript has no declaration for this side-effect import.
// @ts-expect-error
import "./loading.css";

export default function Loading() {
  return React.createElement(
    "div",
    { className: "loading-screen" },
    React.createElement(
      "div",
      { className: "loading-content" },
      React.createElement("img", {
        src: "/assets/logo.jpeg",
        alt: "GSAM Maricá",
        className: "loading-logo",
      }),
      React.createElement("div", { className: "loading-spinner" }),
      React.createElement("h1", null, "GSAM"),
      React.createElement("p", null, "Maricá"),
      React.createElement("span", null, "Acolher • Integrar • Conectar")
    )
  );
}