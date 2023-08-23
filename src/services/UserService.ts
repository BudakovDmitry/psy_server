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

  async updateUser(user: any) {
    if (!user._id) {
      throw new Error('Id is not found');
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true
    });
    return updatedUser;
  }
}

export default new UserService();
