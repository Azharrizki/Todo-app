import React, { useState } from "react";
import { Form, FormGroup, Label, Input, TextArea } from "./ui/Form";
import Button from "./ui/Button";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import getLocalstorage from "../utils/getLocalstorage";

const AddNoteForm = () => {
	// Membuat state untuk menyimpan data note, data note sendiri berupa object dengan properties title dan note
	const [state, setState] = useState({ title: "", note: "" });

	const navigate = useNavigate();

	// handleTitle atau handleNote adalah event handler untuk menyimpan data dari form input ke dalam state
	const handleTitleChange = (e) => {
		setState({ ...state, title: e.target.value });
	};

	const handleNoteChange = (e) => {
		setState({ ...state, note: e.target.value });
	};

	const handleSubmit = (e) => {
		/* 
		Ambil data 'notes' di dalam localstorage
		Simpan ke dalam variable bernama existing
		*/
		// let existing = localStorage.getItem("notes");

		/* 
		Cek jika sudah ada data bernama 'notes' didalam localStorage
		Jika ada maka gunakan method JSON.parse() untuk membaca datanya
		Hal ini dikarenakan localStorage hanya bisa menyimpan tipe data String
		Jika tidak ada data di dalam 'notes' maka buat array kosong []
		*/

		const notes = getLocalstorage("notes");

		/* 
		Setiap note harus memiliki id unik untuk membedakan dengan data note yang lain
		Kita bisa menggunakan package uuid dari npm
		untuk menginstallnya gunakan command => npm add uuid
		*/
		const noteId = uuidv4();

		// Tambahkan data note + noteId di dalam state ke array existing
		// existing[noteId] = state;
		notes.push({ id: noteId, ...state });

		/*
		Simpan data ke localStorage dengan command localStorage.setItem()
		Gunakan method JSON.stringfy() untuk mengubah object ke string
		karena localStorage hanya bisa menyimpan tipe data String
		*/
		localStorage.setItem("notes", JSON.stringify(notes));

		// Membiarkan react menghandle data yang disubmit
		e.preventDefault();

		navigate("/");

		window.alert("Selamat note berhasil ditambah");
	};

	const { title, note } = state;

	return (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<Label>Title:</Label>
				<Input
					type="text"
					name="title"
					value={title}
					onChange={handleTitleChange}
				/>
			</FormGroup>

			<FormGroup>
				<Label>Note:</Label>
				<TextArea
					type="text"
					name="note"
					rows={12}
					value={note}
					onChange={handleNoteChange}
				/>
			</FormGroup>
			<FormGroup>
				<Button type="submit">Add</Button>
			</FormGroup>
		</Form>
	);
};

export default AddNoteForm;
