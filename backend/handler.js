const { ObjectId } = require("mongodb");

exports.addNote = async (req, res, next) => {
	const { notesCollection } = req.app.locals;
	const { title } = req.body;

	try {
		// Melakukan pengecekan jika tidak ada title maka akan mengembalikan pesan error
		if (!title) {
			throw new Error("Title is empty");
		}

		// Dan jika ada title maka sistem akan menyimpan data ke collection notes
		const result = await notesCollection.insertOne(req.body);

		console.log(result);

		// kirim status dan pesan dalam format json ke client
		res.status(200).json("Data successfully saved");
	} catch (error) {
		next(error);
	}
};

exports.getAllNote = async (req, res, next) => {
	const { notesCollection } = req.app.locals;

	try {
		// mengubah document menjadi sebuah array agar lebih mudah dibaca
		const result = await notesCollection.find().toArray();

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

exports.getNote = async (req, res, next) => {
	const { notesCollection } = req.app.locals;

	try {
		// Req.params digunakan untuk mendapatkan parameter yang ada di url
		const result = await notesCollection.findOne({
			_id: ObjectId(req.params.id),
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

exports.updateNote = async (req, res, next) => {
	const { notesCollection } = req.app.locals;

	try {
		// Melakukan update pada sebuah data collection
		const result = await notesCollection.updateOne(
			{ _id: ObjectId(req.params.id) },
			{
				$set: {
					title: req.body.title,
					note: req.body.note,
				},
			},
		);
		console.log(result);

		res.status(200).json("Data successfully updated");
	} catch (error) {
		next(error);
	}
};

exports.deleteNote = async (req, res, next) => {
	const { notesCollection } = req.app.locals;

	try {
		// Menghapus salah satu data pada collection notes bedasarkan path id
		const result = await notesCollection.deleteOne({
			_id: ObjectId(req.params.id),
		});

		console.log(result);

		res.status(200).json("Data successfully deleted");
	} catch (error) {
		next(error);
	}
};
