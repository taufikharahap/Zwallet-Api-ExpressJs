CREATE TABLE public.testimoni (
    id SERIAL NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    CONSTRAINT testimoni_pk PRIMARY KEY (id),
	CONSTRAINT testimoni_users_fk 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE ON UPDATE CASCADE
);