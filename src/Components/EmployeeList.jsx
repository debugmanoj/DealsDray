import React, { useEffect, useState } from "react";
import AxiosService from "../utils/AxiosService";
import Container from "react-bootstrap/Container";
import AdminApiRoutes from "../utils/AdminApiRoutes";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function EmployeeList() {
  let navigate = useNavigate();
  let [employee, setEmployee] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");

  let getAllUser = async () => {
    try {
      let result = await AxiosService.get(`${AdminApiRoutes.getAllUser.path}`);
      if (result) {
        setEmployee(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleDelete = async (id) => {
    try {
      let handleDelete = await AxiosService.get(
        `${AdminApiRoutes.DeleteSpecificUser.path}/${id}`
      );
      if (handleDelete) {
        alert("User Deleted Sucessfully");
      }
    } catch (error) {}
  };
  const filteredEmployees = employee.filter((emp) => {
    return (
      emp.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof emp.Mobile === "string" &&
        emp.Mobile.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link></Nav.Link>
              <Nav.Link></Nav.Link>
              <Nav.Link></Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link>Total Count :<span className="fw-bold">{employee.length}</span> </Nav.Link>
              <Nav.Link>Search</Nav.Link>
              <Nav.Link>
                <input
                  type="text"
                  placeholder="Search by Name, Email, or Mobile"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Table hover size="sm" responsive="lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Desingation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((val, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <div className="tableImage">
                    <img
                      src={val.image}
                      alt={`Food ${val.id}`}
                      style={{ maxWidth: "100px", maxHeight: "100px" }} // Set maximum width and height
                    />
                  </div>
                </td>
                <td>{val.Name}</td>
                <td>{val.Email}</td>
                <td>{val.Mobile}</td>
                <td>{val.Designation}</td>
                <td>{val.Gender}</td>
                <td>{val.Course.join(" , ")}</td>
                <td>{val.createdAt}</td>
                <td>
                  <div>
                    <span>
                      <a
                        onClick={() => navigate(`/Edit/${val._id}`)}
                        className="btn btn-primary"
                      >
                        Edit
                      </a>
                    </span>
                    <span>
                      <a
                        onClick={() => handleDelete(val._id)}
                        className="btn btn-danger mx-3"
                      >
                        Delete
                      </a>
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default EmployeeList;
