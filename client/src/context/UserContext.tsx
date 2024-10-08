import { useToast } from "@/components/ui/use-toast";
import {
  ChangeEventHandler,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser as clerkUseUser, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { API_URL } from "@/main";
import { useNavigate } from "react-router-dom";

export interface UserType {
  email: string;
  bio: string;
  timelineRefs: string[];
  postRefs: string[];
  domains: string[];
  interests: string[];
  followerRefs: string[];
  followingRefs: string[];
  clerkId: string;
  socials: {
    github: string;
    twitter: string;
    linkedIn: string;
    instagram: string;
    other: string[];
  };
  profileInitiated: boolean;
  fullname: string;
  imageUrl: string;
  _id: string;
}

interface UserContextType {
  email: string;
  bio: string;
  domains: string[];
  interests: string[];
  socials: {
    github: string;
    twitter: string;
    linkedIn: string;
    instagram: string;
    other?: string[];
  };
  profileInitiated: boolean;

  // GENERAL VARIABLES
  loading: boolean;
  currProfile: UserType | null;

  // SETTER FUNCTIONS
  setBio: Function;
  handleSocialsChange: ChangeEventHandler;
  setCurrProfile: Function;

  // SHARED METHODS
  addDomain: (domain: string) => void;
  addInterest: (interest: string) => void;
  removeDomainByIndex: (index: number) => void;
  removeInterestByIndex: (index: number) => void;

  // API METHODS
  postProfileData: () => void;
  fetchCurrentProfile: () => void;
  requestDeleteProfile: () => void;
}

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);
export const useUser = (): UserContextType => {
  return useContext(UserContext) as UserContextType;
};

function UserProvider({ children }: UserContextProps) {
  const [domains, setDomains] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [profileInitiated, setProfileInitiated] = useState(false);

  const [currProfile, setCurrProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const { user } = clerkUseUser();
  const clerk = useClerk();
  const email = user?.emailAddresses[0].emailAddress as string;
  const navigate = useNavigate();

  const [socials, setSocials] = useState({
    github: "",
    twitter: "",
    linkedIn: "",
    instagram: "",
  });

  const { toast } = useToast();

  const addDomain = (domain: string) => {
    if (domain === " " || !domain)
      toast({
        title: "Please Enter a domain!",
        duration: 3000,
        variant: "destructive",
      });
    else if (domains.length === 8)
      toast({
        title: "You can app only upto 8 domains!",
        duration: 3000,
        variant: "destructive",
      });
    else {
      const newDomains = [...domains, domain];
      setDomains(newDomains);
    }
  };

  const addInterest = (interest: string) => {
    if (interest === " " || !interest)
      toast({
        title: "Please Enter an interest!",
        duration: 3000,
        variant: "destructive",
      });
    else if (interests.length === 3)
      toast({
        title: "You can app only upto 3 interests!",
        duration: 3000,
        variant: "destructive",
      });
    else {
      const newInterests = [...interests, interest];
      setInterests(newInterests);
    }
  };

  const removeDomainByIndex = (index: number) => {
    setDomains((prevItems) => {
      return [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
    });
  };

  const removeInterestByIndex = (index: number) => {
    setInterests((prevItems) => {
      return [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
    });
  };

  const handleSocialsChange = (event: any) => {
    const { name, value } = event.target;
    setSocials((prevSocials) => ({
      ...prevSocials,
      [name]: value,
    }));
  };

  const postProfileData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/profile/initiate`, {
        email: user?.emailAddresses[0].emailAddress,
        bio,
        domains,
        interests,
        socials,
        clerkId: user?.id,
      });

      const { profileInitiated } = res.data.newProfile;
      setProfileInitiated(profileInitiated);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry an error occured!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentProfile = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/profile/fetchUser/clerkId/${user?.id}`
      );

      if (!res.data.user) {
        navigate("/initiate-profile/1");
      } else setCurrProfile(res.data.user);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry an error occured!",
        variant: "destructive",
      });
    }
  };

  const requestDeleteProfile = async () => {
    try {
      await axios.delete(`${API_URL}/profile/deleteUser/${user?.id}`);

      clerk.signOut();
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry an error occured!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) fetchCurrentProfile();
  }, [user]);

  const value = {
    // SHARED VARIABLES
    domains,
    interests,
    socials,
    profileInitiated,
    loading,
    bio,
    email,
    currProfile,

    // SHARED SETTER FUNCTIONS
    setBio,
    handleSocialsChange,
    setCurrProfile,

    // SHARED METHODS
    addDomain,
    addInterest,
    removeDomainByIndex,
    removeInterestByIndex,

    // API METHODS
    postProfileData,
    fetchCurrentProfile,
    requestDeleteProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
