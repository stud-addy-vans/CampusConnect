// // server/routes/marketplace.js

// import express from 'express';
// import { protect } from '../middleware/authMiddleware.js';
// import { createItem, getItems } from '../controllers/marketplaceController.js';

// const router = express.Router();

// // @route   POST api/marketplace
// // @desc    Create a new item listing
// router.post('/', protect, createItem); // <-- Use createItem controller

// // @route   GET api/marketplace
// // @desc    Get all item listings
// router.get('/', getItems); // <-- Use getItems controller

// // We will build the logic for these later
// // @route   PUT api/marketplace/:id
// router.put('/:id', protect, (req, res) => res.send('Update item route'));

// // @route   DELETE api/marketplace/:id
// router.delete('/:id', protect, (req, res) => res.send('Delete item route'));

// export default router;




// server/routes/marketplace.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js'; // <-- Import authorize
import { createItem, getItems } from '../controllers/marketplaceController.js';

const router = express.Router();

// The route to create an item now requires a user to be logged in (protect)
// AND have one of these roles (authorize).
router.post('/', protect, authorize('student', 'club_head', 'admin'), createItem);

// The GET route remains public for guests
router.get('/', getItems);

// ... your other routes (PUT, DELETE) will also need this
router.put('/:id', protect, authorize('student', 'club_head', 'admin'), (req, res) => res.send('Update item route'));
router.delete('/:id', protect, authorize('student', 'club_head', 'admin'), (req, res) => res.send('Delete item route'));

export default router;