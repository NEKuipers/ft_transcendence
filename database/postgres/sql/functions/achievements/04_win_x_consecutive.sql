/*
** This function returns the amount of consecutive matches
** a user has won since the last time he played.
*/
CREATE OR REPLACE FUNCTION fnc_achievement_win_x_consecutive(BIGINT, BIGINT)
RETURNS BOOLEAN
LANGUAGE SQL
AS
$func$
WITH match_history
AS
(
    /* get all games as player 1 */
    SELECT
        m.winner_id,
        TO_TIMESTAMP(
            m.meta->'start_time',
            'YYYY-MM-DD HH24:MI:SS'
        ) AS start_time
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_one
    WHERE u.id = $1

    UNION ALL

    /* get all games as player 2 */
    SELECT
        m.winner_id,
        TO_TIMESTAMP(
            m.meta->'start_time',
            'YYYY-MM-DD HH24:MI:SS'
        ) AS start_time
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
    WHERE u.id = $1
)
SELECT
CASE
    WHEN (COUNT(m1.winner_id) = $2)
    THEN TRUE
    ELSE FALSE
END
FROM match_history m1
WHERE NOT EXISTS
(
    /*
    ** The idea is to look for tuples such that no tuple with an
    ** earlier start_time and a different winner_id exists.
    */
    SELECT *
    FROM match_history m2
    WHERE m1.winner_id <> m2.winner_id
        AND m2.start_time > m1.start_time
)
AND m1.winner_id = $1
$func$;