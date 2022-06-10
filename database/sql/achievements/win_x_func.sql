CREATE OR REPLACE FUNCTION fnc_achievement_win_x(bigint, bigint)
RETURNS boolean
LANGUAGE SQL
AS
$func$
WITH _matches
AS
(
   /* get all wins as player 1 */
    SELECT u.id
    FROM users u
        INNER JOIN matches p1
            ON u.id = p1.player_one
    WHERE u.id = $1

    UNION ALL

    /* get all wins as player 2 */
    SELECT u.id
    FROM users u
        INNER JOIN matches p2
            ON u.id = p2.player_two
    WHERE u.id = $1
)
SELECT
CASE
    WHEN (COUNT(_matches.id) > $2)
    THEN TRUE
    ELSE FALSE
END
FROM _matches;
$func$;