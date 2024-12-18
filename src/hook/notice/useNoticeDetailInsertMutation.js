import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailInsertApi } from "../../api/notice/noticeDetailInsertApi";

export const useNoticeDetailInsertMutation = (detailValue, idx) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => noticeDetailInsertApi(detailValue.value, idx),
        mutationKey: ['noticeInsert'],
        onSuccess: () => {
            router.go(-1);
            queryClient.invalidateQueries({
                queryKey: ["noticeList"],
            });
        },
    })
}