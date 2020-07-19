import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="nav">
			<input type="checkbox" id="nav-check" />
			<div className="nav-header">
				<div className="nav-title">Hungree - Surya</div>
			</div>
			<div className="nav-btn">
				<label htmlFor="nav-check">
					<span></span>
					<span></span>
					<span></span>
				</label>
			</div>

			<div className="nav-links">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/category">Category</NavLink>
				<NavLink to="/product">Product</NavLink>
				<NavLink
					to="/login"
					onClick={() => {
						localStorage.clear();
					}}
				>
					Logout
				</NavLink>
			</div>
		</div>
	);
};

export default NavBar;
