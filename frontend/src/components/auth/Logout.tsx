"use client";

import {useAuth} from "@/context/AuthContext";
import {Button} from "@heroui/react";
import {LogOut} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

const LogoutBtn = ({ isCollapsed }: { isCollapsed: boolean}) => {
    const router = useRouter();
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await logout();
        setLoading(false);
        router.push("/login");
    }

    return (
        <Button
            variant="light"
            startContent={<LogOut size={20} />}
            onPress={logout}
            className={`${!isCollapsed && 'w-full'} justify-start text-gray-700 hover:text-red-600`}
            disabled={loading}
        >
            {!isCollapsed ? <span>Logout</span> : ""}
        </Button>
    );
}

export default LogoutBtn;