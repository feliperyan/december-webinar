## 🛠️ Step 0: Set Up Cloudflare Project
<details>

<summary>Expand for details</summary>

### Introduction

Hello there 👋 , you probably just cloned this repository to follow along with the Webinar, thank you for joining us!


### 0.1 Adding some config

1.  Edit your `wrangler.jsonc` file and include your Cloudflare **Account ID**:

    ```jsonc
    "account_id": "14c3ac...",
    ```

2.  Create a `.env` file and enter your API token with the **`Cloudflare Images` scope**:

    ```bash
    CF_IMAGES_TOKEN=your_token_here
    ```

### 0.2 Install Project Dependencies

Install the necessary dependencies for building the API and running tests:

```bash
npm install
npm i hono
npm i zod
npm i @hono/zod-openapi
npm i -D vitest@~3.2.0 @cloudflare/vitest-pool-workers
```

### 0.3 Configure MCP Servers

#### VSCode
  1. Create a `.vscode` folder and add a `mcp.json` file
  2. Copy and paste the below:

```json
{
    "servers": {       
        "cloudflare-documentation": {
            "type": "http",
            "url": "https://docs.mcp.cloudflare.com/mcp"
        },
        "cloudflare-bindings": {
            "type": "http",
            "url": "https://bindings.mcp.cloudflare.com/mcp",
            "headers": {"Authorization": "Bearer <YOUR TOKEN>"}
        },
        "cloudflare-observability": {
            "type": "http",
            "url": "https://observability.mcp.cloudflare.com/mcp",
            "headers": {"Authorization": "Bearer <YOUR TOKEN>"}
        },
    }
}
 ```

more info

#### Windsurf
1. Bring up the MCP Marketplace (on a Mac you can use `Shift + Cmd + P` and type `MCP: Open MCP Marketplace`)
2. Click the small ⚙️ icon next to the MCP Marketplace tab
3. Click `Add MCP Server`
4. Copy and paste the below:

