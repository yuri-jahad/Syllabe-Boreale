 import { css } from "~styled-system/css";

export const ListsGalleryCSS = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5",
  borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
  borderTop: "1px solid rgba(148, 163, 184, 0.2)",
  padding: "16px 24px",
  width: "80vw",
  right: "2.5vw",
  marginTop:"20px"
});

export const ListCSS = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "8px 16px",
  width: "120px",
  height: "34px",
  fontSize: "13px",
  fontWeight: "500",
  letterSpacing: "0.025em",
  color: "#f1f5f9",
  background: "rgba(15, 23, 42, 0.95)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",

  _before: {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.1), transparent)",
    transition: "left 0.5s ease",
  },

  _hover: {
    borderColor: "rgba(56, 189, 248, 0.4)",
    boxShadow:
      "0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(56, 189, 248, 0.1)",
    transform: "translateY(-1px)",
    color: "#ffffff",

    "&::before": {
      left: "100%",
    },
  },

  _active: {
    transform: "translateY(0)",
  },
});

// Variante pour l'élément sélectionné
export const ListSelectedCSS = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "8px 16px",
  width: "120px",
  height: "34px",
  fontSize: "13px",
  fontWeight: "500",
  letterSpacing: "0.025em",
  color: "#ffffff",
  background: "rgba(56, 189, 248, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(56, 189, 248, 0.6)",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(56, 189, 248, 0.2)",

  _before: {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.2), transparent)",
    transition: "left 0.5s ease",
  },

  _hover: {
    borderColor: "rgba(56, 189, 248, 0.8)",
    boxShadow:
      "0 6px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(56, 189, 248, 0.3)",
    transform: "translateY(-2px)",

    "&::before": {
      left: "100%",
    },
  },

  _active: {
    transform: "translateY(0)",
  },
});