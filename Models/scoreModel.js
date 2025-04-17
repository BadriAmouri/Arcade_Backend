const supabase = require('../Config/db');

class ScoreModel {
  // Get all scores
  static async getAllScores() {
    const { data, error } = await supabase.from('scores').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  // Get scores for a specific game by name
  static async getScoresByGameName(gameName) {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .ilike('game_name', gameName);

    if (error) throw new Error(error.message);
    return data;
  }

  // Add a score using game name and team name
  static async addScoreByGameAndTeam(scoreData) {
    const { game_name, team_name, points, date } = scoreData;

    // Insert score directly using game_name and team_name
    const { data, error } = await supabase.from('scores').insert([
      { game_name, team_name, points },
    ]);

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete a score
  static async deleteScore(id) {
    const { data, error } = await supabase.from('scores').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }

  static async getTotalPointsByTeamName(teamName) {
    const { data, error } = await supabase
      .from('scores')
      .select('points')
      .eq('team_name', teamName);

    if (error) throw new Error(error.message);

    const total = data.reduce((sum, entry) => sum + entry.points, 0);
    return total;
  }
  
}


module.exports = ScoreModel;