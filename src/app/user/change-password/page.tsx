import AppLayout from "@src/components/AppLayout";
import Dashboard from "@src/components/Dashboard";
import React from "react";
import ChangePasswordForm from "./components/ChangePasswordForm";

const page = () => {
	return (
		<AppLayout>
			<Dashboard>
				<ChangePasswordForm />
			</Dashboard>
		</AppLayout>
	);
};

export default page;
