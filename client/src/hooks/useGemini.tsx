import { API_URL } from "@/main";
import axios from "axios";
import { useState } from "react";

interface UseGeminiReturns {
  // DATA
  profileSummary: string;
  profileSummaryLoading: boolean;

  // FUNCTIONS
  requestProfileSummarization: (userId: string) => void;
}

const useGemini = (): UseGeminiReturns => {
  const [profileSummary, setProfileSummary] = useState("");
  const [profileSummaryLoading, setProfileSummaryLoading] = useState(false);

  const requestProfileSummarization = async (userId: string) => {
    try {
      setProfileSummaryLoading(true);
      const res = await axios.get(
        `${API_URL}/gemini/summarize-profile/${userId}`
      );
      setProfileSummary(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setProfileSummaryLoading(false);
    }
  };

  return {
    profileSummary,
    profileSummaryLoading,

    requestProfileSummarization,
  };
};

export default useGemini;
