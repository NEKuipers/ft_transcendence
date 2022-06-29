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
                mode: "HyperPong",
            },
            {
                match_id: 46,
                player_one: "jevan-de",
                player_two: "cwinner",
                mode: "Classic",
            },
        ];
    }
    findAll() {
        return this.ongoing_matches;
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