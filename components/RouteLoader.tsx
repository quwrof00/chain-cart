'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLoadingStore } from "@/app/stores/loading-store";

export default function RouteLoader() {
    const router = useRouter();
    const pathname = usePathname();
    const setLoading = useLoadingStore((s) => s.setLoading);

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
           setLoading(false); 
        }, 300);
        
        return () => clearTimeout(timeout);
    }, [pathname]);
    return null;
}