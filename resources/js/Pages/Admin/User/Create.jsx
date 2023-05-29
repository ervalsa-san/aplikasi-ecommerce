import AdminLayout from '@/Layouts/AdminLayout';
import {Head, router, useForm} from "@inertiajs/react";
import FormUser from "@/Pages/Admin/User/Partials/FormUser.jsx";

export default function Create(props) {

    console.log(props)

    const { data, setData, post, reset } = useForm({
        name: '',
        email: '',
        role: '',
        address: '',
        phone_number: '',
        store_name: '',
        wallet: '',
        password: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        post(route('adminUserStore'))
    }

    return (
        <AdminLayout
            user={props.auth.user}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add User</h2>}
        >
            <Head title="Add User"/>

            <div className="px-4 mt-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Adding a new User</h1>
                        <p className="mt-2 text-sm text-gray-700">Adding a new user so that the user can use the application.</p>
                    </div>
                </div>
                <FormUser {... {data, submitHandler, handleChange, submit: 'Add User'}}/>
            </div>
        </AdminLayout>
    );
}
