import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { TimelineType } from "@/types/types1";
import { ScrollArea } from "./ui/scroll-area";
import TimelineCard from "./TimelineCard";

export interface TimelineSummaryType {
  summary: string;
  top_achievements: string[];
  topTimelinePosts: TimelineType[];
}

interface TimelineSummaryProps {
  timelineSummary: TimelineSummaryType | null;
  dialogOpen: boolean;
}

const TimelineSummaryTrigger = ({
  dialogOpen,
  timelineSummary,
}: TimelineSummaryProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(dialogOpen);

  useEffect(() => {
    if (timelineSummary) {
      setOpen(true);
    }
  }, [timelineSummary]);

  if (matches)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[80dvh]">
          <ScrollArea className="h-full">
            <p>{timelineSummary?.summary}</p>
            <div>
              {timelineSummary?.topTimelinePosts.map((timelinePost) => (
                <TimelineCard {...timelinePost} key={timelinePost._id} />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-4 h-[70dvh] ">
        <ScrollArea className="h-full">
          <p>{timelineSummary?.summary}</p>
          <div className="my-4">
            {timelineSummary?.topTimelinePosts.map((timelinePost) => (
              <TimelineCard {...timelinePost} key={timelinePost._id} />
            ))}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default TimelineSummaryTrigger;
