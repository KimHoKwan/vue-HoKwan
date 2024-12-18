<template>
    <div>
        <div v-if="isLoading">기다려주세요</div>
        <div v-else>
            <ContextBox>공지사항 상세조회</ContextBox>
            <label> 제목 : <input type="text" v-model="detailValue.title" /> </label>
            <label> 내용 : <input type="text" v-model="detailValue.content" /> </label>
            파일 : <input type="file" style="display: none" id="fileInput" />
            <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
            <div>
                <!-- <div v-if="imageUrl">
                    <label>미리보기</label>
                    <img :src="imageUrl" />
                </div>
                <div v-else>
                    <label>파일명</label>
                </div> -->
            </div>
            <div class="button-box">
                <button @click="params.idx ? handlerUpdateBtn() : handlerInsertBtn()">
                    {{ params.idx ? "수정" : "저장" }}
                </button>
                <button v-if="params.idx" @click="handlerDeleteBtn">삭제</button>
                <button @click="$router.go(-1)">뒤로가기</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { useRoute } from "vue-router";
import { useNoticeDetailUpdateMutation } from '../../../../hook/notice/useNoticeDetailUpdateMutation';
import { useNoticeDetailInsertMutation } from '../../../../hook/notice/useNoticeDetailInsertMutation';
import { useNoticeDetailDeleteMutation } from '../../../../hook/notice/useNoticeDetailDeleteMutation';

const { params } = useRoute();
const detailValue = ref({});

// 계산된 속성, 우리가 값을 내보내기 전에 복잡한 로직을 수행해야하는 경우가 있어요
// 근데 그거를 매번 할 수는 없습니다.
// 같은 로직을 매번 사용하는 수고를 덜어줘요
// 왜냐? -> 계산된 속성(computed) 최초에 한 번만 로직을 수행하고, 그 이후에는 computed에 저장된 값만 사용합니다.
const searchDetail = async () => {
    const result = await axios.post("/api/board/noticeDetailBody.do", { noticeSeq: params.idx });
    return result.data;
};

const {
    data: noticeDetail,
    isLoading,
    isSuccess,
} = useQuery({
    queryKey: ["noticeDetail"],
    queryFn: searchDetail,
    enabled: !!params.idx,
});

watchEffect(() => {
    if (isSuccess.value && noticeDetail.value && params.idx) {
        detailValue.value = toRaw(noticeDetail.value.detail);
    }
});

// 업데이트
// const updateNoticeDetail = async () => {
//     const textData = {
//         ...detailValue.value,
//         noticeSeq: params.idx,
//         context: detailValue.value.content,
//     };
//     await axios.post("/api/board/noticeUpdateBody.do", textData);
// };
// const { mutate: handlerUpdateBtn } = useMutation({
//     mutationFn: updateNoticeDetail,
//     onSuccess: apiSuccess,
//     mutationKey: ['noticeUpdate'],
// });
const { mutate: handlerUpdateBtn } = useNoticeDetailUpdateMutation(detailValue, params.idx);

// 추가
// const insertNoticeDetail = async () => {
//     const textData = {
//         title: detailValue.value.title,
//         context: detailValue.value.content,
//         loginId: userInfo.user.loginId,
//     };
//     await axios.post("/api/board/noticeSaveBody.do", textData);
// };
// const { mutate: handlerInsertBtn } = useMutation({
//     mutationFn: insertNoticeDetail,
//     onSuccess: apiSuccess,
//     mutationKey: ["noticeInsert"],
// });
const { mutate: handlerInsertBtn } = useNoticeDetailInsertMutation(detailValue, params.idx);

// 삭제
// const deleteNoticeDetail = async () => {
//     await axios.post("/api/board/noticeDeleteBody.do", { noticeSeq: params.idx });
// };
// const { mutate: handlerDeleteBtn } = useMutation({
//     mutationFn: deleteNoticeDetail,
//     onSuccess: apiSuccess,
//     mutationKey: ["noticeDelete"],
// });
const { mutate: handlerDeleteBtn } = useNoticeDetailDeleteMutation(params.idx);

</script>

<style lang="scss" scoped>
.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;
}

label {
    display: flex;
    flex-direction: column;
}

input[type="text"] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 400px;
}

img {
    width: 100px;
    height: 100px;
}

.img-label {
    margin-top: 10px;
    padding: 6px 25px;
    background-color: #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;

    &:hover {
        background-color: #45a049;
        color: white;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

.button-box {
    text-align: right;
    margin-top: 10px;
}
button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
</style>
