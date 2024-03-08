import { useState } from "react";
import { useEffect } from "react";

export function useRequest(request) {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request();
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();

    }, []);
    
    return {
        isPending,
        data
    };
}