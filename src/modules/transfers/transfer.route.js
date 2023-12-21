import express from "express"
import { createTransfer } from "./transfer.controller.js"

export const router = express.Router()

router.post( "/", createTransfer)

