export default function Login() {

    const login = async() => {
        const res = fetch("/ap/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <form className="px-8 flex flex-col gap-4 is-[input]:*:block is-[input]:*:p-4 is-[input]:*:h-12 is-[input]:*:w-full is-[input]:*:rounded-md is-[input]:*:border is-[input]:*:border-gray-300 is-[input]:*:shadow-sm focus:is-[input]:*:border-indigo-300 focus:is-[input]:*:ring focus:is-[input]:*:ring-indigo-200 focus:is-[input]:*:ring-opacity-50">
            <input type="text" placeholder="Username"/>
            <div>
                <input type="password" placeholder="Password" className="block p-4 h-12 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                {}
            </div>
            <button type="submit" className="rounded bg-blue-900 text-white p-2 mb-2">Submit</button>
        </form>
    )
}