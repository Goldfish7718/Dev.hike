import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { EventCardProps, PostCardProps, TimelineType } from "@/types/types1";
import TimelineCard from "./TimelineCard";
import { ScrollArea } from "./ui/scroll-area";
import PostCard from "./PostCard";
import EventCard from "./EventCard";

export interface FeedSummaryType {
  summary: string;
  event: EventCardProps;
  timeline: TimelineType;
  post: PostCardProps;
}

interface FeedSummaryProps {
  feedSummary: FeedSummaryType | null;
  dialogOpen: boolean;
}

const FeedSummaryTrigger = ({ dialogOpen, feedSummary }: FeedSummaryProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(dialogOpen);

  useEffect(() => {
    if (feedSummary) {
      setOpen(true);
    }
  }, [feedSummary]);

  if (matches)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[80dvh]">
          <ScrollArea className="h-full">
            <div className="p-2">
              <p>{feedSummary?.summary}</p>
              {feedSummary?.timeline && (
                <TimelineCard {...feedSummary?.timeline} />
              )}
              {/* {feedSummary?.post && <PostCard {...feedSummary.post} />}
              {feedSummary?.event && <EventCard {...feedSummary.event} />} */}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-4 h-[80dvh]">
        <p>{feedSummary?.summary}</p>
      </DrawerContent>
    </Drawer>
  );
};

export default FeedSummaryTrigger;
