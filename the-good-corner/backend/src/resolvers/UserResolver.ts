import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import User from "../entities/User";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

@InputType()
class NewUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

// @InputType()
// class TagInput {
//   @Field()
//   title: string; // TODO make it required with "!" ?
// }

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  @Mutation(() => ID)
  async signup(@Arg("data") data: NewUserInput) {
    const hashedPassword = await argon2.hash(data.password);
    const user = User.create({ ...data, hashedPassword });
    await user.save();
    const payload = {
      id: user.id,
    };
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    // return user.id;
    return token;
  }

  @Mutation(() => ID)
  async login(@Arg("data") data: UserInput) {
    const user = await User.findOneOrFail({ where: { email: data.email } });
    const isValid = await argon2.verify(user.hashedPassword, data.password);
    if (!isValid) throw new Error("Invalid password");

    const payload = {
      id: user.id,
    };
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return token;
  }

  // @Mutation(() => ID)
  // async createTag(@Arg("data") data: TagInput) {
  //   const tag = Tag.create({ ...data });
  //   await tag.save();
  //   return tag.id;
  // }
}
