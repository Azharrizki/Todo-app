import HomePage from "./pages/Home";
import "./App.css";
import AddPage from "./pages/Add";
import styled from "styled-components";
import EditPage from "./pages/Edit";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Container = styled.div`
	text-align: center;
`;

function App() {
	return (
		<Container>
			<Routes>
				<Route path="/add" element={<AddPage />} />
				{/* Menerima paramameter Id */}
				<Route path="/edit/:id" element={<EditPage />} />
				<Route path="/" element={<HomePage />} />
			</Routes>
		</Container>
	);
}

export default App;
