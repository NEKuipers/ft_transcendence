/*
** View vw_matches ...
*/
CREATE OR REPLACE VIEW vw_matches
AS
WITH match_history
AS
(
    /* get all games as player 1 */
    SELECT
        u.id,
        m.player_one,
        m.player_two,
        m.winner_id,
        m.meta
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_one

    UNION ALL

    /* get all games as player 2 */
    SELECT
        u.id,
        m.player_one,
        m.player_two,
        m.winner_id,
        m.meta
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
)
SELECT
    mh.id       AS user_id,
    p1.username AS player_one,
    p2.username AS player_two,
    w.username  AS winner,
    mh.meta     AS meta
FROM match_history mh
    INNER JOIN users u
        ON mh.id = u.id
    INNER JOIN users p1
        ON mh.player_one = p1.id
    INNER JOIN users p2
        ON mh.player_two = p2.id
    INNER JOIN users w
        ON mh.id = w.id
