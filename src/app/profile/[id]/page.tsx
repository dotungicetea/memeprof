import Profile from "../components/Profile";

type Props = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

const ProfileIdPage = ({ params, searchParams }: Props) => {
  return <Profile userId={params?.id} />;
};

export default ProfileIdPage;
