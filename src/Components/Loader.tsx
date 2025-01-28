import CircularProgress from "@mui/material/CircularProgress"

export function Loader() {
  return (
    <div
      style={{
        marginBottom: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "initial",
        height: "10vh",
      }}
    >
      <CircularProgress size={40} />
    </div>
  )
}
