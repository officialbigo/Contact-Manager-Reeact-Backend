const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc Add contact
//@route POST /api/contacts
//@access private
const postContact = asyncHandler(async (req, res) => {
  const { name, number, email } = req.body;
  if (!name || !number || !email) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contacts = await Contact.create({
    name: name,
    number: number,
    email: email,
    user_id: req.user.id,
  });
  res.status(201).json(contacts);
});

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Get contact with id
//@route GET /api/contacts/:id
//@access private
// const getContactById = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("not found");
//   }
//   res.status(200).json(contact);
// });

//@desc Update contact with id
//@route PUT /api/contacts/:id
//@access private
const updateContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "user doset have permission to update contacts of other user"
    );
  }
  const newContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(newContact);
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@access private
const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  //Not needed from here
  if (!contact) {
    res.status(404);
    throw new Error("Not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "user doset have permission to update contacts of other user"
    );
  }
  // till here
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts
//@access private
// const deleteAllContacts = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: `delete all contacts` });
// });

module.exports = {
  postContact,
  getAllContacts,
  // getContactById,
  updateContactById,
  deleteContactById,
  // deleteAllContacts,
};
