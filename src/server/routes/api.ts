import { Router, Request, Response } from "express";
import { User } from "../models/User";
import { Email } from "../models/Email";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const users = await User.findAll();
    let success = false;
    users.map((user) => {
      if (user.get("name") === name &&
          user.get("email") === email &&
          user.get("password") === password) {
            success = true;
          }
    });
    res.status(200).json(success);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

router.get("/emails", async (_: Request, res: Response) => {
  try {
    const emails = await Email.findAll();
    res.json(emails.sort((a, b) => {
      const aId = a.get("id"), bId = b.get("id");
      if (aId > bId) return 1;
      else if (aId === bId) return 0;
      else return -1;
    }));
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.get("/emails/:read", async (req: Request, res: Response) => {
  try {
    const { read } = req.params;
    if (read !== 'read' && read !== 'unread') {
      res.status(400).send([]);
    }
    const marked = read === 'read' ? true : false;
    const emails = await Email.findAll();
    const filteredEmails = emails.filter((email) => email.get("read") === marked);
    res.status(200).send(filteredEmails);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

router.post("/emails", async (req: Request, res: Response) => {
  try {
    const { parentId, sender, receiver, title, description } = req.body;
    const newEmail = Email.build({parentId, sender, receiver, title, description});
    await newEmail.save();
    res.sendStatus(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.put("/emails/:id/read/:value", async (req: Request, res: Response) => {
  try {
    const { id, value } = req.params;
    const email = await Email.findByPk(id);
    if (email) {
      email.set("read", value === "true" ? true : false);
    }
    email?.save();
  } catch (error: any) {
    res.status(500).send(error.message);
  }  
})

router.post("/emails/:id/trash", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const email = await Email.findByPk(id);
    if (email) {
      email.set("deleted", true);  
      email.set("deletedAt", new Date());
    }
    email?.save();
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

router.post("/emails/:id/recover", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const email = await Email.findByPk(id);
    if (email) {
      email.set("deleted", false);  
      email.set("deletedAt", null);
    }
    email?.save();
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

router.delete("/emails/:id", async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const email = await Email.findByPk(id);
    await email?.destroy();
    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;