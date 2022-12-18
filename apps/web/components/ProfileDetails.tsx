import { User } from "@supabase/supabase-js";
import React, { FC } from "react";

type Props = {
  user: User | null;
};

const ProfileDetails: FC<Props> = ({ user }) => {
  return (
    <div>
      <img src={user?.user_metadata.avatar_url} />
      <p>{user?.user_metadata.full_name}</p>
    </div>
  );
};

export default ProfileDetails;
