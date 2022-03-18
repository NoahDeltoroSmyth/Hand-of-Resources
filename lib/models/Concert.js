const pool = require('../utils/pool');
const { findById } = require('./Bike');

module.exports = class Concert {
  id;
  venue;
  band;
  date;

  constructor(row) {
    this.id = row.id;
    this.venue = row.venue;
    this.band = row.band;
    this.date = new Date(row.date).toLocaleDateString('en-US');
  }

  static async insert({ venue, band, date }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
        concerts (venue, band, date)
    VALUES
        ($1, $2, $3)
    RETURNING 
        *
    `,
      [venue, band, date]
    );
    return new Concert(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT
        *
    FROM
        concerts
    WHERE
        id=$1
    `,
      [id]
    );
    return new Concert(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            concerts
        `
    );
    return rows.map((row) => new Concert(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            concerts
        WHERE
            id=$1
        RETURNING 
            *
        `,
      [id]
    );
    return new Concert(rows[0]);
  }

  static async update(id, attributes) {
    const existingConcert = await Concert.getById(id);
    const updatedConcert = { ...existingConcert, ...attributes };
    const { venue, band, date } = updatedConcert;
    const { rows } = await pool.query(
      `
    UPDATE
        concerts
    SET
        venue=$1,
        band=$2,
        date=$3
    WHERE
        id=$4
    RETURNING
        *
    `,
      [venue, band, date, id]
    );
    return new Concert(rows[0]);
  }
};
