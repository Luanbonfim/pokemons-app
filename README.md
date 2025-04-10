# Pokemons App

A React application that displays Pokémon data from the PokeAPI. This app allows users to browse a list of Pokémon and view detailed information about each one.

![image](https://github.com/user-attachments/assets/20c21bd7-af95-4cbf-a283-a09d4723420a)
![image](https://github.com/user-attachments/assets/cdd86678-0271-49a4-a413-2f5298f200a8)

## Features

- Browse a list of Pokémon with their basic information
- View detailed information about each Pokémon
- Responsive design that works on desktop and mobile devices
- Loading states with animated spinners
- Error handling with user-friendly messages
- Clean and modern UI with Pokémon-themed styling
- Infinite scrolling for the Pokémon list

## Technologies Used

- React
- TypeScript
- React Router for navigation
- Redux Toolkit for state management
- CSS for styling
- PokeAPI for Pokémon data

## Project Structure

```
pokemons-app/
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorMessage.tsx
│   │   ├── Loading.tsx
│   │   └── PokemonCard.tsx
│   ├── config/
│   │   └── api.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── PokemonDetails.tsx
│   │   └── PokemonList.tsx
│   ├── services/
│   │   └── pokemonService.ts
│   ├── store/
│   │   ├── hooks.ts
│   │   ├── pokemonSlice.ts
│   │   └── store.ts
│   ├── types/
│   │   ├── Error.ts
│   │   └── Pokemon.ts
│   ├── App.tsx
│   └── index.tsx
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Luanbonfim/pokemons-app.git
   ```

2. Navigate to the project directory:
   ```
   cd pokemons-app
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

- The home page displays a grid of Pokémon cards
- Click on a Pokémon card to view its detailed information
- Use the "Back to List" button to return to the home page
- Scroll down to load more Pokémon (infinite scrolling)

## API

This application uses the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data. The API is free to use and doesn't require authentication.

## State Management

The application uses Redux Toolkit for state management. The Redux store provides the following:

- List of Pokémon with pagination support
- Selected Pokémon details
- Loading states
- Error handling
- Async thunks for fetching Pokémon data

### Redux Structure

- **store.ts**: Configures the Redux store with middleware
- **pokemonSlice.ts**: Contains the reducer, actions, and async thunks for Pokémon data
- **hooks.ts**: Provides typed hooks for accessing the Redux store

## Components

### PokemonCard

A reusable component that displays a Pokémon's basic information:
- Image
- Name
- Types

### Loading

A component that displays a loading spinner and text while data is being fetched.

### ErrorMessage

A component that displays error messages in a user-friendly format.

## Styling

The application uses CSS for styling with:
- Responsive grid layout
- Pokémon type-specific colors
- Hover effects and animations
- Mobile-friendly design

## Future Improvements

- Implement search functionality
- Add filtering by Pokémon type
- Include more detailed Pokémon information
- Add a favorites feature
- Implement caching for better performance

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data
- [Pokémon](https://www.pokemon.com/) for the inspiration
- [Redux Toolkit](https://redux-toolkit.js.org/) for simplifying Redux implementation

## Repository

This project is hosted on GitHub at [https://github.com/Luanbonfim/pokemons-app](https://github.com/Luanbonfim/pokemons-app)
