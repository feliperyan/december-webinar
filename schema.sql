-- Create Pets table matching the schema in worker/schemas.ts
CREATE TABLE IF NOT EXISTS pets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    primaryBreed TEXT NOT NULL,
    secondaryBreed TEXT,
    ageInMonths INTEGER NOT NULL,
    gender TEXT NOT NULL,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    appearance TEXT NOT NULL,
    description TEXT NOT NULL,
    vaccinated INTEGER NOT NULL, -- SQLite uses INTEGER for boolean (0 = false, 1 = true)
    temperament TEXT NOT NULL, -- Stored as JSON array string
    adoptionFee INTEGER NOT NULL,
    dateArrived TEXT NOT NULL, -- ISO date format string
    adoptionStatus TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT NOT NULL
);

-- Insert example data from README.md
INSERT INTO pets (id, name, species, primaryBreed, secondaryBreed, ageInMonths, gender, size, color, appearance, description, vaccinated, temperament, adoptionFee, dateArrived, adoptionStatus, location, image) VALUES
('pet-002', 'Copper', 'dog', 'Beagle', NULL, 18, 'female', 'medium', 'Tricolor (Brown, Black, White)', 'Short, dense, glossy coat; floppy ears; soulful brown eyes.', 'Sweet, vocal scent hound. Loves sniffing and following trails. Needs a secure yard and patient training due to wanderlust.', 1, '["curious","vocal","social","scent-driven"]', 300, '2025-10-01', 'available', 'Main Shelter - Quiet Wing', 'https://example.com/pet-002.jpg'),
('pet-003', 'Sky', 'bird', 'Cockatiel', 'Lutino', 24, 'male', 'small', 'Yellow and Orange', 'Bright yellow feathers, orange cheek patches, crest, and a long tail.', 'Very sweet and tame. Loves to sit on shoulders and whistle. Requires daily social interaction and time outside the cage.', 1, '["social","calm","whistles","needs routine"]', 150, '2025-09-05', 'available', 'Foster Home - Bird Room', 'https://example.com/pet-002.jpg');
