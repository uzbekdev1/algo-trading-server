"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers = require("../controllers/triggers");
const router = express_1.Router();
/**
 * create a new trigger for a user
 */
router.post('/:exchange/:base/:quote/:kind', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const uid = req.uid;
    const symbol = `${req.params.base}/${req.params.quote}`;
    const exchange = req.params.exchange;
    const kind = req.params.kind;
    const params = req.body;
    const trigger = yield Controllers.createTrigger(uid, exchange, symbol, kind, params);
    res.json({ trigger, success: true });
}));
/**
 * get all existing triggers for a user
 */
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield Controllers.getTriggers(req.uid)); }));
/**
 * Delete a specific trigger
 */
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const uid = req.uid;
    const id = Number(req.params.id);
    yield Controllers.deleteTrigger(uid, id);
    res.json({ success: true });
}));
exports.default = router;
