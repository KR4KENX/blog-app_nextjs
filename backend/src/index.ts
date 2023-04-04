import express, { Request, Response } from "express";
import formidable, { Fields } from "formidable";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

let htmlform = `<!DOCTYPE html>
<html>
<head><title>file upload</title></head>
<body>
    <form action="/posts" method="post" enctype="multipart/form-data">
        <input type="file" name="file1"> <br>
        Title <input type="text" name="title"> <br>
        Short Description <input type="text" name="shortDesc"> <br>
        Description <input type="text" name="description"> <br>
        Author <input type="text" name="author"> <br>
        <input type="submit" value="Send">
    </form>
</body>
</html>`;

//access to images on server
app.use("/images", express.static("images"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(htmlform);
});

app.get("/posts", async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.send(posts);
});

app.get("/posts/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  res.send(post).status(200);
});

app.patch("/posts/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, shortDesc, description, author } = req.body;
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      shortDesc: shortDesc,
      description: description,
      author: author,
    },
  });
  res.send(post).status(200);
});

app.delete("/posts", async (req: Request, res: Response) => {
  await prisma.post.deleteMany();
  res.sendStatus(200);
});

app.post("/posts", (req: Request, res: Response) => {
  // //uploading photo
  // const form = new formidable.IncomingForm();
  // form.parse(req, function (err, fields: Fields, files: any) {
  //   let tempPath = files.file1.filepath;
  //   let newPath = "./images/" + files.file1.originalFilename;
  //   fs.rename(tempPath, newPath, async function (err) {
  //     if (err) {
  //       res.send("error uploading file!");
  //     } else {
  //       if (
  //         typeof fields.title != "string" ||
  //         typeof fields.shortDesc != "string" ||
  //         typeof fields.description != "string" ||
  //         typeof fields.author != "string"
  //       )
  //         return res.send(400);
  //       await prisma.post.create({
  //         data: {
  //           title: fields.title,
  //           shortDesc: fields.shortDesc,
  //           description: fields.description,
  //           author: fields.author,
  //           img: `http://localhost:8080/images/${files.file1.originalFilename}`,
  //         },
  //       });
  //       res.send("Post created").status(201);
  //     }
  //   });
  // });
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
