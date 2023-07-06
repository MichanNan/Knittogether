import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../db/models/User";
import dbConnect from "../../../db/connect";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, request) {
        await dbConnect();
        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],
  pages: { signIn: "/login" },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session: async ({ token, session }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
