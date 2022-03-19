const pool = require('../utils/pool');

module.exports = class Guitar {
  id;
  manufacturer;
  color;
  stringCount;

  constructor(row) {
    this.id = row.id;
    this.manufacturer = row.manufacturer;
    this.color = row.color;
    this.stringCount = row.string_count;
  }

  static async insert({ manufacturer, color, stringCount }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
        guitars (manufacturer, color, string_count)
    VALUES
        ($1, $2, $3)
    RETURNING
        *
    `,
      [manufacturer, color, stringCount]
    );
    return new Guitar(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM guitars WHERE id=$1', [
      id,
    ]);
    return new Guitar(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM guitars');
    return rows.map((row) => new Guitar(row));
  }
};