```json
{
  "mcpServers": {
    "cloudflare-documentation": {
      "serverUrl": "https://docs.mcp.cloudflare.com/mcp"      
    },
    "cloudflare-workers-bindings": {
      "serverUrl": "https://bindings.mcp.cloudflare.com/mcp",
      "headers": {
        "Authorization": "Bearer <YOUR TOKEN>",
        "Content-Type": "application/json"
      }
    },
    "cloudflare-observability": {
      "serverUrl": "https://observability.mcp.cloudflare.com/mcp",
      "headers": {
        "Authorization": "Bearer <YOUR TOKEN>",
        "Content-Type": "application/json"
      }
    }
  }
}
```
[More info link](https://windsurf.com/university/tutorials/configuring-first-mcp-server)

#### Cursor
1. Create a `.cursor` folder and a `mcp.json` file
2. Copy and paste the below:

```json
{
    "mcpServers": {       
        "cloudflare-documentation": {            
            "url": "https://docs.mcp.cloudflare.com/mcp"
        },
        "cloudflare-bindings": {            
            "url": "https://bindings.mcp.cloudflare.com/mcp",
            "headers": {"Authorization": "Bearer <YOUR TOKEN>"}
        },
        "cloudflare-observability": {            
            "url": "https://observability.mcp.cloudflare.com/mcp",
            "headers": {"Authorization": "Bearer <YOUR TOKEN>"}
        },
    }
}
```
[More info link](https://cursor.com/docs/context/mcp#authentication)
</details>

-----

## 🚀 Step 1: Use the Hono Framework

<details>
<summary>Expand for details</summary>

We will begin by integrating the **Hono framework**. The first task is to refactor the default backend script in `index.ts` to use Hono while maintaining the existing functionality.

Let's use a simple prompt for our Large Language Model (LLM):

🤖 Prompt:

```
I want to use the Hono framework. Refactor this code with the same functionality but using Hono
```

Run the application locally with `npm run dev`. You should see the default UI. Verify the Hono refactor by clicking the button; the text "Name from API is: unknown" should update with the API response.

</details>

-----

## 🗺️ Step 2: First API Endpoint

<details>
<summary>Expand for details</summary>

### 2.1 Implement the `/api/pets` Endpoint

We will adopt the **"Explore, Plan, Code, Commit"** workflow for this task to implement the `/api/pets` endpoint. Here is the process:

1.  **Explore:** We'll refer the LLM to the files it needs to read (`@index.ts`, `@README.md`).
2.  **Plan:** We'll provide the documentation for the `Zod OpenAPI Hono` library to guide its implementation plan.
3.  **Code:** We'll ask it to write the code based on its plan. Use the keywords `THINK` and `MUST` to signal this to the LLM.

**Action:** Copy the raw content of the [Zod OpenAPI Hono documentation](https://github.com/honojs/middleware/blob/main/packages/zod-openapi/README.md) file.

🤖 Prompt:

```
Look at @index.ts and @README.md and THINK about how you would implement the /api/pets endpoint. 
For the time being, just return a hard coded example response with 2 pets.
You MUST implement it using the Zod OpenAPI library as per the documentation below.
Place the schemas in a new file `worker/schemas.ts`.

🚨 <COPY and PASTE the raw zod-openapi README.md file here>
```

### 2.2 Get Cloudflare Configuration Information

First, add some config to `wrangler.jsonc` once again, this is so that we can properly serve our static assets and API routes.

```jsonc
"assets": {
		"not_found_handling": "single-page-application",
		"directory": "./public",
		"run_worker_first": ["/doc", "/api/*"]
	},
```

If you want to better understand what we just configured, you can ask the LLM to explain the `assets` settings in your `wrangler.jsonc` config, leveraging the Cloudflare documentation MCP Server:

🤖 Prompt:

```
Look at @wrangler.jsonc and explain the `assets` settings in the context of the Vite plugin, static assets and single page applications.
Use the Cloudflare Documentation MCP Server.
```

</details>

-----

## 🗄️ Step 3: Database Integration (Cloudflare D1)

<details>
<summary>Expand for details</summary>

### 3.1 Create a D1 Database

We will use **Cloudflare D1** as the database. While this can be done via the Cloudflare Dashboard or `wrangler` CLI, we will use the `Workers Bindings` tool (an MCP server) for database creation:

🤖 Prompt:

```
Use the Cloudflare Workers Binding tool and create a D1 database with the name pets-01
```

> 💡 **Pro-Tip:** If your tool automatically surfaced an OAuth screen, you may be able to choose between different accounts. If so, make sure to inform the LLM which account you want to use.

### 3.2 Add D1 Binding

The D1 database now exists on Cloudflare. To enable local development, we need to bind this database in our `wrangler.jsonc` file. Ask the LLM to update the configuration for us:

🤖 Prompt:

```
Add the details of the D1 database you just created as a binding to the wrangler.jsonc file.
```

It should look something like this:

```jsonc
"d1_databases": [
		{
			"binding": "DB",
			"database_name": "pets-01",
			"database_id": "e738f4d3-..."
		}
	]
```

Now, run this command to update the TypeScript types, allowing you to easily access the DB binding from your code:

```bash
npm run cf-typegen
```

### 3.3 Create Tables and Add Local Data

Let's ask the LLM to write the SQL file for table creation:

🤖 Prompt:

```
Write a SQL file to create the Pets table. It must follow the same schema found in @schemas.ts. Call the file `schema.sql`.
```

If the LLM didn't include example rows, ask it to add a few. Then, execute the following command to create the table and insert the example rows into your **local** D1 database:

```bash
npx wrangler d1 execute pets-01 --local --file=./schema.sql
```

### 3.4 Apply Schema to Remote Database

To ensure the **remote** database contains the same table structure, execute the command again, noticing the crucial `--remote` flag. You may comment out any dummy data in `schema.sql` if you only want to apply the schema.

```bash
npx wrangler d1 execute pets-01 --file=./schema.sql --remote
```

</details>

-----

## 📝 Step 4: Complete the API Endpoints

<details>
<summary>Expand for details</summary>

### 4.1 Refactor the `GET /api/pets` Endpoint

Let's modify the existing API endpoint so it queries the database instead of returning a hard-coded response.

🤖 Prompt:

```
Look at @index.ts , @README.md and @schemas.ts and refactor the GET /api/pets endpoint to query the database instead of returning a hard-coded response.
```

### 4.2 Implement the Other API Endpoints

Now, let's add the missing API endpoints:

🤖 Prompt:

```
Look at @index.ts , @README.md and @schemas.ts and THINK about how you would implement the other API endpoints.
You MUST follow a similar implementation already in place for api/pets endpoint and use the Zod OpenAPI library.
```

Confirm that you have new Zod schemas, new routes, and new handlers implemented.

</details>

-----

## 🧪 Step 5: Implement Unit Tests

<details>
<summary>Expand for details</summary>

### 5.1 Add Vitest Configuration

Create a file called `vitest.config.ts` in your root project folder:

```ts
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    setupFiles: ["./test/setup.ts"],
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.jsonc" },
        miniflare: {
          d1Databases: ["DB"], // Explicitly declare D1 database binding
        },
        isolatedStorage: true,
      },
    },
  },
});
```

### 5.2 Add Test Files

Create a folder called `test` in your root project folder with the following files:

  * **`env.d.ts`**
  * **`setup.ts`** (Includes D1 table creation and seeding logic)
  * **`tsconfig.json`**
  * **`unit.spec.ts`** (Contains the initial tests)

*(The content for these files remains the same as in your original instructions.)*

### 5.3 Generate More Tests

Experiment with the LLM to generate more tests. You can ask it to generate tests for the other endpoints (`POST`, `PUT`, `DELETE`) or even generate tests for specific database queries.

### 5.4 Run Tests

Execute your tests with the following command:

```bash
npx vitest run
```

</details>

-----

## 🖼️ Step 6: Integrate AI Image Generation

<details>
<summary>Expand for details</summary>

### 6.1 Configure AI and Image Bindings

First, add the Workers AI binding and an environment variable for your account id regenerate the types:

```jsonc
"ai": {
		"binding": "AI"
	},
"vars":{
  "ACCOUNT_ID": "14c3ac..."
}
```
Then run the following command to regenerate the types:

```bash
npm run cf-typegen
```

Next, we need to ensure the Cloudflare Images API Token is securely stored as a Worker secret. When running the command below, it will prompt you to enter the token. Copy the token from `.env` and paste it.

```bash
npx wrangler secret put CF_IMAGES_TOKEN
```

### 6.2 Refactor `/api/pets/create` Endpoint

We will follow the [official example](https://developers.cloudflare.com/images/upload-images/upload-file-worker/#upload-from-ai-generated-images) of generating an image based on the pet description and subsequently uploading it to Cloudflare Images.

Here is the refactored code for `index.ts`, including the new helper function:

```ts
// Refactor 
app.openapi(createPetRoute, async (c) => {
  const petData = c.req.valid('json')
  const db = c.env.DB

  const prompt = `A friendly ${petData.species} ${petData.primaryBreed}, ${petData.ageInMonths} months old, ${petData.gender}, ${petData.size}, ${petData.color}, ${petData.appearance}`;
  const imageURL = await createAndUploadImage(prompt, c.env);

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
        imageURL // Using the generated image URL
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

// Add a new helper function
const createAndUploadImage = async(description: string, env: Env): Promise<string> => {
    // IMPORTANT: Replace <YOUR ACCOUNT ID> with your actual Cloudflare Account ID
    const API_URL = "https://api.cloudflare.com/client/v4/accounts/<YOUR ACCOUNT ID>/images/v1"; 
    const TOKEN = env.CF_IMAGES_TOKEN;

    const stream = await env.AI.run(
        "@cf/bytedance/stable-diffusion-xl-lightning",
        {
            prompt: description
        }
    );
    const bytes = await (new Response(stream)).bytes();

    const formData = new FormData();
    formData.append('file', new File([bytes], 'image.jpg'));

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
        body: formData,
    });
    const resp = await response.json() as any;

    console.log(`AI response: ${JSON.stringify(resp)}`);

    if (resp['success'] === false) {
        throw new Error('Failed to create image');
    }

    return resp['result']['variants'][0];
}
```

</details>

-----

## 🎨 Step 7: Final UI and Tracing

<details>
<summary>Expand for details</summary>

### 7.1 Refactor the UI

The `step-7` branch contains a final `Readme.md` with a mockup of the desired UI. You can experiment with providing this image file to the LLM, combined with a prompt, to refactor `App.ts` and `App.css` to match the mockup.

### 7.2 Enable Tracing

Before deployment, enable distributed **tracing** by updating `wrangler.jsonc`:

```jsonc
"compatibility_flags": [
  "tracing"
]
```

</details>

-----

## 🚀 Step 8: Deploy

<details>
<summary>Expand for details</summary>

Deploy your completed application to Cloudflare Workers with:

```bash
npm run deploy
```

</details>
