USE transcendence;

CREATE EXTENSION IF NOT EXISTS hstore;

/*
** The users table ...
*/
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users
(
    id                              BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username                        VARCHAR(256),
    status                          TEXT CHECK (status IN ('online', 'offline', 'ingame')),
    oauth_refresh_token             VARCHAR(1024),
    oauth_token_expiration_time     TIMESTAMP,
    is_logged_in                    BOOL
);

/*
** The two_factor_auth table ...
*/
DROP TABLE IF EXISTS public.two_factor_auth;

CREATE TABLE public.two_factor_auth
(
    id        BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id   BIGINT REFERENCES public.users(id),
    seed      VARCHAR(64)
);

/*
** The avatars table ...
**
** Following documentation shows how to retrieve images directly:
** https://postgrest.org/en/stable/how-tos/providing-images-for-img.html?highlight=blob
*/
DROP TABLE IF EXISTS public.avatars;

CREATE TABLE public.avatars
(
  id      BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES public.users(id),
  img     BYTEA,
  width   INT,
  height  INT,
  name    VARCHAR(256),
  format  TEXT CHECK (format IN ('img/png', 'img/jpg'))
);

/*
** The friends table
** 
** based on:
** https://dba.stackexchange.com/questions/1688/how-to-design-a-relationship-database-table-to-store-friendship-relationship
*/
DROP TABLE IF EXISTS public.friends;

CREATE TABLE public.friends
(
    id              BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    from_user_id    BIGINT REFERENCES public.users(id),
    to_user_id      BIGINT REFERENCES public.users(id),
    status          TEXT CHECK (status IN ('send', 'declinded', 'accepted')),
    send_time       TIMESTAMP DEFAULT now(),
    response_time   TIMESTAMP
);

/*
** The channels table
*/
DROP TABLE IF EXISTS public.channels CASCADE;

CREATE TABLE public.channels
(
    id            BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name          VARCHAR(256),
    type          TEXT CHECK (type IN ('public', 'private', 'protected', 'direct')),
    owner_id      BIGINT REFERENCES public.users(id),
    is_closed     BOOL
);

/*
** The participants table
**
** ban_meta example:
** '
**  "banned_by"   => int
**  "banned_at"   => datetime
**  "reason"      => varchar
**  "timeout"     => int
** '
*/
DROP TABLE IF EXISTS public.participants;

CREATE TABLE public.participants
(
    id              BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    participant_id  BIGINT REFERENCES public.users(id),
    is_admin        BOOL,
    is_muted        BOOL,
    is_banned       BOOL,
    ban_meta        HSTORE,
    channel_id      BIGINT REFERENCES public.channels(id)
);

/*
** The messages table ...
*/
DROP TABLE IF EXISTS public.messages;

CREATE TABLE public.messages
(
    id          BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    channel_id  BIGINT REFERENCES public.channels(id),
    user_id     BIGINT REFERENCES public.users(id),
    message     TEXT
);

/*
** The blocked_users table ...
*/
DROP TABLE IF EXISTS public.blocked_users;

CREATE TABLE public.blocked_users
(
    id                BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    blocked_by_id     BIGINT REFERENCES public.users(id),
    blocked_user_id   BIGINT REFERENCES public.users(id)
);

/*
** The matches table ...
**
** meta example:
** '
**  "start_time"  => datetime
**  "end_time"    => datetime
**  "p1_points"   => int
**  "p2_points"   => int
** '
**
** options example:
** '
** ??
** '
*/
DROP TABLE IF EXISTS public.matches;

CREATE TABLE public.matches
(
    id          BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    player_one  BIGINT REFERENCES public.users(id),
    player_two  BIGINT REFERENCES public.users(id),
    winner_id   BIGINT REFERENCES public.users(id) CHECK (winner_id IN (player_one, player_two)),
    meta        HSTORE,
    options     HSTORE
);

/*
** The achievements table ...
**
** func_args example:
** '
**  "user_id"   => int
**  "x"         => int
** '
*/
DROP TABLE IF EXISTS public.achievements CASCADE;

CREATE TABLE public.achievements
(
    id          INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name        VARCHAR(32),
    description VARCHAR(256),
    func_name   VARCHAR(64),
    func_args   INT[]
);

/*
** The user_achievements table ...
*/
DROP TABLE IF EXISTS public.user_achievements;

CREATE TABLE public.user_achievements
(
    id              BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id         BIGINT REFERENCES public.users(id),
    achievement_id  INT REFERENCES public.achievements(id)
);

