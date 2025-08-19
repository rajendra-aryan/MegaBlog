import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../store/notificationsSlice";

function Toast({ id, message, type, timeoutMs }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => dispatch(removeToast(id)), timeoutMs || 3000);
        return () => clearTimeout(timer);
    }, [dispatch, id, timeoutMs]);

    const base = "px-4 py-3 rounded shadow mb-2 text-sm";
    const color =
        type === "error"
            ? "bg-red-600 text-white"
            : type === "success"
            ? "bg-green-600 text-white"
            : type === "warning"
            ? "bg-yellow-500 text-black"
            : "bg-gray-800 text-white";

    return <div className={`${base} ${color}`}>{message}</div>;
}

export default function Toaster() {
    const toasts = useSelector((state) => state.notifications.toasts);

    if (!toasts || toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {toasts.map((t) => (
                <Toast key={t.id} {...t} />)
            )}
        </div>
    );
}

