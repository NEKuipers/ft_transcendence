CREATE OR REPLACE FUNCTION fnc_achievement_play_x(BIGINT, BIGINT)
RETURNS BOOLEAN
LANGUAGE SQL
AS
$func$
WITH match_history
AS
(
    /* get all games as player 1 */
    SELECT u.id
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_one
    WHERE u.id = $1

    UNION ALL

    /* get all games as player 2 */
    SELECT u.id
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
    WHERE u.id = $1
)
SELECT
CASE
    WHEN (COUNT(match_history.id) = $2)
    THEN TRUE
    ELSE FALSE
END
FROM match_history;
$func$;