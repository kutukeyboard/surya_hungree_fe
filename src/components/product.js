import React, { useEffect } from "react";
import axios from "axios";
import headers from "./headers";

import { usePersisted } from "./usePersisted";
import { useHistory, withRouter } from "react-router-dom";

const Product = () => {
	const [productData, setProductData] = usePersisted();
	const history = useHistory();

	const getData = () => {
		axios
			.get(
				"https://hungree-surya.web.app/api/product",
				headers(localStorage.getItem("token"))
			)
			.then((res) => {
				setProductData(res.data);
			})
			.catch((err) => {
				if (err.response.status === 400) {
					history.push("/login");
				}
			});
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className="page-wrap">
			<h1>Product</h1>
			<button
				className="btn-edit"
				onClick={() => {
					history.push("/productdetail/");
				}}
			>
				Add New
			</button>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Category</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{productData &&
						productData.map((r, i) => {
							return (
								<tr key={`tr${i}`}>
									<td key={`tdname${i}`}>{r.name}</td>
									<td key={`tdprice${i}`}>{r.price}</td>
									<td key={`tdcat${i}`}>{r.category}</td>
									<td key={`tdb${i}`}>
										<button
											key={`btne${i}`}
											className="btn-edit"
											onClick={() => {
												history.push(`/productdetail?id=${r.id}`);
											}}
										>
											Edit
										</button>
										<button
											key={`btnd${i}`}
											className="btn-delete"
											onClick={() => {
												axios
													.patch(
														"https://hungree-surya.web.app/api/product/" + r.id,
														{
															name: r.name,
															price: r.price,
															category: r.category,
															isDeleted: true,
														},
														headers(localStorage.getItem("token"))
													)
													.then((data) => {
														window.location.reload();
													})
													.catch((err) => {
														console.log(err.response.status);
														if (err.response.status === 400) {
															history.push("/login");
														}
													});
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default withRouter(Product);
