import CourierLayout from '@/Layouts/CourierLayout.jsx';
import { Head } from '@inertiajs/react';

export default function CourierDashboard({ auth }) {
    return (
        <CourierLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Courier Dashboard</h2>}
        >
            <Head title="Courier Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged Courier!</div>
                    </div>
                </div>
            </div>
        </CourierLayout>
    );
}
