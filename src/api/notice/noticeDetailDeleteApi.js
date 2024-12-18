import axios from "axios";
import { Notice } from "../api";

export const noticeDetailDeleteApi = async (idx) => {
    console.log("삭제 api");
    await axios.post(Notice.DeleteNoticeList, { noticeSeq: idx });
};