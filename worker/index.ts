import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { PetsArraySchema } from './schemas'

const app = new OpenAPIHono()

// Define the GET /api/pets route
const getPetsRoute = createRoute({
  method: 'get',
  path: '/api/pets',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PetsArraySchema,
        },
      },
      description: 'List of available pets',
    },
  },
})

// Implement the GET /api/pets endpoint with hardcoded data
app.openapi(getPetsRoute, (c) => {
  const pets = [
    {
      id: 'pet-002',
      name: 'Copper',
      species: 'dog',
      primaryBreed: 'Beagle',
      secondaryBreed: null,
      ageInMonths: 18,
      gender: 'female',
      size: 'medium',
      color: 'Tricolor (Brown, Black, White)',
      appearance: 'Short, dense, glossy coat; floppy ears; soulful brown eyes.',
      description: 'Sweet, vocal scent hound. Loves sniffing and following trails. Needs a secure yard and patient training due to wanderlust.',
      vaccinated: true,
      temperament: ['curious', 'vocal', 'social', 'scent-driven'],
      adoptionFee: 300,
      dateArrived: '2025-10-01',
      adoptionStatus: 'available',
      location: 'Main Shelter - Quiet Wing',
      image: 'https://example.com/pet-002.jpg',
    },
    {
      id: 'pet-003',
      name: 'Sky',
      species: 'bird',
      primaryBreed: 'Cockatiel',
      secondaryBreed: 'Lutino',
      ageInMonths: 24,
      gender: 'male',
      size: 'small',
      color: 'Yellow and Orange',
      appearance: 'Bright yellow feathers, orange cheek patches, crest, and a long tail.',
      description: 'Very sweet and tame. Loves to sit on shoulders and whistle. Requires daily social interaction and time outside the cage.',
      vaccinated: true,
      temperament: ['social', 'calm', 'whistles', 'needs routine'],
      adoptionFee: 150,
      dateArrived: '2025-09-05',
      adoptionStatus: 'available',
      location: 'Foster Home - Bird Room',
      image: 'https://example.com/pet-003.jpg',
    },
  ]

  return c.json(pets, 200)
})

// OpenAPI documentation endpoint
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Cloudpets API',
    description: 'Pet adoption service API',
  },
})

app.notFound((c) => {
  return c.body(null, 404)
})

export default app
