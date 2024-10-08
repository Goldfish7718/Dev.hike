import {
  Award,
  Check,
  Link,
  Settings,
  Sparkles,
  Star,
  Trash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  ConfirmTimeLineDeleteTriggerProps,
  TimelineType,
} from "@/types/types1";
import { Separator } from "./ui/separator";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useUser } from "@/context/UserContext";
import useTimeline from "@/hooks/useTimeline";
import { cx } from "class-variance-authority";

interface TimelineCardProps extends TimelineType {
  className?: string;
}

const TimelineCard = ({
  title,
  content,
  links,
  tag,
  date,
  userRef,
  _id,
  className,
}: TimelineCardProps) => {
  const icons = [
    <Star size={24} className="mx-3" />,
    <Check size={24} className="mx-3" />,
    <Award size={24} className="mx-3" />,
    <Sparkles size={24} className="mx-3" />,
  ];

  const { currProfile } = useUser();

  return (
    <Card className={cx("w-full my-3", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icons[Math.floor(Math.random() * 4)]}
          <span>{title}</span>
          <div className="ml-auto">
            <span className="text-sm  text-gray-400">{date}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-5">
          <div>
            <p>{content}</p>
          </div>
          <Button className="mt-4" variant="outline">
            <Settings size={18} className="mx-2" />
            {tag}
          </Button>
        </div>
        <div className="flex flex-col gap-1 mx-5">
          {links.map((link) => (
            <div className="flex items-center">
              <Link size={12} className="mx-1" />
              <span
                className="text-sm hover:cursor-pointer hover:underline"
                onClick={() => (window.location.href = link)}>
                {link}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      {userRef === currProfile?._id && (
        <>
          <Separator />
          <CardFooter>
            <div>
              <ConfirmTimeLineDeleteTrigger timelineId={_id}>
                <Button className="mt-4" variant="destructive">
                  Delete from Timeline <Trash size={24} className="mx-2" />
                </Button>
              </ConfirmTimeLineDeleteTrigger>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

const ConfirmTimeLineDeleteTrigger = ({
  children,
  timelineId,
}: ConfirmTimeLineDeleteTriggerProps) => {
  const matches = useMediaQuery("(min-width: 768px)");

  const { requestDeleteTimeline } = useTimeline();

  if (matches)
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete from Timeline</DialogTitle>
          </DialogHeader>
          <div className="m-2 w-full">
            <p>Are you sure you want to delete this post from your Timeline?</p>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button>No</Button>
            </DialogClose>
            <Button
              onClick={() => requestDeleteTimeline(timelineId)}
              variant="destructive">
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Delete from Timeline</DrawerTitle>
        </DrawerHeader>
        <div className="m-2 w-full">
          <p>Are you sure you want to delete this post from your Timeline?</p>
        </div>

        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full">No</Button>
          </DrawerClose>
          <Button
            onClick={() => requestDeleteTimeline(timelineId)}
            className="w-full"
            variant="destructive">
            Yes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TimelineCard;
