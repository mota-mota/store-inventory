# store-inventory
Repositorio dedicado a prueba técnica de cemaco, por simplicidad se usará el frontend y el backend en un solo repositorio.

---

## 🚀 Guía rápida para levantar el proyecto con Docker

### 1. Requisitos previos
- Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).

### 2. Clonar el repositorio
```bash
git clone <url-del-repo>
cd store-inventory
```

### 3. Levantar todos los servicios (frontend, backend y base de datos)
```bash
docker-compose up -d --build
```
Esto instalará dependencias, correrá migraciones y seeders automáticamente.

### 4. Acceder a la plataforma
Abre tu navegador y entra a:

- [http://localhost:3000](http://localhost:3000)

### 5. Usuarios de acceso

| Rol   | Usuario                | Contraseña   |
|-------|------------------------|--------------|
| Admin | admin@cemaco.com       | Admin123!    |
| Colab | colab@cemaco.com       | Colab123!    |

---

### 6. Comandos útiles para desarrollo

- **Ver logs de un servicio:**
  ```bash
  docker-compose logs backend
  docker-compose logs frontend
  docker-compose logs mysql
  ```
- **Eliminar todo y empezar desde cero:**
  ```bash
  docker-compose down -v --rmi all
  docker-compose up -d --build
  ```

---

¡Listo! Si tienes dudas, revisa los logs o puedes consultarme a mi correo electronico

