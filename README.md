# Cloudpets - Pet adoption service project

## Introduction
Animal Champions is an animal welfare non for profit. In a bid to improve pet adoption numbers, we want to develop a pet adoption website called Cloudpets.  

Cloudpets is website where you can browse our available pets for adoption and apply to adopt one.

## Tech Stack

- React
- TypeScript
- Vite
- Cloudflare Workers
- Cloudflare D1
- Cloudflare WorkersAI
- Cloudflare Images

## Deployment

Our code versioning tool is Github, when pushing to the main branch, Cloudflare will get a copy of our code and build and deploy it for us.

## APIs

We want our APIs to be simple and adopt the OpenAPI standard for ease of use. Here are the endpoints we have in mind atm:

- GET /api/pets
- GET /api/pets/{id}
- POST /api/pets/{id}/apply
- POST /api/pets/create

## User Interface

The UI needs to be responsive and modern to cater for all devices. Research shows that most users browse for pet adoption on mobile devices but occasionally switch to a desktop to make a final decision to adopt.

At the moment we'll present a simple list of all available pets as links, each link will open a page with the pet's details and a single button to apply to adopt the pet. This will change the status of the pet to "adopted" in the Database.

# Technical information
## Pet data schema
We decided that the best schema for the data is a JSON object with the properties 

```json
{
  "id": "pet-002",
  "name": "Copper",
  "species": "dog",
  "primaryBreed": "Beagle",
  "secondaryBreed": null,
  "ageInMonths": 18,
  "gender": "female",
  "size": "medium",
  "color": "Tricolor (Brown, Black, White)",
  "appearance": "Short, dense, glossy coat; floppy ears; soulful brown eyes.",
  "description": "Sweet, vocal scent hound. Loves sniffing and following trails. Needs a secure yard and patient training due to wanderlust.",
  "vaccinated": true,
  "temperament": [
    "curious",
    "vocal",
    "social",
    "scent-driven"
  ],
  "adoptionFee": 300,
  "dateArrived": "2025-10-01",
  "adoptionStatus": "available",
  "location": "Main Shelter - Quiet Wing",
  "image": "https://example.com/pet-002.jpg"
},
{
  "id": "pet-003",
  "name": "Sky",
  "species": "bird",
  "primaryBreed": "Cockatiel",
  "secondaryBreed": "Lutino",
  "ageInMonths": 24,
  "gender": "male",
  "size": "small",
  "color": "Yellow and Orange",
  "appearance": "Bright yellow feathers, orange cheek patches, crest, and a long tail.",
  "description": "Very sweet and tame. Loves to sit on shoulders and whistle. Requires daily social interaction and time outside the cage.",
  "vaccinated": true,  
  "temperament": [
    "social",
    "calm",
    "whistles",
    "needs routine"
  ],
  "adoptionFee": 150,
  "dateArrived": "2025-09-05",
  "adoptionStatus": "available",
  "location": "Foster Home - Bird Room",
  "image": "https://example.com/pet-002.jpg"
}
```
