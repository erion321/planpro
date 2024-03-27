import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createTeam,
  getTeams,
  joinTeamByInvite,
  selectTeam,
} from "../features/teams/teamSlice";
import Board from "../components/Board";
import Column from "../components/Column";
import Invite from "../components/Invite";
import { resetBoardState } from "../features/boards/boardSlice";
import { resetColumnState } from "../features/columns/columnSlice";
import { resetTaskState } from "../features/tasks/taskSlice";

export default function Team() {
  const [team, setTeam] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [showTeams, setShowTeams] = useState(false);
  const [teamIdToJoin, setTeamIdToJoin] = useState("");
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { teams, selectedTeam } = useSelector((state) => state.teams);
  const { selectedBoard } = useSelector((state) => state.boards);
  const navigate = useNavigate();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    dispatch(createTeam(team));
  };

  const handleJoinTeamByInvite = async (e) => {
    e.preventDefault();
    dispatch(joinTeamByInvite(teamIdToJoin));
    dispatch(resetBoardState());
    dispatch(resetColumnState());
    dispatch(resetTaskState());
  };

  console.log(searchUser.length);

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    dispatch(getTeams(token));
    dispatch(selectTeam());
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-start gap-4 p-4">
      <div className="flex flex-row gap-8">
        <form className="flex items-center bg-gray-300 rounded-md border">
          <input
            className="px-1 py-2 outline-none"
            type="text"
            placeholder="Create a team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
          <button className="px-2 font-medium" onClick={handleCreateTeam}>
            Create
          </button>
        </form>
        <form className="flex items-center rounded-md bg-gray-300 border">
          <input
            className="px-1 py-2 outline-none"
            type="text"
            placeholder="Join a team [paste team id]"
            value={teamIdToJoin}
            onChange={(e) => setTeamIdToJoin(e.target.value)}
          />
          <button className="px-2 font-medium" onClick={handleJoinTeamByInvite}>
            Join
          </button>
        </form>
      </div>
      {selectedTeam && (
        <>
          <div className="flex gap-8">
            <div className="bg-blue-300 transition ease-in-out delay-150 flex flex-col items-center justify-center p-2 rounded-md">
              <div className="flex flex-row gap-2">
                <h1 className="capitalize text-lg font-medium">
                  {selectedTeam.name}
                </h1>
                <button onClick={() => setShowTeams(!showTeams)}>
                  Show teams
                </button>
              </div>

              <div
              /* className={` ${
                showTeams
                  ? " transition ease-in-out delay-150 h-full"
                  : "invisible"
              }`} */
              >
                {teams.map((team, index) => {
                  const { id } = team;
                  return (
                    <h1 key={index} onClick={() => dispatch(selectTeam(id))}>
                      {team.name}
                    </h1>
                  );
                })}
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Invite a teammate"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              {searchUser.length > 0 && <Invite searchUser={searchUser} />}
            </div>
          </div>
          <div className="flex gap-4">
            <Board />
            <Column />
          </div>
        </>
      )}
    </div>
  );
}
