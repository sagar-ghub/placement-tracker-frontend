import React from "react";
import { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import apis from "../api/api";
import { BarChart } from "./Charts/BarChart";
import Spin from "./Spinner";

export default function Company({ isLoading, setLoading }) {
  const [company, setCompany] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Students",
        data: [],
        backgroundColor: [],
      },
    ],
  });
  useEffect(() => {
    async function getdata() {
      try {
        setLoading(true);
        let { data } = await apis.getCompanies();
        setCompany(data);
        let labels = [];
        let data1 = [];
        data.forEach((c) => {
          labels.push(c.name);
          data1.push(c.ctc);
        });
        setChartData({
          labels: [...labels],
          datasets: [
            {
              label: "Students",
              data: [...data1],
              backgroundColor: [
                "rgba(153, 102, 255, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
      // console.log(data);
    }
    getdata();
  }, []);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [formData, setFormData] = useState({
    student: "",
    status: 0,
  });
  const [modalLoading, setModalLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    // setModalData({company:id});
    setShow(true);
    console.log(id);
    setModalLoading(true);
    const { data } = await apis.getUnregisteredCandidates(id._id);
    setModalData({ company: id, students: data });
    setModalLoading(false);
  };
  const handleModalChange = ({ key, value }) => {
    setFormData({ ...formData, [key]: value });
    // const { data } = await apis.getCompanyResultById(id);
    // console.log(data);
    // setModalData({ ...modalData, studentDetails: data });
  };
  const handleModalSubmit = async () => {
    // e.preventDefault();
    // console.log(formData);
    let obj = {
      student: formData.student,
      status: formData.status,
      company: modalData.company._id,
    };
    console.log(obj);
    setLoading(true);
    const { data } = await apis.addStudentToCompany(obj);
    setLoading(false);
    console.log(data);
    handleClose();
  };

  return (
    <div>
      <Row>
        <Col md={10} className="heading_tag">
          <span>Companies </span>
        </Col>
        <Col md={2}>
          <Button as={Link} to={"/addcompany"}>
            Add Company
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Spin />
      ) : (
        <Row>
          <Col md={8}>
            <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>website</th>
                  <th>CTC</th>
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
                      <td>{c.website}</td>
                      <td>{c.ctc}</td>
                      <td>
                        <Button as={Link} to={`/company/${c._id}`}>
                          View
                        </Button>
                        <Button variant="primary" onClick={() => handleShow(c)}>
                          Add{" "}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <BarChart data={chartData} />
          </Col>
        </Row>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Company : {modalData?.company?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Add Student</Form.Label>
            {/* <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            /> */}
            {modalLoading ? (
              <>
                <br />
                <Spinner animation="border" role="status" />
              </>
            ) : (
              <>
                <Form.Select
                  value={formData.student}
                  onChange={(e) =>
                    handleModalChange({ key: "student", value: e.target.value })
                  }
                >
                  <option>Choose Student</option>
                  {modalData?.students?.map((s) => {
                    return <option value={s?._id}>{s?.name}</option>;
                  })}
                </Form.Select>
                <Form.Select
                  //  value={modalData?.studentDetails?.status || 0}
                  value={formData?.status}
                  onChange={(e) =>
                    handleModalChange({ key: "status", value: e.target.value })
                  }
                >
                  <option>Choose Status</option>
                  <option value={0}>Applied</option>
                  <option value={1}>Selected</option>
                  <option value={2}>Rejected</option>
                  <option value={3}>Pending</option>
                </Form.Select>
              </>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              handleModalSubmit();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
