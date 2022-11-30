import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Table } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import apis from "../api/api";
import Spin from "./Spinner";

export default function CompanyDetails({ isLoading, setLoading }) {
  const [company, setCompany] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    async function getdata() {
      setLoading(true);

      let { data } = await apis.getCompanyResultById(id);
      console.log(data);
      setCompany(data[0]);
      setLoading(false);
    }
    getdata();
  }, []);
  return (
    <div className="row">
      <Col md={12} className="heading_tag">
        <span>Company Details</span>
      </Col>
      <Col md={8}>
        {isLoading ? (
          <Spin />
        ) : (
          <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th> Name</th>
                <th>Regd No.</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {company &&
                company?.students?.map((c, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c.student.name}</td>
                      <td>{c.student.registrationNo}</td>
                      <td>{c.student.email}</td>
                      <td>{c.student.phone}</td>
                      <td>{c.status}</td>
                      <td>
                        <Button as={Link} to={`/student/${c.student._id}`}>
                          View
                        </Button>
                        {/* <Button variant="primary" >
                        Add{" "}
                      </Button> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </Col>
      <Col md={4}>
        {company && (
          //TODO

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{company.name}</Card.Title>

              <h3>{company.website}</h3>
              <p>{company.ctc}</p>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        )}
      </Col>
    </div>
  );
}
