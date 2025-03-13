import bcrypt from 'bcryptjs';
import _ from 'lodash';
import { users } from '../schemas/main.js';
import { eq } from 'drizzle-orm';

class AuthRepository {
  /**@type {DrizzleDb} */
  db = null;
  constructor(db) {
    this.db = db;
  }
  async register({ email, password, avatar }) {
    // Create a new user with email, password, and avatar
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await this.db
      .insert(users)
      .values({ email, passwordHash, salt, avatar })
      .returning();

    return _.pick(user, ['id', 'email', 'avatar']);
  }

  async login({ email, password }) {
    // Find user by email
    const foundUsers = await this.db.select().from(users).where(eq(users.email, email));
    if (!foundUsers || foundUsers.length === 0) {
      throw new Error('User not found');
    }
    const user = foundUsers[0];
    // Check password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    return _.pick(user, ['id', 'email', 'avatar']);
  }
}

export default AuthRepository;
