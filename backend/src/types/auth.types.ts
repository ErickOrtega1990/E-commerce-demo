export type NewUserReqBody = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginReqBody = {
  email: string;
  password: string;
};

export type NewUserCreateType = {
  name: String;
  email: String;
  password: String;
  salt: String;
};
