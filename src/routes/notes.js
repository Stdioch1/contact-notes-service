const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

const normalizeNote = (data) => {
  return {
    title: data.title,
    body: data.note_body || data.note_text || data.body,
    contactId: Number(data.contactId),
  };
};

router.post('/', async (req, res) => {
  const data = normalizeNote(req.body);
  const note = await prisma.note.create({ data });
  res.json(note);
});

router.get('/:id', async (req, res) => {
    const note = await prisma.note.findUnique({ where: { id: Number(req.params.id) } });
  
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
  
    res.json(note);
  });

router.put('/:id', async (req, res) => {
  const data = normalizeNote(req.body);
  const updated = await prisma.note.update({
    where: { id: Number(req.params.id) },
    data
  });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await prisma.note.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(204);
});

module.exports = router;
