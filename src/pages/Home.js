import React from "react";
import PageLayout from "../layout/PageLayout";
import NotesList from "../components/NotesList";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<Container>
			<PageLayout>
				<Link to="/add">
					<Button>Add New Note</Button>
				</Link>
				<NotesList>Notes List</NotesList>
			</PageLayout>
		</Container>
	);
};

export default HomePage;
