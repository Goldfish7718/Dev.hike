import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

interface SearchDialogTriggerProps {
    children: React.ReactNode;
}

const SearchDialogTrigger = ({ children }: SearchDialogTriggerProps) => {

    const matches = useMediaQuery('(min-width: 768px)')

    if (matches)
        return (
            <Dialog>
                <DialogTrigger className="flex" asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="flex py-12 gap-2">
                    <Input type="text" placeholder="Search..."></Input>
                    <Button>Search<Search size={18} className="mx-2" /></Button>
                </DialogContent>
            </Dialog>
        )

    return (
        <Drawer>
            <DrawerTrigger className="flex" asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="flex gap-2">
                <DrawerHeader>
                    <DrawerTitle>
                        Search Dev.hike
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-2 px-2">
                    <Input type="text" placeholder="Search..."></Input>
                    <Button className="w-full">Search<Search size={18} className="mx-2" /></Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default SearchDialogTrigger