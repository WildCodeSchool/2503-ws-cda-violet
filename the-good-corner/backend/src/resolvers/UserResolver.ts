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

@InputType()
class NewUserInput {
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

    return user.id;
  }

  // @Mutation(() => ID)
  // async createTag(@Arg("data") data: TagInput) {
  //   const tag = Tag.create({ ...data });
  //   await tag.save();
  //   return tag.id;
  // }
}
