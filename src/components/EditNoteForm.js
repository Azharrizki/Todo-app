import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, TextArea } from "./ui/Form";
import Button from "./ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import getLocalstorage from "../utils/getLocalstorage";

const EditNoteForm = () => {
	/* 
	Code untuk custom Hooks dari package react-router-dom
	untuk mendapatkan alamat dari page yang sedang diakses
	*/
	const location = useLocation();

	/* 
	Custom hooks dari package react-router-dom
	dapat digunakan untuk navigasi ke page atau component yang lain
	*/
	const navigate = useNavigate();

	/*
	Mengambil seluruh data di localstorage kemudiaan data disimpan ke dalam state bernama allNotes untuk selanjutnya mengganti yang lama.
	*/
	const [allNotes, setAllNotes] = useState(null);
	const [currentNote, setCurrentNote] = useState({ title: "", note: "" });

	// const [state, setState] = useState({ title: "", note: "" });

	/* 
	Proses pengambilan data dilakukan setelah DOM diupdate
	oleh karena itu kita menggunakan useEffect()
	*/
	useEffect(() => {
		const notes = getLocalstorage("notes");

		setAllNotes(notes);

		// Mengambil noteId dari path yang sedang diakses
		const noteId = location.pathname.replace("/edit/", "");

		// Mengambil data note yang akan diedit
		const currentNote = notes.filter((note) => note.id === noteId);

		// Simpan data note ke state
		setCurrentNote(currentNote[0]);
	}, []);

	const handleTitleChange = (e) => {
		setCurrentNote({ ...currentNote, title: e.target.value });
	};

	const handleNoteChange = (e) => {
		setCurrentNote({ ...currentNote, note: e.target.value });
	};

	const handleSubmit = (e) => {
		// Update data notes
		const newNotes = allNotes.map((note) => {
			if (note.id === currentNote.id) {
				return {
					...note,
					title: currentNote.title,
					note: currentNote.note,
				};
			} else {
				return note;
			}
		});

		// Replace data notes yang lama di local storage
		localStorage.setItem("notes", JSON.stringify(newNotes));

		e.preventDefault();

		navigate("/");

		window.alert("Selamat data berhasil diubah!");
	};

	const handleDeleteNote = () => {
		/*
		Daripada menghapus note dari data notes lama 
		kita membuat array baru berisi notes tanpa memasukan note yang dihapus
		*/
		const newNotes = allNotes.filter((note) => note.id !== currentNote.id);

		// Mengosongkan state setelah dihapus
		setCurrentNote(null);

		// Simpan data notes baru ke state AllNotes
		setAllNotes(newNotes);

		// Update data di localstorage
		localStorage.setItem("notes", JSON.stringify(newNotes));

		// navigasi ke page home setelah dihapus
		navigate("/");

		window.alert("Selamat note berhasil dihapus!");
	};

	const { title, note } = currentNote;

	return (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<Label>Title</Label>
				<Input
					type="text"
					name="title"
					value={title}
					onChange={handleTitleChange}
				/>
			</FormGroup>
			<FormGroup>
				<Label>Note</Label>
				<TextArea
					name="note"
					rows="12"
					value={note}
					onChange={handleNoteChange}
				/>
			</FormGroup>
			<FormGroup>
				<Button type="submit">Simpan</Button>
				<Button danger onClick={handleDeleteNote}>
					Delete
				</Button>
			</FormGroup>
		</Form>
	);
};

export default EditNoteForm;
