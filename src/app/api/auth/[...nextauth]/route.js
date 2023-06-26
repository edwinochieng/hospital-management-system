import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "../../../../../prisma/client";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { username, password } = credentials;

        const admin = await prisma.admin.findUnique({
          where: { username: username },
        });

        const doctor = await prisma.doctor.findUnique({
          where: { doctorId: username },
        });
        const staff = await prisma.staff.findUnique({
          where: { staffId: username },
        });

        if (admin && bcrypt.compareSync(password, admin.password)) {
          return {
            id: admin.id,
            usename: admin.username,
          };
        }
        if (doctor && bcrypt.compareSync(password, doctor.password)) {
          return {
            id: doctor.id,
            name: doctor.name,
            username: doctor.doctorId,
            email: doctor.email,
          };
        }
        if (staff && bcrypt.compareSync(password, staff.password)) {
          return {
            id: staff.id,
            name: staff.name,
            username: staff.Id,
            email: staff.email,
          };
        }
        throw new Error("Invalid username or password");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
