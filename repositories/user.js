const fs = require("fs");
const { report } = require("../routes/admin/auth");
const crypto = require("crypto");
class UserRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Filename required.");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    //open the file and Read its contents
    // parse the contents
    // const data = JSON.parse(content);
    // return parsed data
    // return data;

    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  
  async create(attr) {
    // const { email, passoword } = attr;
    attr.id = this.randomId();

    const records = await this.getAll();
    
    records.push(attr);

    await this.writeAll(records);

    return attr;
  }

  async writeAll(records) {
    await fs.promises.writeFile(
        this.filename, 
        JSON.stringify(records, null, 2)
      );
  }
  
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const newrecords = records.filter((record) => record.id !== id);
    await this.writeAll(newrecords);
  
  }

  async update(id, attr) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    await Object.assign(record, attr);
    await this.writeAll(records);
  
  }

  async getOneBy(filters) {
    
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for  (let key in filters)  {
        if  (record[key] !== filters[key])  {
          found = false;
        } 
      }

      if (found) {
        return record
      }
    }  
  }

  async getManyBy(filters) {
    const records = await this.getAll();
    const foundRecords = [];
    for (let record of records) {
      let found = true;

      for  (let key in filters)  {
        if  (record[key] !== filters[key])  {
          found = false;
        }
        
      }

      if (found) {
        foundRecords.push(record)
      }
    }
    return foundRecords;
  }
}


// const test = async () => {
//   const repo = new UserRepository("users.json");
//   // await repo.getAll();
//   // await repo.create({ email: "test@example.com", password: "password" });
//   // const user = await repo.getOne("ba7dd738")
//   // console.log(user)
//   // const deletedUser = await repo.delete("ba7dd738")
//   const user = await repo.getOneBy({
//     email: "abc@abc.com",
//   });
//   console.log(user);
// };
// test();
module.exports = new UserRepository('users.json')