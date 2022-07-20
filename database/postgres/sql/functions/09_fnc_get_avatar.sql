CREATE OR REPLACE FUNCTION fnc_get_avatar(id INT)
RETURNS BYTEA
AS
$$
  DECLARE headers   TEXT;
  DECLARE blob      BYTEA;

  BEGIN
    SELECT FORMAT(
      '[{"Content-Type": "%s"},'
       '{"Content-Disposition": "inline; filename=\"%s\""},'
       '{"Cache-Control": "max-age=259200"}]'
      , avatars.format, avatars.name)
    FROM avatars WHERE avatars.id = fnc_get_avatar.id into headers;

    PERFORM set_config('response.headers', headers, true);

    SELECT img FROM avatars WHERE avatars.id = fnc_get_avatar.id INTO blob;
    IF FOUND
    THEN RETURN(blob);
    ELSE RAISE SQLSTATE 'PT404' USING
      message = 'NOT FOUND',
      detail = 'File not found',
      hint = FORMAT('%s seems to be an invalid file id', fnc_get_avatar.id);
    END IF;
  END
$$ LANGUAGE plpgsql;