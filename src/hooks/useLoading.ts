import { ElLoading } from "element-plus";
import { ref } from "vue";

interface LoadingProps {
    lock?: boolean,
    text?: string,
    background?: string
}

const defaultProps: LoadingProps ={
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
}

export default function useLoading(loadingProps?: LoadingProps) {
    const startLoading = () => {
        return ElLoading.service(loadingProps ?? defaultProps);
    }

    const stopLoading = (): void => {
        ElLoading.service().close()
    }

    return {
        startLoading,
        stopLoading
    }
}