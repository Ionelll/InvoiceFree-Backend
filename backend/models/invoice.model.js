const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
	{
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Client",
		},
		provider: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
		},
		issueDate: { type: Date, required: true },
		dueDate: { type: Date, required: true },
		vat: { type: String, required: true },
		currency: { type: String, required: true },
		total: { type: Number, required: true },

		invoiceNumber: { type: Number, required: true, unique: true },
		table: [
			{
				articol: { type: String, required: true },
				bucati: { type: String, required: true },
				pret: { type: String, require: true },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
