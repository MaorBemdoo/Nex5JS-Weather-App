import NextAuth, { CredentialsSignin } from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import connectDB from '@/utils/db';
import User from '@/models/User';

export const { handlers, signIn, signOut, auth } =  NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try{
                    await connectDB();
                }catch(err: any){
                    throw new Error('Error connecting to MongoDB', err)
                }

                class UserNotFoundError extends CredentialsSignin {
                    message = "User doesn't exist"
                    status = 404
                }

                class PasswordIncorrectError extends CredentialsSignin {
                    message = "Invalid Passord"
                    status = 400
                }

                const user = await User.findOne({ username: credentials.username });

                if(!user){
                    throw new UserNotFoundError()
                }

                if (bcrypt.compareSync(credentials.password as string, user.password)) {
                    return {
                        id: user._id,
                        username: user.username,
                        full_name: user.full_name,
                        favourites: user.favourites,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    }
                } else {
                    throw new PasswordIncorrectError()
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
});