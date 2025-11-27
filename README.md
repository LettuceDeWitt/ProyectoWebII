# Cine Terror (Gothic theme) - Proyecto Node

1. Copia `.env.example` a `.env` y ajusta las variables.
2. Ejecuta `npm install`.
3. Crea la base de datos y tablas: `mysql -u root -p < sql/schema.sql`
4. Ejecuta `npm run dev` y abre http://localhost:3000

Notas:
- El usuario admin inicial en `sql/schema.sql` tiene una contraseña hashed (ejemplo).
- Para crear más admins usa bcrypt en un pequeño script o registra manualmente.
