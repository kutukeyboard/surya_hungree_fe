import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import headers from "./headers";

import { useHistory, withRouter } from "react-router-dom";
import { usePersisted } from "./usePersisted";

const productDetailSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	price: Yup.string().required("Required"),
	category: Yup.string().required("Required"),
});

const ProductDetail = () => {
	const [productData, setProductData] = usePersisted();
	const [productId, setproductId] = usePersisted();
	const [categoryData, setCategoryData] = usePersisted();

	const history = useHistory();

	useEffect(() => {
		if (history.location.search) {
			const myId = history.location.search.replace("?id=", "");
			setproductId(myId);
			axios
				.get(
					"https://hungree-surya.web.app/api/product/" + myId,
					headers(localStorage.getItem("token"))
				)
				.then((res) => {
					setProductData(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		axios
			.get(
				"https://hungree-surya.web.app/api/productcategory",
				headers(localStorage.getItem("token"))
			)
			.then((res) => {
				setCategoryData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="page-wrap">
			<h1>Product Detail </h1>
			<Formik
				enableReinitialize
				initialValues={{
					name: productData && productData.name,
					price: productData && productData.price,
					category: productData && productData.category,
				}}
				validationSchema={productDetailSchema}
				onSubmit={(values) => {
					if (productData) {
						axios
							.patch(
								"https://hungree-surya.web.app/api/product/" + productId,
								{
									name: values.name,
									price: values.price,
									category: values.category,
									isDeleted: false,
								},
								headers(localStorage.getItem("token"))
							)
							.catch((err) => {
								console.log(err);
							});
					} else {
						axios
							.post(
								"https://hungree-surya.web.app/api/product",
								{
									name: values.name,
									price: values.price,
									category: values.category,
									isDeleted: false,
								},
								headers(localStorage.getItem("token"))
							)
							.catch((err) => {
								console.log(err);
							});
					}
					history.push("/product");
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<label>Product Name</label>
						<Field name="name" className="input-block" />
						{errors.name && touched.name ? <div>{errors.name}</div> : null}

						<label>Price</label>
						<Field name="price" className="input-block" />
						{errors.price && touched.price ? <div>{errors.price}</div> : null}

						<label>Category</label>
						<Field as="select" name="category" className="input-block">
							{categoryData &&
								categoryData.map((r, i) => {
									return (
										<option value={r.name} key={i}>
											{r.name}
										</option>
									);
								})}
						</Field>
						{errors.category && touched.category ? (
							<div>{errors.category}</div>
						) : null}

						<button type="submit" className="btn-save ">
							Save
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default withRouter(ProductDetail);
