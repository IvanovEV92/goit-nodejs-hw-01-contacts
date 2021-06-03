const fs = require('fs').promises;
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath, 'utf8');

		const list = JSON.parse(data);

		return console.table(list);
	} catch (error) {
		console.error(error.message);
	}
}

async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath, 'utf8');
		const contacts = JSON.parse(data);

		const contact = contacts.filter(
			contact => contact.id === Number(contactId),
		);

		return console.table(contact);
	} catch (error) {
		console.error(error.message);
	}
}

async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath, 'utf8');
		const contacts = JSON.parse(data);

		const newContacts = contacts.filter(contact => contact.id != contactId);

		await fs.writeFile(contactsPath, JSON.stringify(newContacts));

		console.table(newContacts);
		console.log('Successfully deleted');
	} catch (error) {
		console.error(error.message);
	}
}

async function addContact(name, email, phone) {
	const newContact = {
		id: uuidv4(),
		name,
		email,
		phone,
	};

	try {
		const data = await fs.readFile(contactsPath, 'utf8');
		const parsedContacts = JSON.parse(data);

		const contacts = [...parsedContacts, newContact];

		await fs.writeFile(contactsPath, JSON.stringify(contacts));

		console.table(contacts);
		console.log('Successfully added');
	} catch (error) {
		console.error(error.message);
	}
}

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
};
