import express from "express";
import fs from "fs";
const app = express();

app.use(express.json());

const Students = [
  { id: 1, name: "John Doe", age: 11 },
  { id: 2, name: "Jane Smith", age: 12 },
  { id: 3, name: "Alice Johnson", age: 13 },
  { id: 4, name: "Ali b", age: 14 },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/students", (req, res) => {
  res.send({
    message: "Hello Students!",
    data: Students,
  });
});

app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = Students.findIndex((s) => s.id === studentId);
  if (studentIndex !== -1) {
    // Ensure the id remains unchanged
    Students[studentIndex] = {
      ...Students[studentIndex],
      id: studentId,
    };
    res.json({
      success: true,
      message: "Student updated successfully",
      data: Students[studentIndex],
    });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.post("/students", (req, res) => {
  Students.push(req.body);
  res.json({
    success: true,
    message: "Student data received successfullyyyy",
    data: Students,
  });
});

app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = Students.findIndex((s) => s.id === studentId);
  if (studentIndex !== -1) {
    // Ensure the id remains unchanged
    Students[studentIndex] = {
      // ...Students[studentIndex],
      ...req.body,
      id: studentId,
    };
    res.json({
      success: true,
      message: "Student updated successfully",
      data: Students[studentIndex],
    });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.patch("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = Students.findIndex((s) => s.id === studentId);
  if (studentIndex !== -1) {
    Students[studentIndex] = {
      ...Students[studentIndex],
      ...req.body,
      id: studentId,
    };
    res.json({
      success: true,
      message: "Student updated successfully",
      data: Students[studentIndex],
    });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = Students.findIndex((s) => s.id === studentId);
  if (studentIndex !== -1) {
    Students.splice(studentIndex, 1);
    res.json({
      success: true,
      message: "Student deleted successfully",
      data: Students,
    });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// PRODUCTS
app.get("/products", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read products file" });
    }
    const products = JSON.parse(data);
    res.json(products);
  });
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read products file" });
    }
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.json({
        success: true,
        message: "Product fetched successfully",
        data: product,
      });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });
});

app.post("/products", (req, res) => {
  fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read products file" });
    }
    const NewProducts = JSON.parse(data);
    NewProducts.push(req.body);

    const prdtobeAdded = JSON.stringify(NewProducts);

    fs.writeFile("products.json", prdtobeAdded, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to write to products file" });
      }
    });

    res.json({
      success: true,
      message: "Product data received successfully",
      data: NewProducts,
    });
  });
});

// require('dotenv').config();
import "dotenv/config";

const PORT = process.env.PORT1 || 3000;   //5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});