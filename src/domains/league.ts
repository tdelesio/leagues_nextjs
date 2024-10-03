import { Week } from "./game";

export interface League  {
    id: string;
    leagueName: string;
    paidFor: number;
    money: boolean|true;
    free: boolean|false;
    active: boolean|false;
    password: string;
    speads: boolean|true;
    doubleEnabled: boolean|true;
    entryFee: number;
    weeklyFee: number;
    firstPlacePercent: number;
    secondPlacePercent: number;
    thirdPlacePercent: number;
    fourthPlacePercent: number;
    fifthPlacePercent: number;
    doubleType: number;
    banker: boolean|true;
    season: Season;
    adminId: string;
}

export interface LeagueName {
    leagueName: string;
    leagueId: string;
    seasonId: string;
}

export interface Season {
    id: string;
    superBowlNumber: number;
    leagueType: number
    // weeks: Week[]
}

// export interface PlayerLeague {
//     id: string;
//     leagueName: string;
//     password: string;
// }

export const LeagueTypes = Object.freeze({
    pickem: 1,
    suicide: 2,
});
