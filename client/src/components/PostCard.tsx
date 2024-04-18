import { ArrowBigDown, ArrowBigUp, MessagesSquare, Users } from 'lucide-react'
import ReplyDialogTrigger from './ReplyDialogTrigger'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { PostCardProps } from '@/types/types1'

const PostCard = (post: PostCardProps) => {
  return (
    <Card className="lg:w-2/3 w-full my-4">
        <CardHeader className="flex flex-row gap-4 justify-start items-center">
            <Avatar className="h-12 w-12">
            <AvatarImage src="" />
            <AvatarFallback className="flex">PM</AvatarFallback>
            </Avatar>
            <div  className="flex flex-col">
            <CardTitle>{post.title}</CardTitle>
            <Button className="dark:text-gray-300 text-gray-900 justify-start p-0" variant="link" size="sm">{post.email}</Button>
            </div>
        </CardHeader>
        <Separator />
        <CardContent>
            <div className="mt-4">
            <p>{post.content}</p>
            <div className="mt-4 items-center">
                <Button className="w-1/8 flex gap-2" variant='outline'><Users size={24} className="mx-1"/>{post.tags}</Button>
            </div>
            </div>
        </CardContent>
        <Separator />
        <div className="flex">
            <Button className="w-full" variant='ghost' ><ArrowBigUp size={24} className="mx-1"/>{post.upvotes} Upvotes</Button>
            <Button className="w-full" variant='ghost'><ArrowBigDown size={24} className="mx-1"/>{post.downvotes} Downvotes</Button>
            <ReplyDialogTrigger>
                <Button className="w-full" variant='ghost'><MessagesSquare size={24} className="mx-1"/>{post.replies} Replies</Button>
            </ReplyDialogTrigger>
        </div>
    </Card>
  )
}

export default PostCard