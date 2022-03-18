const pool = require('../utils/pool');

module.exports = class Game {
  id;
  title;
  genre;
  price;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.genre = row.genre;
    this.price = row.price;
  }

  static async insert({ title, genre, price }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
        games (title, genre, price)
    VALUES
        ($1, $2, $3)
    RETURNING
        *
    `,
      [title, genre, price]
    );
    return new Game(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM games WHERE id=$1`, [id]);
    return new Game(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`SELECT * FROM games`);
    return rows.map((row) => new Game(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM games WHERE id=$1 RETURNING *`,
      [id]
    );
    return new Game(rows[0]);
  }
};
