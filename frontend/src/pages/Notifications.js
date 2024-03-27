import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvitations } from "../features/invite/inviteSlice";

export default function Notifications() {
  const { invitations } = useSelector((state) => state.invite);
  const dispatch = useDispatch();

  function copyTeamId(teamId) {
    navigator.clipboard.writeText(teamId);
  }

  useEffect(() => {
    dispatch(getInvitations());
  }, []);

  return (
    <div className="flex justify-center items-center pt-8">
      {invitations.length == 0 ? (
        <h1>You have no notifications</h1>
      ) : (
        invitations.map((invite) => {
          console.log(invite);
          return (
            <div className="flex flex-col gap-4">
              <h1 className="uppercase text-lg font-medium">
                {invite.invitor} invited you to join {invite.teamname} team
              </h1>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <h1 className="text-md font-medium">
                    TeamId : {invite.teamid}
                  </h1>
                  <button
                    className="font-medium text-red-500"
                    onClick={() => copyTeamId(invite.teamid)}
                  >
                    Copy id
                  </button>
                </div>
                <h1 className="font-medium text-blue-500">Members</h1>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
