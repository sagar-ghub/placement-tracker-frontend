import React from "react";
import { useState, useEffect } from "react";
import { Button, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import apis from "../api/api";
import Spin from "./Spinner";

export default function Student({ isLoading, setLoading }) {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    async function getdata() {
      setLoading(true);
      console.log(isLoading);

      try {
        let { data } = await apis.getStudents();
        console.log(data);
        setCompany(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }

    getdata();
  }, []);

  return (
    <div>
      <Col md={12} className="heading_tag">
        <span>Students </span>
      </Col>
      {isLoading ? (
        <Spin />
      ) : (
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>Email</th>
              <th>Phone</th>
              {/* <th>Link</th> */}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {company?.map((c, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <Button as={Link} to={`/student/${c._id}`}>
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
