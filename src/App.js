import React, { useEffect } from "react";

import {
	Route,
	useHistory,
	BrowserRouter as Router,
	Switch,
	withRouter,
} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Category from "./components/category";
import Product from "./components/product";

import Navbar from "./components/navbar";

const App = () => {
	const history = useHistory();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			history.push("/login");
		}
	}, []);

	return (
		<div>
			{localStorage.getItem("token") && <Navbar />}
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/category" component={Category} />
				<Route path="/product" component={Product} />
			</div>
		</div>
	);
};

export default withRouter(App);
