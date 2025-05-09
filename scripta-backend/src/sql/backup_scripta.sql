toc.dat                                                                                             0000600 0004000 0002000 00000026071 15006312447 0014447 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   /    2                }            postgres    17.2    17.2 (    C           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false         D           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false         E           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false         F           1262    5    postgres    DATABASE     ~   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE postgres;
                     postgres    false         G           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                        postgres    false    4934                     2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false         H           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4         �            1259    24615    dictionaries    TABLE     �   CREATE TABLE public.dictionaries (
    id_dictionarie integer NOT NULL,
    word character varying(100) NOT NULL,
    setting_id integer NOT NULL
);
     DROP TABLE public.dictionaries;
       public         heap r       postgres    false    4         �            1259    24614    dictionaries_id_dictionarie_seq    SEQUENCE     �   CREATE SEQUENCE public.dictionaries_id_dictionarie_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.dictionaries_id_dictionarie_seq;
       public               postgres    false    222    4         I           0    0    dictionaries_id_dictionarie_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.dictionaries_id_dictionarie_seq OWNED BY public.dictionaries.id_dictionarie;
          public               postgres    false    221         �            1259    24627    pages    TABLE     �   CREATE TABLE public.pages (
    id_page integer NOT NULL,
    domain character varying NOT NULL,
    setting_id integer NOT NULL
);
    DROP TABLE public.pages;
       public         heap r       postgres    false    4         �            1259    24626    pages_id_page_seq    SEQUENCE     �   CREATE SEQUENCE public.pages_id_page_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.pages_id_page_seq;
       public               postgres    false    4    224         J           0    0    pages_id_page_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.pages_id_page_seq OWNED BY public.pages.id_page;
          public               postgres    false    223         �            1259    24601    settings    TABLE     �   CREATE TABLE public.settings (
    id_setting integer NOT NULL,
    state boolean NOT NULL,
    tone character varying(10) NOT NULL,
    verbosity character varying(6) NOT NULL,
    users_id integer NOT NULL,
    state_dictionarie boolean NOT NULL
);
    DROP TABLE public.settings;
       public         heap r       postgres    false    4         �            1259    24600    settings_id_setting_seq    SEQUENCE     �   CREATE SEQUENCE public.settings_id_setting_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.settings_id_setting_seq;
       public               postgres    false    220    4         K           0    0    settings_id_setting_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.settings_id_setting_seq OWNED BY public.settings.id_setting;
          public               postgres    false    219         �            1259    24594    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(45) NOT NULL,
    email character varying(320) NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.users;
       public         heap r       postgres    false    4         �            1259    24593    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218    4         L           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217         �           2604    24618    dictionaries id_dictionarie    DEFAULT     �   ALTER TABLE ONLY public.dictionaries ALTER COLUMN id_dictionarie SET DEFAULT nextval('public.dictionaries_id_dictionarie_seq'::regclass);
 J   ALTER TABLE public.dictionaries ALTER COLUMN id_dictionarie DROP DEFAULT;
       public               postgres    false    221    222    222         �           2604    24630    pages id_page    DEFAULT     n   ALTER TABLE ONLY public.pages ALTER COLUMN id_page SET DEFAULT nextval('public.pages_id_page_seq'::regclass);
 <   ALTER TABLE public.pages ALTER COLUMN id_page DROP DEFAULT;
       public               postgres    false    223    224    224         �           2604    24604    settings id_setting    DEFAULT     z   ALTER TABLE ONLY public.settings ALTER COLUMN id_setting SET DEFAULT nextval('public.settings_id_setting_seq'::regclass);
 B   ALTER TABLE public.settings ALTER COLUMN id_setting DROP DEFAULT;
       public               postgres    false    220    219    220         �           2604    24597    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218         >          0    24615    dictionaries 
   TABLE DATA           H   COPY public.dictionaries (id_dictionarie, word, setting_id) FROM stdin;
    public               postgres    false    222       4926.dat @          0    24627    pages 
   TABLE DATA           <   COPY public.pages (id_page, domain, setting_id) FROM stdin;
    public               postgres    false    224       4928.dat <          0    24601    settings 
   TABLE DATA           c   COPY public.settings (id_setting, state, tone, verbosity, users_id, state_dictionarie) FROM stdin;
    public               postgres    false    220       4924.dat :          0    24594    users 
   TABLE DATA           >   COPY public.users (id, username, email, password) FROM stdin;
    public               postgres    false    218       4922.dat M           0    0    dictionaries_id_dictionarie_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.dictionaries_id_dictionarie_seq', 5, true);
          public               postgres    false    221         N           0    0    pages_id_page_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pages_id_page_seq', 5, true);
          public               postgres    false    223         O           0    0    settings_id_setting_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.settings_id_setting_seq', 1, false);
          public               postgres    false    219         P           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public               postgres    false    217         �           2606    24620    dictionaries dictionaries_id_pk 
   CONSTRAINT     i   ALTER TABLE ONLY public.dictionaries
    ADD CONSTRAINT dictionaries_id_pk PRIMARY KEY (id_dictionarie);
 I   ALTER TABLE ONLY public.dictionaries DROP CONSTRAINT dictionaries_id_pk;
       public                 postgres    false    222         �           2606    24634    pages pages_id_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_id_pk PRIMARY KEY (id_page);
 ;   ALTER TABLE ONLY public.pages DROP CONSTRAINT pages_id_pk;
       public                 postgres    false    224         �           2606    24606    settings settings_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pk PRIMARY KEY (id_setting);
 >   ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_pk;
       public                 postgres    false    220         �           2606    24608    settings settings_users_id_uq 
   CONSTRAINT     \   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_users_id_uq UNIQUE (users_id);
 G   ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_users_id_uq;
       public                 postgres    false    220         �           2606    24660    users users_email_uq 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_uq UNIQUE (email);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_uq;
       public                 postgres    false    218         �           2606    24599    users users_id_pk 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_pk PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.users DROP CONSTRAINT users_id_pk;
       public                 postgres    false    218         �           2606    24621 (   dictionaries dictionaries_settings_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.dictionaries
    ADD CONSTRAINT dictionaries_settings_id_fk FOREIGN KEY (setting_id) REFERENCES public.settings(id_setting);
 R   ALTER TABLE ONLY public.dictionaries DROP CONSTRAINT dictionaries_settings_id_fk;
       public               postgres    false    222    4766    220         �           2606    24635    pages pages_settings_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_settings_id_fk FOREIGN KEY (setting_id) REFERENCES public.settings(id_setting);
 D   ALTER TABLE ONLY public.pages DROP CONSTRAINT pages_settings_id_fk;
       public               postgres    false    224    4766    220         �           2606    24609    settings settings_users_id_fk    FK CONSTRAINT     }   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_users_id_fk FOREIGN KEY (users_id) REFERENCES public.users(id);
 G   ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_users_id_fk;
       public               postgres    false    220    218    4764                                                                                                                                                                                                                                                                                                                                                                                                                                                                               4926.dat                                                                                            0000600 0004000 0002000 00000000005 15006312447 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4928.dat                                                                                            0000600 0004000 0002000 00000000005 15006312447 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4924.dat                                                                                            0000600 0004000 0002000 00000000005 15006312447 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4922.dat                                                                                            0000600 0004000 0002000 00000000005 15006312447 0014247 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           restore.sql                                                                                         0000600 0004000 0002000 00000021677 15006312447 0015403 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dictionaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dictionaries (
    id_dictionarie integer NOT NULL,
    word character varying(100) NOT NULL,
    setting_id integer NOT NULL
);


ALTER TABLE public.dictionaries OWNER TO postgres;

--
-- Name: dictionaries_id_dictionarie_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dictionaries_id_dictionarie_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dictionaries_id_dictionarie_seq OWNER TO postgres;

--
-- Name: dictionaries_id_dictionarie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dictionaries_id_dictionarie_seq OWNED BY public.dictionaries.id_dictionarie;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pages (
    id_page integer NOT NULL,
    domain character varying NOT NULL,
    setting_id integer NOT NULL
);


ALTER TABLE public.pages OWNER TO postgres;

--
-- Name: pages_id_page_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pages_id_page_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pages_id_page_seq OWNER TO postgres;

--
-- Name: pages_id_page_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pages_id_page_seq OWNED BY public.pages.id_page;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    id_setting integer NOT NULL,
    state boolean NOT NULL,
    tone character varying(10) NOT NULL,
    verbosity character varying(6) NOT NULL,
    users_id integer NOT NULL,
    state_dictionarie boolean NOT NULL
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- Name: settings_id_setting_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.settings_id_setting_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.settings_id_setting_seq OWNER TO postgres;

--
-- Name: settings_id_setting_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.settings_id_setting_seq OWNED BY public.settings.id_setting;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(45) NOT NULL,
    email character varying(320) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: dictionaries id_dictionarie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionaries ALTER COLUMN id_dictionarie SET DEFAULT nextval('public.dictionaries_id_dictionarie_seq'::regclass);


--
-- Name: pages id_page; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages ALTER COLUMN id_page SET DEFAULT nextval('public.pages_id_page_seq'::regclass);


--
-- Name: settings id_setting; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings ALTER COLUMN id_setting SET DEFAULT nextval('public.settings_id_setting_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: dictionaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dictionaries (id_dictionarie, word, setting_id) FROM stdin;
\.
COPY public.dictionaries (id_dictionarie, word, setting_id) FROM '$$PATH$$/4926.dat';

--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pages (id_page, domain, setting_id) FROM stdin;
\.
COPY public.pages (id_page, domain, setting_id) FROM '$$PATH$$/4928.dat';

--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings (id_setting, state, tone, verbosity, users_id, state_dictionarie) FROM stdin;
\.
COPY public.settings (id_setting, state, tone, verbosity, users_id, state_dictionarie) FROM '$$PATH$$/4924.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
\.
COPY public.users (id, username, email, password) FROM '$$PATH$$/4922.dat';

--
-- Name: dictionaries_id_dictionarie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dictionaries_id_dictionarie_seq', 5, true);


--
-- Name: pages_id_page_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pages_id_page_seq', 5, true);


--
-- Name: settings_id_setting_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.settings_id_setting_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: dictionaries dictionaries_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionaries
    ADD CONSTRAINT dictionaries_id_pk PRIMARY KEY (id_dictionarie);


--
-- Name: pages pages_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_id_pk PRIMARY KEY (id_page);


--
-- Name: settings settings_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pk PRIMARY KEY (id_setting);


--
-- Name: settings settings_users_id_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_users_id_uq UNIQUE (users_id);


--
-- Name: users users_email_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_uq UNIQUE (email);


--
-- Name: users users_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_pk PRIMARY KEY (id);


--
-- Name: dictionaries dictionaries_settings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionaries
    ADD CONSTRAINT dictionaries_settings_id_fk FOREIGN KEY (setting_id) REFERENCES public.settings(id_setting);


--
-- Name: pages pages_settings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_settings_id_fk FOREIGN KEY (setting_id) REFERENCES public.settings(id_setting);


--
-- Name: settings settings_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_users_id_fk FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 