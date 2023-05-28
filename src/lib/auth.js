import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axiosInstance from "@/lib/axiosInstance";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  callbacks: {
    signIn: async ({ account }) => {
      const { id_token } = account;
      const response = await axiosInstance.post("/api/auth/google/callback", {
        idToken: id_token
      });
      const { auth } = response.data;
      return auth ? true : "/";
    },
    redirect: async ({ baseUrl }) => baseUrl,
    session: async ({ session }) => session,
    jwt: async ({ token }) => token
  }
};

export default NextAuth(authOptions);
