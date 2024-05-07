CREATE TABLE public.transactions (
	id serial NOT NULL,
	sender_id serial NOT NULL,
	receiver_id serial NOT NULL,
	amount int NOT NULL,
	notes text NULL,
	date_transaction TIMESTAMP not null DEFAULT NOW(),
	created_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT transactions_pk PRIMARY KEY (id),
	CONSTRAINT sender_fk FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE on update cascade,
	CONSTRAINT receiver_fk FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE on update cascade
);