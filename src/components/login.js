import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { useHistory, withRouter } from "react-router-dom";

const loginSchema = Yup.object().shape({
	email: Yup.string().required("Required"),
	password: Yup.string().required("Required"),
});

const Login = () => {
	const history = useHistory();

	return (
		<div>
			<div className="login-wrap">
				<h2 className="login-header">Login</h2>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={loginSchema}
					onSubmit={(values) => {
						axios
							.post("https://hungree-surya.web.app/api/user/login", {
								email: values.email,
								password: values.password,
							})
							.then((res) => {
								console.log(res.data);
								if (res.data.token) {
									localStorage.clear();
									localStorage.setItem("token", res.data.token);
									history.push("/");
								}
							})
							.catch((err) => {
								console.log(err);
							});
						console.log(values);
					}}
				>
					{({ errors, touched }) => (
						<Form>
							<label>Email</label>
							<Field name="email" className="input-block" />
							{errors.email && touched.email ? <div>{errors.email}</div> : null}
							<label>Password</label>
							<Field name="password" className="input-block" type="password" />
							{errors.password && touched.password ? (
								<div>{errors.password}</div>
							) : null}
							<button type="submit" className="input-btn ">
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default withRouter(Login);
