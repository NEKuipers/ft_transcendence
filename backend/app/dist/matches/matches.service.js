"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const http_1 = require("http");
let MatchesService = class MatchesService {
    constructor() {
        this.ongoing_matches = [
            {
                match_id: 42,
                player_one: "nkuipers",
                player_two: "tmullan",
                mode: "Classic",
            },
            {
                match_id: 45,
                player_one: "jsimonis",
                player_two: "mrpers",
                mode: "Speedup",
            },
            {
                match_id: 270,
                player_one: "jevan-de",
                player_two: "cwinner",
                mode: "Classic",
            },
        ];
        this.matches = [
            {
                match_id: 1,
                player_one: "nkuipers",
                player_two: "tmullan",
                mode: "Classic",
                player_one_score: 3,
                player_two_score: 2,
            },
            {
                match_id: 2,
                player_one: "aaaa",
                player_two: "bbbb",
                mode: "Speedup",
                player_one_score: 5,
                player_two_score: 0,
            },
            {
                match_id: 3,
                player_one: "cccc",
                player_two: "dddd",
                mode: "Classic",
                player_one_score: 1,
                player_two_score: 4,
            },
            {
                match_id: 4,
                player_one: "jevan-de",
                player_two: "nkuipers",
                mode: "Classic",
                player_one_score: 1,
                player_two_score: 4,
            },
            {
                match_id: 5,
                player_one: "jsimonis",
                player_two: "nkuipers",
                mode: "Speedup",
                player_one_score: 1,
                player_two_score: 4,
            },
        ];
    }
    updateOngoingMatchesFromDataBase() {
        return new Promise((accept, reject) => {
            let req = (0, http_1.request)({
                hostname: 'localhost',
                port: +process.env.PGREST_PORT,
                path: "/vw_spectate",
                method: "GET",
            }, res => {
                if (res.statusCode != 200) {
                    console.log(`Got statusCode: ${res.statusCode} (${res.statusMessage}): ${JSON.stringify(res.headers, null, 4)}`);
                    reject(res);
                    return;
                }
                res = res.setEncoding('utf8');
                let combined = "";
                res.on("data", chunk => {
                    combined += chunk;
                });
                res.on("end", () => {
                    let json = JSON.parse(combined);
                    let new_matches = [];
                    for (let match of json) {
                        new_matches.push({
                            match_id: match.match_id,
                            player_one: match.player_one,
                            player_two: match.player_two,
                            mode: match.game_mode,
                        });
                    }
                    accept(new_matches);
                });
            });
            req.on("error", error => {
                reject(error);
            });
            req.end();
        });
    }
    findAllCompleted() {
        return this.matches;
    }
    findAllOngoing() {
        return this.updateOngoingMatchesFromDataBase();
    }
    findOne(id) {
        return this.ongoing_matches.find(ongoing_matches => ongoing_matches.match_id == id);
    }
    createMatch(match) {
        return "Match created";
    }
    updateMatch(id, match) {
        return "Match updated";
    }
};
MatchesService = __decorate([
    (0, common_1.Injectable)()
], MatchesService);
exports.MatchesService = MatchesService;
//# sourceMappingURL=matches.service.js.map