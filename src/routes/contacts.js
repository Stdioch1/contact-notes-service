const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// ✅ GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// ✅ Create a new contact
router.post('/', async (req, res) => {
  try {
    const contact = await prisma.contact.create({ data: req.body });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create contact' });
  }
});

// ✅ GET contact by ID
router.get('/:id', async (req, res) => {
  const contact = await prisma.contact.findUnique({ where: { id: Number(req.params.id) } });

  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  res.json(contact);
});

// ✅ Update contact
router.put('/:id', async (req, res) => {
  const updated = await prisma.contact.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(updated);
});

// ✅ Delete contact
router.delete('/:id', async (req, res) => {
  await prisma.contact.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(204);
});

module.exports = router;