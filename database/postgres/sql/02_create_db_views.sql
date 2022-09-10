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
        m.status,
        start_time,
        end_time,
        p1_points,
        p2_points,
        reason,
        game_mode
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
        m.status,
        start_time,
        end_time,
        p1_points,
        p2_points,
        reason,
        game_mode
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
)
SELECT
    mh.user_id  AS user_id,
    p1.username AS p1_name,
    p2.username AS p2_name,
    w.username  AS winner,
    mh.id       AS match_id,
    mh.status   AS match_status,
    start_time  AS start_time,
    end_time    AS end_time,
    p1_points   AS p1_points,
    p2_points   AS p2_points,
    reason      AS loose_reason,
    game_mode   AS game_mode
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
** Displays all your friends ongoing matches so that you're able
** to join as a spectator.
*/
CREATE OR REPLACE VIEW vw_spectate
AS
SELECT
    m.id            AS match_id,
    u1.username     AS p1_name,
    u2.username     AS p2_name,
    m.game_mode     AS game_mode
FROM matches m
    INNER JOIN users u1
        ON m.player_one = u1.id
    INNER JOIN users u2
        ON m.player_two = u2.id
WHERE m.status = 'ongoing';


/*
** Displays a user his list of friends and potential friends to be
** (i.e. a friend request has been send)
*/
CREATE OR REPLACE VIEW vw_friends
AS
SELECT
    u.id            AS user_id,
    u.username      AS username,
    f.to_user_id    AS to_user_id,
    fu.username     AS to_username,
    fu.status       AS friend_status,
	fu.avatar_id	AS friend_avatar_id,
    f.status        AS request_status,
    f.send_time     AS send_time,
    f.response_time AS response_time
FROM users u
    INNER JOIN friends f
        ON u.id = f.from_user_id
    INNER JOIN users fu
        ON f.to_user_id = fu.id
WHERE f.status IN ('send', 'accepted');


/*
** Displays the list of friend requests for each user
*/
CREATE OR REPLACE VIEW vw_friend_requests
AS
SELECT
    u.id            AS user_id,
    u.username      AS username,
    f.from_user_id  AS from_user_id,
    fu.username     AS from_username,
    f.send_time     AS send_time
FROM users u
    INNER JOIN friends f
        ON u.id = f.to_user_id
    INNER JOIN users fu
        ON f.from_user_id = fu.id
WHERE f.status = 'send';


/*
** Displays all users that you blocked (so that you may unblock them)
*/
CREATE OR REPLACE VIEW vw_blocked_users
AS
SELECT
    u.id                AS user_id,
    bu.blocked_user_id  AS blocked_user_id,
    buu.username        AS blocked_user_name
FROM users u
    INNER JOIN blocked_users bu
        ON u.id = bu.blocked_by_id
    INNER JOIN users buu
        ON bu.blocked_user_id = buu.id;


/*
** Displays the leader board based using the matches meta fields
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
        start_time,
        end_time,
        p1_points,
        p2_points,
        reason,
        game_mode
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_one
    WHERE m.status = 'finished'

    UNION ALL

    /* get all games as player 2 */
    SELECT
        u.id,
        u.username,
        m.player_one,
        m.player_two,
        m.winner_id,
        start_time,
        end_time,
        p1_points,
        p2_points,
        reason,
        game_mode
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
    WHERE m.status = 'finished'
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
** Displays the user's profile information including
** match wins, losses en leaderboard position.
*/
CREATE OR REPLACE VIEW public.vw_profile
AS
SELECT
	summary.user_id		                        AS user_id,
	summary.username	                        AS username,
	summary.avatar_id	                        AS avatar_id,
	summary.is_logged_in						AS is_logged_in,
	summary.games_won	                        AS games_won,
	summary.games_lost	                        AS games_lost,
	DENSE_RANK() OVER (ORDER BY games_won DESC, games_lost ASC, username ASC) AS ranking
FROM
(
WITH match_history
AS
(
    /* get all games as player 1 */
    SELECT
        u.id        AS user_id,
        m.winner_id
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_one

    UNION ALL

    /* get all games as player 2 */
    SELECT
        u.id        AS user_id,
        m.winner_id
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
)
SELECT
	u.id		AS user_id,
	u.username	AS username,
	u.avatar_id	AS avatar_id,
	u.is_logged_in AS is_logged_in,
    SUM
    (
      CASE
        WHEN u.id = m.winner_id
		THEN 1
		ELSE 0
	  END
    )			AS games_won,
	SUM
	(
	  CASE
		WHEN u.id != m.winner_id
		THEN 1
		ELSE 0
	  END
	)			AS games_lost
FROM users u
    LEFT JOIN match_history m
        ON u.id = m.user_id
GROUP BY
	u.id,
	u.username,
	u.avatar_id,
	u.is_logged_in
) AS summary;

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
** Display the participants for all channels
*/
CREATE OR REPLACE VIEW public.vw_participants
AS
SELECT
    c.id                AS channel_id,
    c.name              AS channel_name,
    c.type              AS channel_type,
    c.owner_id          AS channel_owner_id,
    c.is_closed         AS channel_is_closed,
    p.participant_id    AS participant_id,
    u.username          AS participant_username,
	p.is_joined			AS participant_is_joined,
    p.is_admin          AS participant_is_admin,
    p.muted_until       AS participant_muted_until,
    p.is_banned         AS participant_is_banned
FROM channels c
    INNER JOIN participants p
        ON c.id = p.channel_id
    INNER JOIN users u
        ON p.participant_id = u.id;

/*
** Display of all custom types
*/
CREATE OR REPLACE VIEW public.vw_types
AS
SELECT
    t.typname       AS type_name,
    e.enumsortorder AS order,
    e.enumlabel     AS label
FROM pg_enum e
    INNER JOIN pg_type t
        ON e.enumtypid = t.oid;
