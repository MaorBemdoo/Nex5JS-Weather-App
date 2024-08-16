import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth()

    if(!session){
        redirect("/auth")
    }

    return (
        <main>
            Home Page
        </main>
    );
}
