import express from "express";
import {
    getDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument
} from "../controllers/Document.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/documents',verifyUser, getDocuments);
router.get('/documents/:id',verifyUser, getDocumentById);
router.post('/documents',verifyUser, createDocument);
router.patch('/documents/:id',verifyUser, updateDocument);
router.delete('/documents/:id',verifyUser, deleteDocument);

export default router;