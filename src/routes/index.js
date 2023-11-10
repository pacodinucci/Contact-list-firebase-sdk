import { Router } from "express";
import { db } from "../firebase.js";

const router = Router();

router.get("/", async (req, res) => {

    const querySnapshot = await db.collection('contacts').get()

    const contacts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    res.render('index', {contacts})
})

router.post("/new", async (req, res) => {
    const { firstname, lastname, email, phone } = req.body;

    const contactsRef = db.collection('contacts');

    const docRef = await contactsRef.add({
        firstname,
        lastname,
        email,
        phone
    });

    res.redirect("/");
})

router.get("/update/:id", async (req, res) => {

    const { id } = req.params;

    const doc = await db.collection('contacts').doc(id).get();
    
    res.render('index', { contact: {id: doc.id, ...doc.data()}});
})

router.get("/delete/:id", async (req, res) => {

    const { id } = req.params;

    await db.collection('contacts').doc(id).delete();

    res.redirect("/");
})

router.post("/edit/:id", async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    
    await db.collection('contacts').doc(id).update(req.body);

    res.redirect("/");
})

export default router;