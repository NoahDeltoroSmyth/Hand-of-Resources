const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  openAt;
  closeAt;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.openAt = row.open_at;
    this.closeAt = row.close_at;
  }

  static async insert({ name, openAt, closeAt }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            restaurants (name, open_at, close_at)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, openAt, closeAt]
    );
    return new Restaurant(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            restaurants
        WHERE
            id=$1
        `,
      [id]
    );
    return new Restaurant(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        restaurants
      `
    );
    return rows.map((row) => new Restaurant(row));
  }
};
