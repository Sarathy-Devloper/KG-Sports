const express = require('express');
const router = express.Router();
const pool = require('../db.js'); // Assuming you have a db config set up here

// Helper to get turf name for a given ID
async function getTurfName(turfId) {
    const [rows] = await pool.query('SELECT turf_name FROM turf_details WHERE id = ?', [turfId]);
    return rows.length > 0 ? rows[0].turf_name : 'Unknown Turf';
}

// GET manual slots for a specific turf, optionally filtered by date
// Example: /api/manual-slots/turf/1?date=2023-10-27
router.get('/turf_details/:turfId', async (req, res) => {
    try {
        const { turfId } = req.params;
        const { date } = req.query; // Get the date from query parameters

        let query = 'SELECT mts.*, t.turf_name FROM manual_turf_slots mts JOIN turf_details t ON mts.turf_id = t.id WHERE mts.turf_id = ?';
        const queryParams = [turfId];

        if (date) {
            query += ' AND mts.slot_date = ?';
            queryParams.push(date);
        }
        query += ' ORDER BY mts.slot_date, mts.slot_time';

        const [rows] = await pool.query(query, queryParams);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching manual slots for turf:', err);
        res.status(500).json({ error: 'Failed to fetch manual slots.' });
    }
});

// GET all manual slots (for Super Admin) - includes turf_name
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT mts.*, t.turf_name FROM manual_turf_slots mts JOIN turf_details t ON mts.turf_id = t.id ORDER BY mts.slot_date, mts.slot_time'
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching all manual slots:', err);
        res.status(500).json({ error: 'Failed to fetch all manual slots.' });
    }
});

// POST a new manual slot or multiple manual slots (for bulk disable)
// Can accept a single slot object or an array of slot objects in req.body
router.post('/', async (req, res) => {
    let slotsToInsert = Array.isArray(req.body) ? req.body : [req.body];
    const insertedIds = [];
    const errors = [];

    for (const slotData of slotsToInsert) {
        const { turf_id, slot_date, slot_time, status, notes } = slotData;

        // Basic validation
        if (!turf_id || !slot_date || !slot_time || !status) {
            errors.push({ message: `Missing required fields for slot on ${slot_date} ${slot_time}.`, slot: slotData });
            continue;
        }
        if (!['available', 'booked', 'maintenance', 'closed'].includes(status)) {
            errors.push({ message: `Invalid status value for slot on ${slot_date} ${slot_time}.`, slot: slotData });
            continue;
        }

        try {
            // Check for existing slot (turf_id, slot_date, slot_time unique constraint)
            const [existing] = await pool.query(
                'SELECT id FROM manual_turf_slots WHERE turf_id = ? AND slot_date = ? AND slot_time = ?',
                [turf_id, slot_date, slot_time]
            );

            if (existing.length > 0) {
                // If exists, update it
                await pool.query(
                    'UPDATE manual_turf_slots SET status = ?, notes = ? WHERE id = ?',
                    [status, notes || null, existing[0].id]
                );
                insertedIds.push({ id: existing[0].id, type: 'updated', slot: slotData });
            } else {
                // If not exists, insert new
                const [result] = await pool.query(
                    'INSERT INTO manual_turf_slots (turf_id, slot_date, slot_time, status, notes) VALUES (?, ?, ?, ?, ?)',
                    [turf_id, slot_date, slot_time, status, notes || null]
                );
                insertedIds.push({ id: result.insertId, type: 'inserted', slot: slotData });
            }

        } catch (err) {
            console.error(`Error processing slot ${slot_date} ${slot_time} for turf ${turf_id}:`, err);
            errors.push({ message: `Failed to process slot on ${slot_date} ${slot_time}: ${err.message}`, slot: slotData });
        }
    }

    if (errors.length > 0) {
        return res.status(207).json({ // 207 Multi-Status
            message: 'Some slots processed with errors.',
            processed: insertedIds,
            errors: errors
        });
    }

    res.status(201).json({ message: 'Manual slots processed successfully!', processed: insertedIds });
});


// PUT (update) an existing manual slot
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { turf_id, slot_date, slot_time, status, notes } = req.body;

    // Basic validation
    if (!turf_id || !slot_date || !slot_time || !status) {
        return res.status(400).json({ error: 'Missing required fields: turf_id, slot_date, slot_time, status.' });
    }
    if (!['available', 'booked', 'maintenance', 'closed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value. Must be one of: available, booked, maintenance, closed.' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE manual_turf_slots SET turf_id = ?, slot_date = ?, slot_time = ?, status = ?, notes = ? WHERE id = ?',
            [turf_id, slot_date, slot_time, status, notes || null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Manual slot with the given ID not found.' });
        }
        res.json({ message: 'Manual slot updated successfully!' });
    } catch (err) {
        // If the update causes a duplicate entry for a different slot, it's an error
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'The updated slot details would create a duplicate entry. A manual slot already exists for this turf, date, and time.' });
        }
        console.error('Error updating manual slot:', err);
        res.status(500).json({ error: 'Failed to update manual slot.' });
    }
});

// DELETE a manual slot
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM manual_turf_slots WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Manual slot with the given ID not found.' });
        }
        res.json({ message: 'Manual slot deleted successfully!' });
    } catch (err) {
        console.error('Error deleting manual slot:', err);
        res.status(500).json({ error: 'Failed to delete manual slot.' });
    }
});

module.exports = router;