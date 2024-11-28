import Profile from "./components/Profile";

const page = ({
  params,
  searchParams,
}: {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}) => {
  return <Profile userId={searchParams?.id} />;
};

export default page;
