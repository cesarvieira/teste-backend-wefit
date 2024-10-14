import { Person } from "../types/person.type";
import db from "../services/db.service";

const create = async (data: Person) => {
  try {
    await db.query("INSERT INTO people SET ?", data);
  } catch (error) {
    throw error;
  }

  return data;
}

export default {
  create,
};
