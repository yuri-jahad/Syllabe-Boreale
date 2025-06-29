import { css } from "~styled-system/css";

export const chartStyles = {
  container: css({
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, slate.50, blue.50)",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  chartWrapper: css({
    background: "white",
    borderRadius: "24px",
    boxShadow: "xl",
    border: "1px solid",
    borderColor: "slate.100",
    overflow: "hidden",
  }),

  chartContent: css({
    padding: "2rem",
  }),

  header: css({
    textAlign: "center",
    marginBottom: "2rem",
  }),

  title: css({
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "slate.900",
    marginBottom: "0.5rem",
  }),

  subtitle: css({
    color: "slate.600",
    fontSize: "1.125rem",
  }),

  chartContainer: css({
    position: "relative",
    height: "600px",
  }),

  statsBox: css({
    position: "absolute",
    top: "4rem",
    right: "2rem",
    background: "slate.50",
    border: "1px solid",
    borderColor: "slate.200",
    borderRadius: "12px",
    padding: "1rem",
    width: "13rem",
  }),

  statItem: css({
    marginBottom: "1rem",
  }),

  statLabel: css({
    color: "slate.600",
    fontSize: "0.75rem",
    fontWeight: "medium",
    textTransform: "uppercase",
    letterSpacing: "wide",
  }),

  statValue: css({
    color: "slate.900",
    fontSize: "1.5rem",
    fontWeight: "bold",
  }),

  statSubtext: css({
    color: "slate.500",
    fontSize: "0.875rem",
  }),

  tooltip: css({
    background: "slate.900",
    color: "white",
    padding: "0.75rem",
    borderRadius: "8px",
    boxShadow: "lg",
    border: "1px solid",
    borderColor: "blue.500",
  }),

  tooltipTitle: css({
    color: "slate.300",
    fontSize: "0.875rem",
    fontWeight: "medium",
  }),

  tooltipValue: css({
    color: "white",
    fontSize: "1.125rem",
    fontWeight: "bold",
  }),

  loading: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "24rem",
    color: "slate.600",
  }),

  error: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "24rem",
    color: "red.600",
  }),
};
