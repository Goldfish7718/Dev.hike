import React from "react";

export interface EventCardProps {
    eventTitle: string;
    eventDesc: string;
    eventOrganizer: string;
    eventLocation: string;
    eventRegistrations: number;
}

export interface TriggerProps {
    children: React.ReactNode
}

export interface EditBioTriggerProps extends TriggerProps {
    bio: string;
}

export interface EditDomainsTriggerProps extends TriggerProps {
    currDomains: string[]
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
    tags: number;
    upvoteRefs: string[];
    downvoteRefs: string[];
    replyRefs: string[];
    _id?: string;
}

export interface ReplyType {
    content: string;
    fullname: string;
    imageUrl: string;
}

export interface ReplyDialogTriggerProps extends TriggerProps {
    replies: ReplyType[];
    postId: string;
    onOpenChange: () => void;
    loading: boolean;
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
