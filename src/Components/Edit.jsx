import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosService from "../utils/AxiosService";
import AdminApiRoutes from "../utils/AdminApiRoutes";
import { useFormik } from "formik";

import * as Yup from "yup";
import AdminHome from "./AdminHome";
function Edit() {
  let naviagte = useNavigate();
  let { id } = useParams();
  let [values, setValues] = useState();
  let fetchSpecificDetails = async () => {
    try {
      let updateUser = await AxiosService.get(
        `${AdminApiRoutes.getSpecificUser.path}/${id}`
      );
      if (updateUser) {
        setValues(updateUser.data);
      }
    } catch (error) {}
  };
  let handleImageUpload = async (values) => {
    try {
      const formData = new FormData();

      formData.append("image", values.image);

      for (const key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        }
      }

      if (formData) {
        const res = await AxiosService.post(
          `${`${AdminApiRoutes.UpdateTheSpecificUser.path}/${id}`}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (res.status == 200) {
          if (res.data) {
            alert("User Updated Successfully");
            naviagte("/adminHome/EmployeeList");
          }
        }
      } else {
        alert("Internal Server Error");
      }
    } catch (error) {
      alert("Internal Server Error");
      // Handle error appropriately
    }
  };
  useEffect(() => {
    fetchSpecificDetails();
  }, []);
  const formik = useFormik({
    initialValues: {
      Name: values && values.Name,
      Email: values && values.Email,
      Mobile: values && values.Mobile,
      Designation: values && values.Designation,
      Gender: values && values.Gender,
      Course: "",
      MCA: false,
      BSC: false,
      BCA: false,
      image: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("Enter the  Name"),
      Email: Yup.string().email("Invalid email").required("Enter the Email"),
      Mobile: Yup.string().required("Enter the Mobile Number"),
      Designation: Yup.string().required("Select a Designation"),
      Gender: Yup.string().required("Select a Gender"),
      Course: Yup.array().min(1, "Select at least one course"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileType", "Only JPG and PNG files are allowed", (value) => {
          if (!value) return true; // No file selected, so no validation needed
          return value && ["image/jpeg", "image/png"].includes(value.type);
        }),
    }),
    onSubmit: (values) => {
      // console.log(values);

      let selectedCourse = [];
      if (values.MCA) selectedCourse.push("MCA");
      if (values.BSC) selectedCourse.push("BSC");
      if (values.BCA) selectedCourse.push("BCA");

      values.Course = selectedCourse;
      const { MCA, BCA, BSC, ...newValues } = values;

      handleImageUpload(newValues);
      // let a=dispatch(handleAddUser(values))
      // console.log(a);
    },
  });

  return (
    <>
      <h1 className="text-center">Edit Employee</h1>
      <div className="container mt-5 text-center">
        <form id="change" onSubmit={formik.handleSubmit}>
          <div className="form-group row mb-3">
            <label className="col-sm-2 col-form-label custom-label">Name</label>
            <div className="col-sm-10">
              <input
                name="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Name}
                type="text"
                className="form-control"
                id="Name"
                placeholder="Enter Name "
              />
              {formik.touched.Name && formik.errors.Name ? (
                <div style={{ color: "red" }}>{formik.errors.Name}</div>
              ) : null}
            </div>
            <div className="form-group row mt-3 ">
              <label className="col-sm-2 col-form-label custom-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  name="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Email}
                  type="text"
                  className="form-control"
                  id="Email"
                  placeholder="Enter Email "
                />
                {formik.touched.Email && formik.errors.Email ? (
                  <div style={{ color: "red" }}>{formik.errors.Email}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group row mt-3 ">
              <label className="col-sm-2 col-form-label custom-label">
                Mobile No
              </label>
              <div className="col-sm-10">
                <input
                  name="Mobile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Mobile}
                  type="text"
                  className="form-control"
                  id="Mobile"
                  placeholder="Enter Mobile "
                />
                {formik.touched.Mobile && formik.errors.Mobile ? (
                  <div style={{ color: "red" }}>{formik.errors.Mobile}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label custom-label">
                Designation
              </label>
              <div className="col-sm-10">
                <select
                  name="Designation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Designation}
                  className="form-control"
                  id="Designation"
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                  {/* Add more options as needed */}
                </select>
                {formik.touched.Designation && formik.errors.Designation ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.Designation}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label custom-label">
                Gender
              </label>
              <div className="col-sm-10 d-flex">
                <div>
                  <input
                    type="radio"
                    id="Male"
                    name="Gender"
                    value="Male"
                    checked={formik.values.Gender === "Male"}
                    onChange={(event) =>
                      formik.handleChange(event) &&
                      formik.setFieldValue(
                        "Gender",
                        event.target.value.charAt(0).toUpperCase() +
                          event.target.value.slice(1)
                      )
                    }
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="mx-5">
                  <input
                    type="radio"
                    id="Female"
                    name="Gender"
                    value="Female"
                    checked={formik.values.Gender === "Female"}
                    onChange={(event) =>
                      formik.handleChange(event) &&
                      formik.setFieldValue(
                        "Gender",
                        event.target.value.charAt(0).toUpperCase() +
                          event.target.value.slice(1)
                      )
                    }
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                {formik.touched.Gender && formik.errors.Gender ? (
                  <div style={{ color: "red" }}>{formik.errors.Gender}</div>
                ) : null}
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label custom-label">
                Courses
              </label>
              <div className="col-sm-10 d-flex">
                <div>
                  <input
                    type="checkbox"
                    id="MCA"
                    name="MCA"
                    value="MCA"
                    checked={formik.values.MCA}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="MCA">MCA</label>
                </div>
                <div className="mx-5">
                  <input
                    type="checkbox"
                    id="BSC"
                    name="BSC"
                    value="BSC"
                    checked={formik.values.BSC}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="BSC">BSC</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="BCA"
                    name="BCA"
                    value="BCA"
                    checked={formik.values.BCA}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="BCA">BCA</label>
                </div>
                {formik.touched.MCA && formik.errors.MCA ? (
                  <div style={{ color: "red" }}>{formik.errors.MCA}</div>
                ) : null}
                {formik.touched.BSC && formik.errors.BSC ? (
                  <div style={{ color: "red" }}>{formik.errors.BSC}</div>
                ) : null}
                {formik.touched.BCA && formik.errors.BCA ? (
                  <div style={{ color: "red" }}>{formik.errors.BCA}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label custom-label">
                Image Upload
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  id="image"
                  name="image"
                  // (event) => {formik.setFieldValue("image", event.currentTarget.files[0]);}
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image ? (
                  <div style={{ color: "red" }}>{formik.errors.image}</div>
                ) : null}
              </div>
              {/* <div>
    <a className='btn btn-primary' onClick={handleImageUpload}>Image Upload</a>
    </div> */}
            </div>
          </div>

          <div className="form-group row  mb-3">
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;
