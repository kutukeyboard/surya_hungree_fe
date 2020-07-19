import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import headers from "./headers";

import { useHistory, withRouter } from "react-router-dom";
import { usePersisted } from "./usePersisted";

const categoryDetailSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
});
const CategoryDetail = () => {
	const [categoryData, setCategoryData] = usePersisted();
	const [categoryId, setCategoryId] = usePersisted();
	const history = useHistory();

	useEffect(() => {
		if (history.location.search) {
			const myId = history.location.search.replace("?id=", "");
			setCategoryId(myId);
			axios
				.get(
					"https://hungree-surya.web.app/api/productcategory/" + myId,
					headers(localStorage.getItem("token"))
				)
				.then((res) => {
					console.log(res.data);
					setCategoryData(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return (
		<div className="page-wrap">
			<h1>Category Detail </h1>
			<Formik
				enableReinitialize
				initialValues={{
					name: categoryData && categoryData.name,
				}}
				validationSchema={categoryDetailSchema}
				onSubmit={(values) => {
					if (categoryData) {
						axios
							.patch(
								"https://hungree-surya.web.app/api/productcategory/" +
									categoryId,
								{ name: values.name, isDeleted: false },
								headers(localStorage.getItem("token"))
							)
							.catch((err) => {
								console.log(err);
							});
					} else {
						axios
							.post(
								"https://hungree-surya.web.app/api/productcategory",
								{ name: values.name, isDeleted: false },
								headers(localStorage.getItem("token"))
							)
							.catch((err) => {
								console.log(err);
							});
					}
					history.push("/category");
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<label>Category Name</label>
						<Field name="name" className="input-block" />
						{errors.name && touched.name ? <div>{errors.name}</div> : null}

						<button type="submit" className="btn-save ">
							Save
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default withRouter(CategoryDetail);
