/*
** Displays the match history for all users
*/
CREATE OR REPLACE VIEW vw_matches
AS
WITH match_history
AS
(
    /* get all games as player 1 */
    SELECT
        u.id        AS user_id,
        m.player_one,
        m.player_two,
        m.winner_id,
        m.id,
        m.meta
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_one

    UNION ALL

    /* get all games as player 2 */
    SELECT
        u.id        AS user_id,
        m.player_one,
        m.player_two,
        m.winner_id,
        m.id,
        m.meta
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
)
SELECT
    mh.user_id  AS user_id,
    p1.username AS player_one,
    p2.username AS player_two,
    w.username  AS winner,
    mh.id       AS match_id,
    mh.meta     AS meta
FROM match_history mh
    INNER JOIN users u
        ON mh.user_id = u.id
    INNER JOIN users p1
        ON mh.player_one = p1.id
    INNER JOIN users p2
        ON mh.player_two = p2.id
    INNER JOIN users w
        ON mh.user_id = w.id;


/*
** Displays the leader board based using the matches.meta field
*/
CREATE OR REPLACE VIEW public.vw_ladder
AS
WITH match_history
AS
(
    /* get all games as player 1 */
    SELECT
        u.id,
        u.username,
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
        u.username,
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
    mh.username AS username,
    COUNT(*)    AS games_played,
    SUM
    (
      CASE
        WHEN mh.winner_id = mh.id
        THEN 1
        ELSE 0
      END
    )           AS wins,
    SUM
    (
      CASE
        WHEN mh.winner_id = mh.id
        THEN 0
        ELSE 1
      END
    )           AS losses
FROM match_history mh
GROUP BY mh.id, mh.username;

/*
** Displays the achievements for all users
*/
CREATE OR REPLACE VIEW public.vw_achievements
AS
SELECT
    u.id            AS user_id,
    u.username      AS username,
    a.id            AS achievement_id,
    a.name          AS achievement_name,
    a.description   AS achievement_description
FROM users u
    INNER JOIN user_achievements ua
        ON u.id = ua.user_id
    INNER JOIN achievements a
        ON ua.achievement_id = a.id;

/*
** Display of all custom types
*/
CREATE OR REPLACE VIEW vw_types
AS
SELECT
    t.typname       AS type_name,
    e.enumsortorder AS order,
    e.enumlabel     AS label
FROM pg_enum e
    INNER JOIN pg_type t
        ON e.enumtypid = t.oid;
