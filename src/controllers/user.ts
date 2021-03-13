import userState from '../constants/state';
import User from '../interfaces/user';
import UserModel from '../model/user';

const saveUser = async ({ id, state }: User) => {
  const user = await UserModel.findOneAndUpdate(
    { id },
    { state },
    { new: true, upsert: true }
  );

  return user;
};

const getUserById = async (id: string) => {
  const user = await UserModel.findOne({ id });

  return user;
};

const updateUserBirthDateAndState = async (
  id: string,
  birthdate: Date,
  state: number
) => {
  const user = await UserModel.findOneAndUpdate(
    { id },
    { birthdate, state },
    { new: true }
  );

  return user;
};

const updateUserFirstNameAndState = async (
  id: string,
  firstname: string,
  state: number
) => {
  const user = await UserModel.findOneAndUpdate(
    { id },
    { firstname, state },
    { new: true }
  );

  return user;
};

const resetUserState = async (id: string) => {
  const user = await UserModel.findOneAndUpdate(
    { id },
    { state: userState.DEFAULT },
    { new: true }
  );

  return user;
};

export {
  saveUser,
  getUserById,
  updateUserBirthDateAndState,
  updateUserFirstNameAndState,
  resetUserState,
};
