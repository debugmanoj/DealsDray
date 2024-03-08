import React, { useState } from "react";
import AxiosService from "../utils/AxiosService";
import AdminApiRoutes from "../utils/AdminApiRoutes";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
function Login() {
  let navigate = useNavigate();
  let [error, setError] = useState();
  const handleApiCheck = async (values) => {
    try {
      let response = await AxiosService.post(
        `${AdminApiRoutes.checkLogin.path}`,
        values
      );
      if (response) {
        if (response.data.authenticated) {
          sessionStorage.setItem("userName", response.data.userName);
          navigate("/adminHome/dashboard");
        }
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Enter the User Name"),
      password: Yup.string().required("Enter the password"),
    }),
    onSubmit: (values) => {
      handleApiCheck(values);
      // let a=dispatch(handleAddUser(values))
      // console.log(a);
    },
  });
  return (
    <>
      <h1 className="text-center">Login</h1>
      <div className="container mt-5 text-center">
        <form id="change" onSubmit={formik.handleSubmit}>
          <div className="form-group row mb-3">
            <label className="col-sm-2 col-form-label custom-label">
              User name
            </label>
            <div className="col-sm-10">
              <input
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                type="text"
                className="form-control"
                id="userName"
                placeholder="Enter user Name"
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div style={{ color: "red" }}>{formik.errors.userName}</div>
              ) : null}
            </div>
            <div className="form-group row mt-3 mb-3">
              <label className="col-sm-2 col-form-label custom-label">
                password
              </label>
              <div className="col-sm-10">
                <input
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password "
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="form-group row  mb-3">
           <div className="text-center">
           <button type="submit" className="btn btn-small btn-primary">
                Submit
              </button>
           </div>
              
           
          </div>
        </form>
      </div>
      <div className="text-center">
        <h6 style={{ color: "red" }}>{error}</h6>
      </div>
      <div className="mt-5 text-center">
        <h6>For Your Reference</h6>
        <p>Username: <span className="fw-bold">manoj</span></p>
        <p>password: <span className="fw-bold">admin</span></p>
        <small>Note : Only this credentials will work</small>
      </div>
    </>
  );
}

export default Login;
