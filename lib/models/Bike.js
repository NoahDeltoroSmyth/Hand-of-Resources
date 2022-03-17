const pool = require('../utils/pool');

module.exports = class Bike {
  id;
  manufacturer;
  model;
  frameSize;

  constructor(row) {
    this.id = row.id;
    this.manufacturer = row.manufacturer;
    this.model = row.model;
    this.frameSize = row.frame_size;
  }

  static async insert({ manufacturer, model, frameSize }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
        bikes (manufacturer, model, frame_size)
    VALUES 
        ($1, $2, $3)
    RETURNING
        *
    `,
      [manufacturer, model, frameSize]
    );
    return new Bike(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
    SELECT
        *
    FROM
        bikes
    WHERE
        id=$1
      `,
      [id]
    );
    return new Bike(rows[0]);
  }
};
