import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersToInvite, inviteUser } from "../features/invite/inviteSlice";

export default function Invite({ searchUser }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.invite);
  const { selectedTeam } = useSelector((state) => state.teams);

  console.log(users);

  useEffect(() => {
    dispatch(getUsersToInvite(searchUser));
  }, [searchUser]);

  return (
    <div>
      {users.map((user) => {
        return (
          <div
            onClick={() =>
              dispatch(inviteUser({ user_id: user.id, team: selectedTeam }))
            }
          >
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        );
      })}
    </div>
  );
}
