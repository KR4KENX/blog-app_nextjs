import express, { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";
const app = express();

let htmlform = `<!DOCTYPE html>
<html>
<head><title>file upload</title></head>
<body>
    <form action="/create" method="post" enctype="multipart/form-data">
        <input type="file" name="file1"> <br>
        <input type="text" name="title"> <br>
        <input type="submit" value="Send">
    </form>
</body>
</html>`;

//access to images on server
app.use("/images", express.static("images"));

app.get("/", (req: Request, res: Response) => {
  res.send(htmlform);
});

app.post("/create", (req: Request, res: Response) => {
  //uploading photo
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files: any) {
    console.log(JSON.stringify(files.file1));
    let tempPath = files.file1.filepath;
    let newPath = "./images/" + files.file1.originalFilename;
    fs.rename(tempPath, newPath, function (err) {
      if (err) {
        res.send("error uploading file!");
      } else {
        res.send(
          "filepath: " +
            `http://localhost:8080/images/${files.file1.originalFilename}` +
            " title: " +
            fields.title
        );
      }
    });
  });
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
