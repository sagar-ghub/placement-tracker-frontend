import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Table } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import apis from "../api/api";
import Spin from "./Spinner";

export default function StudentDetails({ isLoading, setLoading }) {
  const [student, setStudent] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    async function getdata() {
      setLoading(true);
      let { data } = await apis.getStudentById(id);
      console.log(data);
      setStudent(data[0]);
      setLoading(false);
    }
    getdata();
  }, []);
  return (
    <div className="row">
      <Col md={12} className="heading_tag">
        <span>Student Details</span>
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
                <th>Website</th>
                <th>CTC</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {student &&
                student?.companies?.map((c, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c.company.name}</td>
                      <td>{c.company.website}</td>
                      <td>{c.company.ctc}</td>
                      <td>{c.company.phone}</td>
                      <td>{c.status}</td>
                      <td>
                        <Button as={Link} to={`/company/${c.company._id}`}>
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
        {student && (
          //TODO

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{student.name}</Card.Title>

              <h3>{student.branch}</h3>
              <p>{student.age}</p>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        )}
      </Col>
    </div>
  );
}
