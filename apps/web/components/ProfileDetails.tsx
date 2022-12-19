import { User } from "@supabase/supabase-js";
import React, { FC, useEffect, useState } from "react";
import Spinner from "./Spinner";

type Props = {
  user: User | null;
};

const ProfileDetails: FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user != null) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="bg-white/10 relative flex flex-col items-center font-silk dark:bg-black/30 border-[0.05rem] border-gray-600  border-opacity-30 backdrop-blur-md py-10 px-8 md:px-16 rounded-xl shadow-xl">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <img
            className="absolute h-[100px] w-[100px] blur-lg translate-y-5 scale-75 rounded-md mb-10"
            src={user?.user_metadata.avatar_url}
          />
          <img
            className="rounded-md h-[100px] w-[100px] z-10 mb-10"
            src={user?.user_metadata.avatar_url}
          />
        </>
      )}

      <p className="text-xl">{user?.user_metadata.full_name}</p>
      <p className="text-sm text-gray-500">{user?.user_metadata.email}</p>
    </div>
  );
};

export default ProfileDetails;
