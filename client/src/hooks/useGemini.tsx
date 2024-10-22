import { FeedSummaryType } from "@/components/FeedSummaryTrigger";
import { TimelineSummaryType } from "@/components/TimelineSummaryTrigger";
import { API_URL } from "@/main";
import { CombinedData } from "@/views/Dashboard";
import axios from "axios";
import { useState } from "react";

interface UseGeminiReturns {
  // DATA
  profileSummary: string;
  profileSummaryLoading: boolean;

  timelineSummary: TimelineSummaryType | null;
  timelineSummaryLoading: boolean;

  feedSummary: FeedSummaryType | null;
  feedSummaryLoading: boolean;

  // FUNCTIONS
  requestProfileSummarization: (userId: string) => void;
  requestTimelineSummarization: (userId: string) => void;
  requestFeedSummarization: (feed: CombinedData[]) => void;
}

const useGemini = (): UseGeminiReturns => {
  const [profileSummary, setProfileSummary] = useState("");
  const [profileSummaryLoading, setProfileSummaryLoading] = useState(false);

  const [timelineSummary, setTimelineSummary] =
    useState<TimelineSummaryType | null>(null);
  const [timelineSummaryLoading, setTimelineSummaryLoading] = useState(false);

  const [feedSummary, setFeedSummary] = useState<FeedSummaryType | null>(null);
  const [feedSummaryLoading, setFeedSummaryLoading] = useState(false);

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

  const requestFeedSummarization = async (feed: CombinedData[]) => {
    try {
      setFeedSummaryLoading(true);

      const res = await axios.post(`${API_URL}/gemini/summarize-feed`, {
        feed,
      });

      setFeedSummary(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setFeedSummaryLoading(false);
    }
  };

  return {
    profileSummary,
    profileSummaryLoading,

    timelineSummary,
    timelineSummaryLoading,

    feedSummary,
    feedSummaryLoading,

    requestProfileSummarization,
    requestTimelineSummarization,
    requestFeedSummarization,
  };
};

export default useGemini;
