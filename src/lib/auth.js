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
  callbacks: {
    signIn: async ({ account }) => {
      try {
        const { id_token } = account;
        const response = await axiosInstance.post("/api/auth/google/callback", {
          idToken: id_token
        });
        const { auth } = response.data;
        return auth ? true : "/";
      } catch (error) {
        console.log(error);
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
