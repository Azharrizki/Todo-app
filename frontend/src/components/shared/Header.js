import React from "react";
import styled from "styled-components";
import logo from "../../assets/image/logo-black.png";

const Container = styled.div`
	margin: 1rem;
	padding: 0.5rem;
`;

const Header = () => {
	return (
		<Container>
			<img src={logo} alt="Logo" />
			<h1>DinoTes App</h1>
		</Container>
	);
};

export default Header;
