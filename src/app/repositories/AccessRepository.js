const db = require('../../database');

class AccessRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT * FROM access
    ORDER BY name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT * FROM access
    WHERE id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
    SELECT * FROM access
    WHERE email = $1`, [email]);
    return row;
  }

  async create({ name, email, datetime }) {
    const [row] = await db.query(`
    INSERT INTO access(name,email,datetime)
    VALUES($1,$2,$3)
    RETURNING *
    `, [name, email, datetime]);

    return row;
  }

  async update(id, { name, email, datetime }) {
    const [row] = await db.query(`
    UPDATE access
    SET name = $1, email = $2, datetime = $3
    WHERE id = $4
    `, [name, email, datetime, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
    DELETE FROM access
    WHERE id = $1`, [id]);
    return deleteOp;
  }
}

module.exports = new AccessRepository();
