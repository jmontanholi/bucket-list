CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL REFERENCES users (id),
    title VARCHAR(30) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'TODO' CHECK (status IN ('TODO', 'IN PROGRESS', 'DONE')) NOT NULL,
    is_public BOOLEAN NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    list_id INTEGER NOT NULL REFERENCES lists (id),
    created_by VARCHAR NOT NULL REFERENCES users(id),
    description TEXT NOT NULL,
    item_order INTEGER NOT NULL,
    is_done BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE item_suggestions (
    item_id INTEGER NOT NULL REFERENCES items (id),
    list_id INTEGER NOT NULL REFERENCES lists (id),
    suggested_by VARCHAR NOT NULL REFERENCES users (id),
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (item_id, list_id)
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    created_by VARCHAR NOT NULL REFERENCES users (id),
    title VARCHAR(30) NOT NULL
);

CREATE TABLE list_tag (
    list_id INTEGER NOT NULL REFERENCES lists (id),
    tag_id INTEGER NOT NULL REFERENCES tag (id),
    PRIMARY KEY (list_id, tag_id)
);