import React from "react";
import { Spinner } from "react-bootstrap";
export default function Spin() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Spinner
        animation="border"
        role="status"
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
}
