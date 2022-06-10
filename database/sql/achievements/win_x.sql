SELECT
    CASE
        WHEN (COUNT(_matches.id) > 3)
        THEN 1
        ELSE 0
    END
    AS achieved
FROM
(
    /* get all wins as player 1 */
    SELECT u.id
    FROM users u
        INNER JOIN matches p1
            ON u.id = p1.player_one
    WHERE u.id = 1

    UNION ALL

    /* get all wins as player 2 */
    SELECT u.id
    FROM users u
        INNER JOIN matches p2
            ON u.id = p2.player_two
    WHERE u.id = 1
)
AS _matches;