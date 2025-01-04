const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("../olp.db");

async function hashPasswords() {
  db.all("SELECT id, password FROM users", async (err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      return;
    }

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      db.run(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, user.id],
        (err) => {
          if (err) {
            console.error(`Error updating user ID ${user.id}:`, err);
          } else {
            console.log(`Password hashed for user ID ${user.id}`);
          }
        },
      );
    }
  });
}

hashPasswords();
