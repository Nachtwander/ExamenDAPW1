/*Crea una API RESTful en Express.js para gestionar un sistema de inventario de productos. La API debe incluir tres rutas para mostrar, registrar y actualizar productos en el inventario.

Instrucciones
Crea un array en memoria para almacenar los datos de los productos.
Implementa tres rutas en Express.js:
GET para mostrar todos los productos.
POST para registrar un nuevo producto.
PUT para actualizar la información de un producto existente por su ID.
Cada producto debe tener las siguientes propiedades:

id (número entero)
nombre (texto)
precio (número decimal)
cantidad (número entero) */

const express = require("express");
const app = express();

app.use(express.json());

const productos = [
  { id: 1, nombre: "Jabón", precio: 100.5, cantidad: 50 },
  { id: 2, nombre: "Shampoo", precio: 200.75, cantidad: 30 },
];

// Ruta GET: Obtener todos los productos
app.get("/productos", (req, res) => {
  res.json(productos);
});

//Registrar un nuevo producto
app.post("/productos", (req, res) => {
  let nuevoProducto = req.body;

  // Validar datos del producto
  if (
    !nuevoProducto.id ||
    !nuevoProducto.nombre ||
    !nuevoProducto.precio ||
    !nuevoProducto.cantidad
  ) {
    return res.status(400).json({ mensaje: "Faltan datos del producto" });
  } else {
    // Agregar el nuevo producto al array
    productos.push(nuevoProducto);

    // Respuesta exitosa
    res.status(201).json({
      mensaje: "Producto registrado exitosamente",
      producto: nuevoProducto,
    });
  }
});

// Actualizar un producto existente por su ID
app.put("/productos/:id", (req, res) => {
  let { id } = req.params; // ID del producto a actualizar
  let productoActualizado = req.body;

  // Buscar el producto por su ID
  let producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }else{
     // Actualizar las propiedades del producto
  producto.nombre = productoActualizado.nombre || producto.nombre;
  producto.precio = productoActualizado.precio || producto.precio;
  producto.cantidad = productoActualizado.cantidad || producto.cantidad;

  // Actualizar producto en el array
  res.json({ mensaje: "Producto actualizado", producto });
  }

 
});

// Configuración del puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
