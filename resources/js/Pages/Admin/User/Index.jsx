import AdminLayout from "@/Layouts/AdminLayout";
import {Head} from "@inertiajs/react";

export default function Index(props) {

    console.log(props);

    return (
        <AdminLayout
            auth={props.auth}
            erros={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="User"/>


        </AdminLayout>
    );
}
