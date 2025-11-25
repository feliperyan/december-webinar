import { z } from '@hono/zod-openapi'

// Pet Schema based on the data structure in README.md
export const PetSchema = z
  .object({
    id: z.string().openapi({
      example: 'pet-002',
      description: 'Unique identifier for the pet',
    }),
    name: z.string().openapi({
      example: 'Copper',
      description: 'Name of the pet',
    }),
    species: z.string().openapi({
      example: 'dog',
      description: 'Species of the pet (e.g., dog, cat, bird)',
    }),
    primaryBreed: z.string().openapi({
      example: 'Beagle',
      description: 'Primary breed of the pet',
    }),
    secondaryBreed: z.string().nullable().openapi({
      example: null,
      description: 'Secondary breed if mixed breed, null otherwise',
    }),
    ageInMonths: z.number().openapi({
      example: 18,
      description: 'Age of the pet in months',
    }),
    gender: z.string().openapi({
      example: 'female',
      description: 'Gender of the pet',
    }),
    size: z.string().openapi({
      example: 'medium',
      description: 'Size category (small, medium, large)',
    }),
    color: z.string().openapi({
      example: 'Tricolor (Brown, Black, White)',
      description: 'Color description of the pet',
    }),
    appearance: z.string().openapi({
      example: 'Short, dense, glossy coat; floppy ears; soulful brown eyes.',
      description: 'Physical appearance description',
    }),
    description: z.string().openapi({
      example: 'Sweet, vocal scent hound. Loves sniffing and following trails.',
      description: 'General description and personality traits',
    }),
    vaccinated: z.boolean().openapi({
      example: true,
      description: 'Vaccination status',
    }),
    temperament: z.array(z.string()).openapi({
      example: ['curious', 'vocal', 'social', 'scent-driven'],
      description: 'List of temperament traits',
    }),
    adoptionFee: z.number().openapi({
      example: 300,
      description: 'Adoption fee in dollars',
    }),
    dateArrived: z.string().openapi({
      example: '2025-10-01',
      description: 'Date the pet arrived at the shelter (ISO date format)',
    }),
    adoptionStatus: z.string().openapi({
      example: 'available',
      description: 'Current adoption status (available, pending, adopted)',
    }),
    location: z.string().openapi({
      example: 'Main Shelter - Quiet Wing',
      description: 'Current location of the pet',
    }),
    image: z.string().openapi({
      example: 'https://example.com/pet-002.jpg',
      description: 'URL to the pet image',
    }),
  })
  .openapi('Pet')

// Array of pets for GET /api/pets response
export const PetsArraySchema = z.array(PetSchema).openapi({
  description: 'Array of available pets',
})

// Path parameter schema for pet ID
export const PetIdParamSchema = z.object({
  id: z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    example: 'pet-002',
    description: 'Unique identifier for the pet',
  }),
})

// Schema for creating a new pet (id is optional, will be generated if not provided)
export const CreatePetSchema = z
  .object({
    id: z.string().optional().openapi({
      example: 'pet-004',
      description: 'Optional unique identifier for the pet',
    }),
    name: z.string().openapi({
      example: 'Copper',
      description: 'Name of the pet',
    }),
    species: z.string().openapi({
      example: 'dog',
      description: 'Species of the pet (e.g., dog, cat, bird)',
    }),
    primaryBreed: z.string().openapi({
      example: 'Beagle',
      description: 'Primary breed of the pet',
    }),
    secondaryBreed: z.string().nullable().openapi({
      example: null,
      description: 'Secondary breed if mixed breed, null otherwise',
    }),
    ageInMonths: z.number().openapi({
      example: 18,
      description: 'Age of the pet in months',
    }),
    gender: z.string().openapi({
      example: 'female',
      description: 'Gender of the pet',
    }),
    size: z.string().openapi({
      example: 'medium',
      description: 'Size category (small, medium, large)',
    }),
    color: z.string().openapi({
      example: 'Tricolor (Brown, Black, White)',
      description: 'Color description of the pet',
    }),
    appearance: z.string().openapi({
      example: 'Short, dense, glossy coat; floppy ears; soulful brown eyes.',
      description: 'Physical appearance description',
    }),
    description: z.string().openapi({
      example: 'Sweet, vocal scent hound. Loves sniffing and following trails.',
      description: 'General description and personality traits',
    }),
    vaccinated: z.boolean().openapi({
      example: true,
      description: 'Vaccination status',
    }),
    temperament: z.array(z.string()).openapi({
      example: ['curious', 'vocal', 'social', 'scent-driven'],
      description: 'List of temperament traits',
    }),
    adoptionFee: z.number().openapi({
      example: 300,
      description: 'Adoption fee in dollars',
    }),
    dateArrived: z.string().openapi({
      example: '2025-10-01',
      description: 'Date the pet arrived at the shelter (ISO date format)',
    }),
    adoptionStatus: z.string().openapi({
      example: 'available',
      description: 'Current adoption status (available, pending, adopted)',
    }),
    location: z.string().openapi({
      example: 'Main Shelter - Quiet Wing',
      description: 'Current location of the pet',
    }),
    image: z.string().openapi({
      example: 'https://example.com/pet-002.jpg',
      description: 'URL to the pet image',
    }),
  })
  .openapi('CreatePet')

// Error response schema
export const ErrorSchema = z
  .object({
    error: z.string().openapi({
      example: 'Pet not found',
      description: 'Error message',
    }),
  })
  .openapi('Error')

// Success message schema
export const SuccessMessageSchema = z
  .object({
    message: z.string().openapi({
      example: 'Application submitted successfully',
      description: 'Success message',
    }),
    pet: PetSchema.optional().openapi({
      description: 'Updated pet data',
    }),
  })
  .openapi('SuccessMessage')
