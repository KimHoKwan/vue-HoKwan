import axios from "axios";

export const noticeDetailUpdateApi = async (detailValue, idx) => {
    const textData = {
        ...detailValue,
        noticeSeq: idx,
        context: detailValue.content,
    };
    await axios.post("/api/board/noticeUpdateBody.do", textData);
};