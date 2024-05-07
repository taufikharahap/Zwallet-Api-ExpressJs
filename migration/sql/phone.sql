CREATE TABLE public.phone (
	id serial NOT NULL,
	user_id serial NOT NULL,
	phone_number varchar(20) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT phone_pk PRIMARY KEY (id),
	CONSTRAINT phone_users_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE on update cascade
);