import User from '../models/User.js';

class UserService {

  async createUser(user: any) {
    const createdUser = await User.create(user);
    return createdUser;
  }
  async getAllUsers() {
    const users = await User.find();
    return users;
  }
  async getUser(id: string) {
    if (!id) {
      throw new Error('Id is not found');
    }
    const user = await User.findById(id);
    return user;
  }
}

export default new UserService();
