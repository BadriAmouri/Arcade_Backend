const supabase = require('../Config/db');

class GameModel {
  // Get all games
  static async getAllGames() {
    const { data, error } = await supabase.from('games').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  // Get a game by ID
  static async getGameById(id) {
    const { data, error } = await supabase.from('games').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  }

  // Create a new game
  static async createGame(gameData) {
    const { data, error } = await supabase
      .from('games')
      .insert([gameData])
      .select(); // ✅ This ensures the response contains the inserted data

    if (error) throw new Error(error.message);
    return data; // ✅ Return the created game data
  }

  // Delete a game
  static async deleteGame(id) {
    const { data, error } = await supabase.from('games').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }
  // get the game by game name 
  static async getGameByName(gameName) {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .ilike('name', gameName); // Use ilike for case-insensitive search

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = GameModel;