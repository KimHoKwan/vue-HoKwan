import axios from "axios";
import { Notice } from "../api";
import { useUserInfo } from "../../stores/userInfo";

export const noticeDetailInsertApi = async (detailValue, idx) => {
    const userInfo = useUserInfo();
    const textData = {
        ...detailValue,
        noticeSeq: idx,
        context: detailValue.content,
        loginId: userInfo.user.loginId,
    };
    await axios.post(Notice.InsertNoticeList, textData);
};