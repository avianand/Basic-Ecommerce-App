const fs = require("fs");
const { report } = require("../routes/admin/auth");
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
    const data = await this.getAll();
    data.push(attr);
    const newRecord = await fs.promises.writeFile(
      this.filename,
      JSON.stringify(data)
    );
  }
}

const test = async () => {
  const repo = new UserRepository("users.json");
  await repo.getAll();
  await repo.create({ email: "test@example.com", password: "password" });
};
test();
