const Database = class {
  constructor(type) {
    if (type == "pg") {
      const { Client } = require("pg");
      this.client = new Client();
      this.client.connect();
    }
  }

  async query(sql) {
    try {
      const res = await this.client.query(sql)
      // console.log(res);
      return res.rows;
    } catch (e) {
      console.error(e.stack)
    }
  }

  async queryOne(sql) {
    try {
      const res = await this.client.query(sql)
      return res.rows[0];
    } catch (e) {
      console.error(e.stack)
    }
  }

  async insert(sql) {
    try {
      await this.client.query(sql)
      return true;
    } catch (e) {
      console.error(e.stack)
      return false;
    }
  }

  async update(sql) {
    try {
      await this.client.query(sql)
      return true;
    } catch (e) {
      console.error(e.stack)
      return false;
    }
  }
}

module.exports = Database;