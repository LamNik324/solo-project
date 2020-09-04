import express from 'express';
import Todo from '../models/todo.js';
import nodemailer from 'nodemailer';
import fileSistem from 'fs';
import axios from 'axios';
const fs = fileSistem.promises

const router = express.Router();

//get all todo
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.send(await todos);
});



// add post
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send()
});

router.get('/send', async (req, res) => {
  const todos = await Todo.find();
  const text = JSON.stringify(todos, null, 2)
  console.log(todos);
  await fs.writeFile('todos.txt', text);
  const fox = await axios.get('https://randomfox.ca/floof/')
  const pictureOfFox = fox.data.image;
  console.log(pictureOfFox);
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    sucure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    }
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.USER_EMAIL,
    subject: "Here is your tasks gys'",
    text: 'Open me ',
    html: `
    <h2>Сделай это ради лисички ну</h2>
    <img src='${ pictureOfFox}' />
  `,
    attachments: [
      {
        path: './todos.txt',
      }
    ]
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Congratulation, your email has been sended!' + info.response);
    }
  });

  res.send('ok')
})
// add progress

router.put('/:id', async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  todo.progress += 25;
  todo.save();
  res.send();
})

// add regress
router.put('/regress/:id', async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  todo.progress -= 25;
  todo.save();
  res.send()
})

//delete todo
router.delete('/:id', async (req, res) => {
  const todo = await Todo.deleteOne({ _id: req.params.id });
  res.status(200).send();
})

// done
router.put('/done/:id', async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  todo.progress += 1000;
  todo.save();
  res.send()
})


export default router;


