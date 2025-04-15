const supabase = require('../Config/db');

class TeamModel {
  static async getAllTeams() {
    const { data, error } = await supabase.from('teams').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  static async getTeamById(id) {
    const { data, error } = await supabase.from('teams').select('*').eq('id', id).single();
    if (error) throw new Error('Team not found');
    return data;
  }

  static async addTeam(name, members) {
    const { data, error } = await supabase.from('teams').insert([{ name, members, total_points: 0 }]).select();
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async deleteTeam(id) {
    const { data, error } = await supabase.from('teams').delete().eq('id', id).select();
    if (error) throw new Error('Failed to delete team');
    return data[0];
  }
  static async loginTeam(name, password) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('name', name)
      .eq('Password', password) // <-- Capital 'P' to match the actual column
      .single();
  
    if (error || !data) {
      throw new Error('Invalid team name or password');
    }
  
    return data;
  }

  static async getTeamByName(name) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .ilike('name', name); // Case-insensitive search

    if (error) throw new Error('Failed to fetch team');
    return data.length > 0 ? data[0] : null;
  }
}

module.exports = TeamModel;