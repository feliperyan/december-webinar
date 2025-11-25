import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import {
  PetsArraySchema,
  PetSchema,
  PetIdParamSchema,
  CreatePetSchema,
  ErrorSchema,
  SuccessMessageSchema,
} from './schemas'

const app = new OpenAPIHono<{ Bindings: Env }>()

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

// Implement the GET /api/pets endpoint with database query
app.openapi(getPetsRoute, async (c) => {
  const db = c.env.DB
  
  const result = await db.prepare('SELECT * FROM pets').all()
  
  // Parse the temperament JSON string back to array for each pet
  const pets = result.results.map((pet: any) => ({
    ...pet,
    temperament: JSON.parse(pet.temperament),
    vaccinated: Boolean(pet.vaccinated),
  }))

  return c.json(pets, 200)
})

// Define the GET /api/pets/{id} route
const getPetByIdRoute = createRoute({
  method: 'get',
  path: '/api/pets/{id}',
  request: {
    params: PetIdParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PetSchema,
        },
      },
      description: 'Pet details',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Pet not found',
    },
  },
})

// Implement the GET /api/pets/{id} endpoint
app.openapi(getPetByIdRoute, async (c) => {
  const { id } = c.req.valid('param')
  const db = c.env.DB

  const result = await db.prepare('SELECT * FROM pets WHERE id = ?').bind(id).first()

  if (!result) {
    return c.json({ error: 'Pet not found' }, 404)
  }

  const pet = {
    ...result,
    temperament: JSON.parse(result.temperament as string),
    vaccinated: Boolean(result.vaccinated),
  } as any

  return c.json(pet, 200)
})

// Define the POST /api/pets/{id}/apply route
const applyForPetRoute = createRoute({
  method: 'post',
  path: '/api/pets/{id}/apply',
  request: {
    params: PetIdParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SuccessMessageSchema,
        },
      },
      description: 'Application submitted successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Pet not found',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Pet is not available for adoption',
    },
  },
})

// Implement the POST /api/pets/{id}/apply endpoint
app.openapi(applyForPetRoute, async (c) => {
  const { id } = c.req.valid('param')
  const db = c.env.DB

  // Check if pet exists and is available
  const pet = await db.prepare('SELECT * FROM pets WHERE id = ?').bind(id).first()

  if (!pet) {
    return c.json({ error: 'Pet not found' }, 404)
  }

  if (pet.adoptionStatus !== 'available') {
    return c.json({ error: 'Pet is not available for adoption' }, 400)
  }

  // Update the adoption status
  await db
    .prepare('UPDATE pets SET adoptionStatus = ? WHERE id = ?')
    .bind('adopted', id)
    .run()

  // Fetch the updated pet
  const updatedPet = await db.prepare('SELECT * FROM pets WHERE id = ?').bind(id).first()

  if (!updatedPet) {
    return c.json({ error: 'Failed to fetch updated pet' }, 400)
  }

  const petData = {
    ...updatedPet,
    temperament: JSON.parse(updatedPet.temperament as string),
    vaccinated: Boolean(updatedPet.vaccinated),
  } as any

  return c.json(
    {
      message: 'Application submitted successfully',
      pet: petData,
    },
    200
  )
})

// Define the POST /api/pets/create route
const createPetRoute = createRoute({
  method: 'post',
  path: '/api/pets/create',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreatePetSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: PetSchema,
        },
      },
      description: 'Pet created successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Invalid request data',
    },
  },
})

// Implement the POST /api/pets/create endpoint
app.openapi(createPetRoute, async (c) => {
  const petData = c.req.valid('json')
  const db = c.env.DB

  // Generate ID if not provided
  const petId = petData.id || `pet-${Date.now()}`

  // Prepare data for insertion
  const temperamentJson = JSON.stringify(petData.temperament)
  const vaccinatedInt = petData.vaccinated ? 1 : 0

  try {
    await db
      .prepare(
        `INSERT INTO pets (
          id, name, species, primaryBreed, secondaryBreed, ageInMonths,
          gender, size, color, appearance, description, vaccinated,
          temperament, adoptionFee, dateArrived, adoptionStatus, location, image
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        petId,
        petData.name,
        petData.species,
        petData.primaryBreed,
        petData.secondaryBreed,
        petData.ageInMonths,
        petData.gender,
        petData.size,
        petData.color,
        petData.appearance,
        petData.description,
        vaccinatedInt,
        temperamentJson,
        petData.adoptionFee,
        petData.dateArrived,
        petData.adoptionStatus,
        petData.location,
        petData.image
      )
      .run()

    // Fetch the created pet
    const createdPet = await db.prepare('SELECT * FROM pets WHERE id = ?').bind(petId).first()

    if (!createdPet) {
      return c.json({ error: 'Failed to fetch created pet' }, 400)
    }

    const pet = {
      ...createdPet,
      temperament: JSON.parse(createdPet.temperament as string),
      vaccinated: Boolean(createdPet.vaccinated),
    } as any

    return c.json(pet, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create pet' }, 400)
  }
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
