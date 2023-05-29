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
        console.log("sasa");
        const { id_token } = account;
        const response = await axiosInstance.post("/api/auth/google/callback", {
          idToken: id_token
        });
        console.log("1234");
        const { auth } = response.data;
        return auth ? true : "/";
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default NextAuth(authOptions);
