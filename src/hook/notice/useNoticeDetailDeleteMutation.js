import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailDeleteApi } from "../../api/notice/noticeDetailDeleteApi";

export const useNoticeDetailDeleteMutation = (idx) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => noticeDetailDeleteApi(idx),
        mutationKey: ['noticeDelete'],
        onSuccess: () => {
            router.go(-1);
            queryClient.invalidateQueries({
                queryKey: ["noticeList"],
            });
        },
    })
};