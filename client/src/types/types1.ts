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

export interface PostCardProps {
    title: string;
    content: string;
    email: string;
    tags: number;
    upvotes: number;
    downvotes: number;
    replies: number;
}

