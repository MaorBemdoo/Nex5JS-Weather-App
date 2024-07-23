import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import connectDB from '@/utils/db';
import User from "@/models/User"

export const { handlers, signIn, signOut, auth } =  NextAuth({
    providers: [
        Credentials({
        name: 'Credentials',
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            await connectDB();
            const user = await User.findOne({ username: credentials.username });

            if (user && bcrypt.compareSync(credentials.password as string, user.password)) {
                const { password, ...otherFields } = user
                return otherFields;
            } else {
                return null;
            }
        }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub as string;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth',
    }
});