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

// ✅ GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      include: { contact: true }, // optional: include associated contact
    });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// ✅ POST /notes
router.post('/', async (req, res) => {
  const data = normalizeNote(req.body);
  const note = await prisma.note.create({ data });
  res.json(note);
});

// ✅ GET /notes/:id
router.get('/:id', async (req, res) => {
  const note = await prisma.note.findUnique({ where: { id: Number(req.params.id) } });

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
});

// ✅ PUT /notes/:id
router.put('/:id', async (req, res) => {
  const data = normalizeNote(req.body);
  const updated = await prisma.note.update({
    where: { id: Number(req.params.id) },
    data
  });
  res.json(updated);
});

// ✅ DELETE /notes/:id
router.delete('/:id', async (req, res) => {
  await prisma.note.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(204);
});

module.exports = router;