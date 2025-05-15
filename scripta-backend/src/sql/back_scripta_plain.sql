CREATE SCHEMA IF NOT EXISTS public AUTHORIZATION postgres;

CREATE SEQUENCE IF NOT EXISTS public.dictionaries_id_dictionarie_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.dictionaries (
    id_dictionarie integer NOT NULL DEFAULT nextval('public.dictionaries_id_dictionarie_seq'::regclass),
    word character varying(100) NOT NULL,
    setting_id integer NOT NULL,
    CONSTRAINT dictionaries_id_pk PRIMARY KEY (id_dictionarie)
);

ALTER SEQUENCE public.dictionaries_id_dictionarie_seq OWNED BY public.dictionaries.id_dictionarie;

CREATE SEQUENCE IF NOT EXISTS public.pages_id_page_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.pages (
    id_page integer NOT NULL DEFAULT nextval('public.pages_id_page_seq'::regclass),
    domain character varying NOT NULL,
    setting_id integer NOT NULL,
    CONSTRAINT pages_id_pk PRIMARY KEY (id_page)
);

ALTER SEQUENCE public.pages_id_page_seq OWNED BY public.pages.id_page;

CREATE SEQUENCE IF NOT EXISTS public.settings_id_setting_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.settings (
    id_setting integer NOT NULL DEFAULT nextval('public.settings_id_setting_seq'::regclass),
    state boolean NOT NULL,
    tone character varying(10) NOT NULL,
    verbosity character varying(6) NOT NULL,
    users_id integer NOT NULL,
    state_dictionarie boolean NOT NULL,
    CONSTRAINT settings_pk PRIMARY KEY (id_setting),
    CONSTRAINT settings_users_id_uq UNIQUE (users_id)
);

ALTER SEQUENCE public.settings_id_setting_seq OWNED BY public.settings.id_setting;

CREATE SEQUENCE IF NOT EXISTS public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.users (
    id integer NOT NULL DEFAULT nextval('public.users_id_seq'::regclass),
    username character varying(45) NOT NULL,
    email character varying(320) NOT NULL,
    password text NOT NULL,
    CONSTRAINT users_id_pk PRIMARY KEY (id),
    CONSTRAINT users_email_uq UNIQUE (email)
);

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

ALTER TABLE public.dictionaries
    ADD CONSTRAINT dictionaries_settings_id_fk FOREIGN KEY (setting_id) REFERENCES public.settings(id_setting);

ALTER TABLE public.pages
    ADD CONSTRAINT pages_settings_id_fk FOREIGN KEY (setting_id) REFERENCES public.settings(id_setting);

ALTER TABLE public.settings
    ADD CONSTRAINT settings_users_id_fk FOREIGN KEY (users_id) REFERENCES public.users(id);
