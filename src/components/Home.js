import React, { useEffect, useRef, useState } from "react";

import { Chart, Line } from "react-chartjs-2";
import apis from "../api/api";
import { BarChart } from "./Charts/BarChart";
import DoughNut from "./Charts/DoughNut";
const { Row, Col } = require("react-bootstrap");

export default function Home({ isLoading, setLoading }) {
  const [students, setStudents] = useState([]);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    async function getdata() {
      setLoading(true);
      console.log(isLoading);

      try {
        let { data } = await apis.getStudents();
        let { data: company } = await apis.getCompanies();
        console.log(data, company);
        setStudents(data);
        setCompany(company);
        setLoading(false);
        setData({
          labels: [
            "Students",
            "Company",
            "Yellow",
            "Green",
            "Purple",
            "Orange",
          ],
          datasets: [
            {
              label: "# of Votes",
              data: [data.length, company.length],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
            },
          ],
        });

        let labels = [];
        let data1 = [];
        company.forEach((c) => {
          labels.push(c.name);
          data1.push(c.students.length);
        });
        setData2({
          labels: [...labels],
          datasets: [
            {
              label: "Students",
              data: [...data1],
              backgroundColor: [
                "rgba(53, 162, 235, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
            },
          ],
        });
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }

    getdata();
  }, []);
  const [data, setData] = useState({
    labels: ["Students", "Company", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [100, 200],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  });

  const [data2, setData2] = useState({
    labels: ["Students", "Company", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [100, 200],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="text-align-center" style={{ textAlign: "center" }}>
        <Row>
          <Col md={6}>
            <DoughNut data={data} />
          </Col>
          <Col md={6}>
            <BarChart data={data2} />
          </Col>
        </Row>
      </div>
    );
}
