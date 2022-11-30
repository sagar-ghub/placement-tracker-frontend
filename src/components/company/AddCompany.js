import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spin from "../Spinner";

export default function AddCompany({ isLoading, setLoading }) {
  return (
    <div>
      <Col md={12} className="heading_tag">
        <span>Add Company </span>
      </Col>
      {isLoading ? (
        <Spin />
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Website</Form.Label>
            <Form.Control type="text" placeholder="Website" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>CTC</Form.Label>
            <Form.Control type="number" placeholder="Cost To Company" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>No of vacancies</Form.Label>
            <Form.Control
              type="number"
              placeholder="Vacancies in the company"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}
