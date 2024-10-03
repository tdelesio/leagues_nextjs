import { Team } from "./teams";

export interface Player {
    email: string;
    username: string;
    password: string;
    name: string;
    favTeam: Team;
    venmoHandle: string;
    memberLevel: number;
    status: number;
}

export const MemberLevels = Object.freeze({
    user: 1,
    leagueAdmin: 2,
    admin: 3
});

export const PlayerStatus = Object.freeze({
    active: 1,
    unpaid: 2,
    disabed: 3,
});