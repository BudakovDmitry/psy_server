export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booking API',
      version: '1.0.0',
      description: 'Information about all endpoints in Booking application.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
    paths: {
      '/hotels': {
        get: {
          summary: 'Returns the list of all hotels',
          description: 'Gets all hotels',
          tags: [
            'Hotels',
          ],
          responses: {
            200: {
              description: 'Gets an array of hotels',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Hotel',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/hotels/{id}': {
        get: {
          summary: 'Returns hotel',
          description: 'Gets a hotel',
          tags: [
            'Hotels',
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The hotel ID',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'Gets a hotel',
              content: {
                'application/json': {
                  schema: {
                    items: {
                      $ref: '#/components/schemas/Hotel',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/destinations': {
        get: {
          summary: 'Returns the list of all destinations',
          description: 'Gets all destinations',
          tags: [
            'Destinations',
          ],
          responses: {
            200: {
              description: 'Gets an array of destinations',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Destination',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Hotel: {
          properties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
            address: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            state: {
              type: 'string',
            },
            country_code: {
              type: 'string',
            },
            hotel_rating: {
              type: 'number',
            },
            phone_number: {
              type: 'string',
            },
            website: {
              type: 'string',
            },
          },
        },
        Destination: {
          properties: {
            id: {
              type: 'number',
            },
            value: {
              type: 'string',
            },
            label: {
              type: 'string',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Hotels',
        description: 'Working with hotels',
      },
      {
        name: 'Destinations',
        description: 'Working with destinations',
      },
    ],
  },
  apis: ['./routes/api/*.ts'],
};
