import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const PageLayout = (props) => {
	const { children } = props;

	return (
		<>
			<Header />
			{/* special props children berfungsi untuk mewakili semua child component dari component PageLayout */}
			{children}
			<Footer />
		</>
	);
};

export default PageLayout;
