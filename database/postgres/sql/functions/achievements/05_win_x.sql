CREATE OR REPLACE FUNCTION fnc_achievement_win_x(BIGINT, BIGINT)
RETURNS BOOLEAN
LANGUAGE SQL
AS
$func$
WITH match_history
AS
(
    SELECT u.id
    FROM users u
        INNER JOIN matches m
            ON u.id = m.winner_id
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