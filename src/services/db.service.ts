import mysql from 'mysql2/promise';

class DbService {
  private pool: mysql.Pool;
  private conn: mysql.PoolConnection;
  private autoRelease: boolean = true;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQLDB_HOST,
      port: parseInt(process.env.MYSQLDB_PORT || '3306'),
      user: process.env.MYSQLDB_USER,
      password: process.env.MYSQLDB_PASSWORD,
      database: process.env.MYSQLDB_DATABASE,
    });
  }

  async startTransaction() {
    try {
      this.conn = await this.pool.getConnection();
      await this.conn.beginTransaction();
      return this.conn;
    } catch (error) {
      throw error;
    }
  }

  async commit(conn?: mysql.PoolConnection) {
    try {
      if (!conn) {
        conn = this.conn;
      }
      await conn.commit();
      conn.release();
    } catch (error) {
      throw error;
    }
  }

  async rollback(conn?: mysql.PoolConnection) {
    try {
      if (!conn) {
        conn = this.conn;
      }
      await conn.rollback();
      conn.release();
    } catch (error) {
      throw error;
    }
  }

  async query(sql: string, values: unknown) {
    try {
      let conn = this.conn;
      if (!conn) {
        conn = await this.pool.getConnection();
      }
      const [rows] = await conn.query(sql, values);
      if (this.autoRelease) {
        conn.release();
      }
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async close() {
    await this.pool.end();
  }
}

export default new DbService();
