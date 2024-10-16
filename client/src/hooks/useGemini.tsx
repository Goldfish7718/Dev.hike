import { TimelineSummaryType } from "@/components/TimelineSummaryTrigger";
import { API_URL } from "@/main";
import axios from "axios";
import { useState } from "react";

interface UseGeminiReturns {
  // DATA
  profileSummary: string;
  profileSummaryLoading: boolean;

  timelineSummary: TimelineSummaryType | null;
  timelineSummaryLoading: boolean;

  // FUNCTIONS
  requestProfileSummarization: (userId: string) => void;
  requestTimelineSummarization: (userId: string) => void;
}

const useGemini = (): UseGeminiReturns => {
  const [profileSummary, setProfileSummary] = useState("");
  const [profileSummaryLoading, setProfileSummaryLoading] = useState(false);

  const [timelineSummary, setTimelineSummary] =
    useState<TimelineSummaryType | null>(null);
  const [timelineSummaryLoading, setTimelineSummaryLoading] = useState(false);

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

  const requestTimelineSummarization = async (userId: string) => {
    try {
      setTimelineSummaryLoading(true);
      const res = await axios.get(
        `${API_URL}/gemini/summarize-timeline/${userId}`
      );

      setTimelineSummary(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setTimelineSummaryLoading(false);
    }
  };

  return {
    profileSummary,
    profileSummaryLoading,

    timelineSummary,
    timelineSummaryLoading,

    requestProfileSummarization,
    requestTimelineSummarization,
  };
};

export default useGemini;
