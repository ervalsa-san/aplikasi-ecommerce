import AdminLayout from '@/Layouts/AdminLayout.jsx';
import { Head } from '@inertiajs/react';

export default function AdminDashboard(props) {

    return (
        <AdminLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between">
                            <div className="grid sm:grid-cols-3 grid-cols-1 sm:px-0 px-12 gap-4 w-full">
                                <div className="bg-yellow-500 text-white rounded-md p-6 flex items-center justify-center flex-col">
                                    <p className="font-bold text-4xl">
                                        {props.total_user}
                                    </p>
                                    <br/>
                                    <p className="font-semibold text-sm">
                                        Total User
                                    </p>
                                </div>
                                <div className="bg-blue-500 text-white rounded-md p-6 flex items-center justify-center flex-col">
                                    <p className="font-bold text-4xl">
                                        {props.total_product}
                                    </p>
                                    <br/>
                                    <p className="font-semibold text-sm">
                                        Total Product
                                    </p>
                                </div>
                                <div className="bg-red-500 text-white rounded-md p-6 flex items-center justify-center flex-col">
                                    <p className="font-bold text-4xl ">
                                        {props.total_category}
                                    </p>
                                    <br/>
                                    <p className="font-semibold text-sm">
                                        Total Category
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
