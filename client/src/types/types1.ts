import React from "react";

export interface EventCardProps {
  title: string;
  description: string;
  organiser: string;
  location: string;
  registrations: [
    {
      firstName: string;
      lastName: string;
      userRef: string;
    }
  ];
  userRef: string;
  _id: string;
}

export interface TriggerProps {
  children: React.ReactNode;
}

export interface EditBioTriggerProps extends TriggerProps {
  bio: string;
}

export interface EditDomainsTriggerProps extends TriggerProps {
  currDomains: string[];
}

export interface ConfirmPostDeleteTriggerProps extends TriggerProps {
  postId: string;
}

export interface ConfirmTimeLineDeleteTriggerProps extends TriggerProps {
  timelineId: string;
}

export interface PostCardProps {
  title: string;
  content: string;
  email: string;
  upvoteRefs: string[];
  downvoteRefs: string[];
  replyRefs: string[];
  replies: ReplyType[];
  _id: string;
}

export interface ReplyType {
  content: string;
  fullname: string;
  imageUrl: string;
}

export interface ReplyDialogTriggerProps extends TriggerProps {
  replies: ReplyType[];
  postId: string;
  onOpenChange?: () => void;
  loading?: boolean;
  setReplies: Function;
}

export interface TimelineType {
  title: string;
  content: string;
  date: string;
  tag: string;
  links: string[];
  _id: string;
  userRef: string;
}
