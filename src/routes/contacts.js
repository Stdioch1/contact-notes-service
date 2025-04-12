const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const contact = await prisma.contact.create({ data: req.body });
  res.json(contact);
});

router.get('/:id', async (req, res) => {
    const contact = await prisma.contact.findUnique({ where: { id: Number(req.params.id) } });
  
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
  
    res.json(contact);
  });

router.get('/:id', async (req, res) => {
  const contact = await prisma.contact.findUnique({ where: { id: Number(req.params.id) } });
  res.json(contact);
});

router.put('/:id', async (req, res) => {
  const updated = await prisma.contact.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await prisma.contact.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(204);
});

module.exports = router;
