import React from "react";
import PageLayout from "../layout/PageLayout";
import Container from "../components/ui/Container";
import AddNoteForm from "../components/AddNoteForm";
import { Link } from "react-router-dom";

const AddPage = () => {
	return (
		<>
			<PageLayout>
				<Container>
					<div>
						<h4>
							<Link to="/">Home</Link> / Add
						</h4>
					</div>
					<h1>Add New Note</h1>
					<AddNoteForm />
				</Container>
			</PageLayout>
		</>
	);
};

export default AddPage;
