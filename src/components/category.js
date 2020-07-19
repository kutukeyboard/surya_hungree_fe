import React, { useEffect } from "react";
import axios from "axios";
import headers from "./headers";

import { usePersisted } from "./usePersisted";
import { useHistory, withRouter } from "react-router-dom";

const Category = () => {
	const [categoryData, setCategoryData] = usePersisted();
	const history = useHistory();

	const getData = () => {
		axios
			.get(
				"https://hungree-surya.web.app/api/productcategory",
				headers(localStorage.getItem("token"))
			)
			.then((res) => {
				setCategoryData(res.data);
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
			<h1>Category</h1>
			<button
				className="btn-edit"
				onClick={() => {
					history.push("/categorydetail/");
				}}
			>
				Add New
			</button>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{categoryData &&
						categoryData.map((r, i) => {
							return (
								<tr key={`tr${i}`}>
									<td key={`tdname${i}`}>{r.name}</td>
									<td key={`tdb${i}`}>
										<button
											key={`btne${i}`}
											className="btn-edit"
											onClick={() => {
												history.push(`/categorydetail?id=${r.id}`);
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
														"https://hungree-surya.web.app/api/productcategory/" +
															r.id,
														{ name: r.name, isDeleted: true },
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

export default withRouter(Category);
