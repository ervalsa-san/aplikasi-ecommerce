import CustomerLayout from '@/Layouts/CustomerLayout.jsx';
import { Head } from '@inertiajs/react';

export default function CustomerDashboard({ auth }) {
    return (
        <CustomerLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customer Dashboard</h2>}
        >
            <Head title="Customer Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged as User!</div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
