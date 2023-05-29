import AdminLayout from "@/Layouts/AdminLayout";
import {Head, Link, router} from "@inertiajs/react";
import {useCallback, useEffect, useState} from "react";
import {debounce, pickBy} from "lodash";

const ActionButton = (props) => {
    return (
        <button
            {...props}
            className={`px-2 py-1 rounded-md text-white ` + props.className}
        >
            {props.children}
        </button>
    );
};

const UpIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
    </svg>
);
const DownIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
    </svg>
);

export default function Index(props) {

    const { data: user, meta, filtered, attributes } = props.user;
    const [pageNumber, setPageNumber] = useState([]);
    const [params, setParams] = useState(filtered);

    const onChange = (e) => setParams({...params, [e.target.name]: e.target.value});
    const sort = (item) => {
        setParams({
            ...params,
            field: item,
            direction: params.direction == "asc" ? "desc" : "asc",
        });
    };

    const deleteUser = async (id) => {
        try {
            const deletes = router.delete(`/admin/user/${id}`);
            console.log(deletes);
        } catch (e) {
            console.log(e);
        }
    };

    const reload = useCallback(
        debounce((query) => {
            router.get(
                `/admin/user`,
                { ...pickBy(query), page: query.q ? 1 : query.page },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 150),
        []
    );

    useEffect(() => reload(params), [params]);
    useEffect(() => {
        let numbers = [];
        for (
            let i = attributes.per_page;
            i <= attributes.total / attributes.per_page;
            i = i + attributes.per_page
        ) {
            numbers.push(i);
        }
        setPageNumber(numbers);
    }, []);

    return (
        <AdminLayout
            user={props.auth.user}
            erros={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="User"/>

            <div className="px-4 mt-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">
                            Users List
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            href="/admin/user/create"
                        >
                            Add user
                        </Link>
                    </div>
                </div>
                <div className="mt-4 flow-root">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="mb-2 flex items-center justify-end">
                                <div className="w-1/2">
                                    <div className="flex items-center justify-end gap-x-2 mb-3">
                                        <select
                                            name="load"
                                            id="load"
                                            onChange={onChange}
                                            value={params.load}
                                            className="rounded-lg border-gray-300 focus:ring-blue-200 focus:ring transition duration-150 ease-in form-select"
                                        >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            {/* {pageNumber.map((page, index) => <option key={index}>{page}</option>)} */}
                                        </select>
                                        <div
                                            className="flex items-center gap-x-2 rounded-lg bg-white px-2 border-gray-300 focus-within:ring-blue-200 focus-within:ring border focus-within:border-blue-400 transition duration-150 ease-in ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5 inline text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                            </svg>
                                            <input
                                                type="text"
                                                name="q"
                                                id="q"
                                                onChange={onChange}
                                                value={params.q}
                                                className="border-0 focus:ring-0 form-text w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        />
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            No
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            <div
                                                className="cursor-pointer flex items-center gap-x-2 justify-between"
                                                onClick={() => sort("name")}
                                            >
                                                Name
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            <div
                                                className="cursor-pointer flex items-center gap-x-2 justify-between"
                                                onClick={() =>
                                                    sort("email")
                                                }
                                            >
                                                Email
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Phone Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Wallet
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Store Name
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {user.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/admin/user/${user.id}/edit`}
                                                        className="px-2 py-1 rounded-md text-white bg-blue-500"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <ActionButton
                                                        type="button"
                                                        className="bg-red-500"
                                                        onClick={() =>
                                                            deleteUser(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </ActionButton>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {meta.from + index}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {user.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.role}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.address}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.phone_number}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.wallet}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.store_name}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <ul className="flex items-center gap-x-1 mt-5 mb-10">
                        {meta.links.map((item, index) => (
                            <button
                                key={index}
                                disabled={item.url == null ? true : false}
                                className={`${
                                    item.url == null
                                        ? "text-gray-500 cursor-default"
                                        : "text-gray-800"
                                } w-12 h-9 rounded-lg flex items-center justify-center border bg-white`}
                                onClick={() =>
                                    setParams({
                                        ...params,
                                        page: new URL(
                                            item.url
                                        ).searchParams.get("page"),
                                    })
                                }
                            >
                                {item.label}
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
